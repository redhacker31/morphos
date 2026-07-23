// MorphOS Copilot Chat — streaming LLM chat. Calls Enter AI (GPT 5.6 Luna) and
// normalizes the upstream SSE (chat-completions or responses) into a single simple
// event format for the frontend: event: delta | done | error. Tries chat-completions
// first and falls back to the responses route on a protocol-mismatch 400.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-session-id",
};

const AI_API_TOKEN = Deno.env.get("AI_API_TOKEN_a16271fe6060");
const API_BASE = "https://api.enter.pro";
const MODEL = "openai/gpt-5.6-luna";

const COPILOT_SYSTEM = `You are MorphOS Copilot, an AI assistant inside an AI app-generator workspace. Help the user brainstorm, refine, and plan applications they want to generate. Be concise, friendly, and practical. When the user describes an app, suggest useful widgets, metrics, and sample data to include. Keep replies short (2-5 sentences) unless the user asks for detail. Do not output JSON or code unless asked.`;

function parseUpstreamError(text: string): { message: string; type: string } {
  const dataMatch = text.match(/data: (.+)/);
  if (dataMatch) {
    try {
      const e = JSON.parse(dataMatch[1]);
      return { message: e.error?.message || "AI service error", type: e.error?.type || "api_error" };
    } catch { /* fall through */ }
  }
  try {
    const e = JSON.parse(text);
    return { message: e.error?.message || e.message || "AI service error", type: e.error?.type || "api_error" };
  } catch { /* fall through */ }
  return { message: "AI service error", type: "api_error" };
}

function isProtocolMismatch(status: number, text: string): boolean {
  return status === 400 && /protocol does not match route|model protocol/i.test(text);
}

function sseError(message: string, status: number): Response {
  return new Response(`event: error\ndata: ${JSON.stringify({ message })}\n\n`, {
    status,
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
}

async function getUpstream(messages: any[], sessionId: string): Promise<{ response: Response; protocol: "chat" | "responses" }> {
  const cc = await fetch(`${API_BASE}/code/api/v1/ai/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AI_API_TOKEN}`, "Content-Type": "application/json", "X-Session-ID": sessionId },
    body: JSON.stringify({ model: MODEL, messages, stream: true }),
  });
  if (cc.ok) return { response: cc, protocol: "chat" };
  const ccText = await cc.text();
  if (isProtocolMismatch(cc.status, ccText)) {
    const input = messages.map((m) => ({ role: m.role, content: m.content }));
    const rr = await fetch(`${API_BASE}/code/api/v1/ai/responses`, {
      method: "POST",
      headers: { Authorization: `Bearer ${AI_API_TOKEN}`, "Content-Type": "application/json", "X-Session-ID": sessionId },
      body: JSON.stringify({ model: MODEL, input, stream: true }),
    });
    return { response: rr, protocol: "responses" };
  }
  const e = parseUpstreamError(ccText);
  const err: any = new Error(e.message);
  err.status = cc.status;
  throw err;
}

function normalizeStream(upstreamBody: ReadableStream<Uint8Array>, protocol: "chat" | "responses"): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let finished = false;

  return new ReadableStream({
    async start(controller) {
      const emit = (s: string) => controller.enqueue(encoder.encode(s));
      const finish = () => {
        if (finished) return;
        finished = true;
        emit(`event: done\ndata: {}\n\n`);
      };

      const processLine = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data:")) return;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") { finish(); return; }
        let data: any;
        try { data = JSON.parse(payload); } catch { return; }
        if (protocol === "chat") {
          const delta = data?.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta.length) {
            emit(`event: delta\ndata: ${JSON.stringify({ content: delta })}\n\n`);
          }
          if (data?.choices?.[0]?.finish_reason) finish();
        } else {
          const t = data?.type;
          if (t === "response.output_text.delta" && typeof data?.delta === "string") {
            emit(`event: delta\ndata: ${JSON.stringify({ content: data.delta })}\n\n`);
          } else if (t === "response.completed") {
            finish();
          } else if (t === "response.failed" || t === "response.incomplete" || t === "error") {
            const msg = data?.response?.error?.message || data?.error?.message || "AI service error";
            emit(`event: error\ndata: ${JSON.stringify({ message: msg })}\n\n`);
            finished = true;
          }
        }
      };

      const reader = upstreamBody.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nl);
            buffer = buffer.slice(nl + 1);
            processLine(line);
          }
        }
        if (buffer.length) processLine(buffer);
        finish();
        controller.close();
      } catch (e: any) {
        emit(`event: error\ndata: ${JSON.stringify({ message: e?.message || "stream error" })}\n\n`);
        controller.close();
      }
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    if (!AI_API_TOKEN) return sseError("AI service is not configured.", 500);

    const body = await req.json().catch(() => ({}));
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const sessionId = req.headers.get("X-Session-ID")?.trim() || crypto.randomUUID();
    const full = [{ role: "system", content: COPILOT_SYSTEM }, ...messages];

    let upstream: { response: Response; protocol: "chat" | "responses" };
    try {
      upstream = await getUpstream(full, sessionId);
    } catch (e: any) {
      return sseError(e?.message || "AI service error", e?.status || 500);
    }

    if (!upstream.response.ok) {
      const t = await upstream.response.text();
      const e = parseUpstreamError(t);
      return sseError(e.message, upstream.response.status);
    }

    const stream = normalizeStream(upstream.response.body!, upstream.protocol);
    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (e: any) {
    return sseError(e?.message || "Internal error", 500);
  }
});

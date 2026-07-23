// MorphOS Blueprint Generator — calls Enter AI (GPT 5.6 Luna) to produce a valid
// AppASTPayload JSON from a natural-language prompt. Tries the OpenAI chat-completions
// route first and falls back to the responses route on a protocol-mismatch 400.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-session-id",
};

const AI_API_TOKEN = Deno.env.get("AI_API_TOKEN_a16271fe6060");
const API_BASE = "https://api.enter.pro";
const MODEL = "openai/gpt-5.6-luna";

const SYSTEM_PROMPT = `You are MorphOS Blueprint Engine. You convert a natural-language app request into a single valid JSON object called an AppASTPayload that a renderer turns into a live dashboard UI.

Output rules (STRICT):
- Output ONLY one JSON object. No markdown, no code fences, no commentary before or after.
- The JSON must match this shape exactly:
  {
    "version": "1.0.0",
    "meta": { "title": string, "description": string, "theme": "dark-glass" | "cyberpunk-neon" | "high-contrast-light" },
    "layout": { "type": "dashboard" | "grid" | "sidebar-main" | "single-column", "columns": 12, "gap": 16 },
    "nodes": [
      { "id": string, "type": string, "gridPosition": { "x": number, "y": number, "w": number, "h": number }, "props": { "title"?: string, "description"?: string, "data"?: any, "config"?: any } }
    ]
  }

Available widget types and their props (use ONLY these types):
- "hero-banner": full-width header. props.config = { "bannerTitle": "...", "bannerSubtitle": "..." }. Use gridPosition w:12 h:3 at x:0 y:0.
- "metric-card": a single KPI. props.data = { "value": "4,250,000" }, props.config = { "unit": "$", "trend": "+18.4%", "isPositive": true }.
- "bar-chart": props.data = [{ "name": "Jan", "value": 380 }], props.config = { "color": "#8B5CF6", "xAxisKey": "name", "yAxisKey": "value" }.
- "line-chart": props.data = [{ "name": "Mon", "value": 120 }], props.config = { "color": "#06B6D4", "xAxisKey": "name", "yAxisKey": "value" }.
- "pie-chart": props.data = [{ "name": "Enterprise", "value": 48 }], props.config = { "colors": ["#8B5CF6","#06B6D4","#10B981","#F59E0B"] }.
- "data-table": props.data = [{ "ID": "ACC-901", "Name": "Acme Corp" }], props.config = { "columns": ["ID","Name"] }.
- "stat-grid": props.data = [{ "label": "Active Users", "value": "24,850", "change": "+12%" }].
- "progress": props.data = { "value": 72 }, props.config = { "color": "#8B5CF6" }.
- "alert": props.config = { "type": "info" | "warning" | "error", "message": "..." }, props.title = "Notice".
- "form-container": props.config = { "fields": [{ "name": "full_name", "label": "Full Name", "type": "text", "placeholder": "John Doe" }], "submitText": "Submit" }.

Design guidance:
- Start with one "hero-banner" spanning the full width (w:12, h:3, x:0, y:0).
- Add 3-4 "metric-card" widgets in a row (each w:4, h:4) for top KPIs.
- Add relevant charts (bar/line/pie) sized w:6 h:6 side by side.
- Add a "data-table" (w:12) for records and/or a "stat-grid".
- Tile gridPositions on a 12-column grid without overlaps; increment y going down.
- Generate realistic, coherent sample data matching the requested domain.
- Use 5 to 9 nodes total.

Return only the JSON object.`;

const LAYOUT_TYPES = new Set(["grid", "flex", "sidebar-main", "single-column", "dashboard", "container"]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(v: unknown): boolean {
  return typeof v === "string" && UUID_RE.test(v);
}

function num(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function normalizeAst(raw: any, requirements: any): any {
  const ast = raw && typeof raw === "object" ? raw : {};
  const meta = ast.meta && typeof ast.meta === "object" ? ast.meta : {};
  const layout = ast.layout && typeof ast.layout === "object" ? ast.layout : {};
  const layoutType = LAYOUT_TYPES.has(layout.type) ? layout.type : "dashboard";
  const rawNodes = Array.isArray(ast.nodes) ? ast.nodes : [];
  const nodes = rawNodes.map((n: any, i: number) => {
    const node = n && typeof n === "object" ? n : {};
    const type = typeof node.type === "string" && node.type.trim() ? node.type.trim() : "empty-state";
    const gp = node.gridPosition && typeof node.gridPosition === "object" ? node.gridPosition : {};
    const props = node.props && typeof node.props === "object" ? node.props : {};
    const cfg = props.config && typeof props.config === "object" ? props.config : {};
    const w = Math.min(12, Math.max(1, num(gp.w, 6)));
    return {
      id: isUuid(node.id) ? node.id : crypto.randomUUID(),
      type,
      title: typeof node.title === "string" ? node.title : (typeof props.title === "string" ? props.title : undefined),
      description: typeof node.description === "string" ? node.description : (typeof props.description === "string" ? props.description : undefined),
      gridPosition: {
        x: num(gp.x, (i % 2) * 6),
        y: num(gp.y, Math.floor(i / 2) * 4),
        w,
        h: num(gp.h, 4),
      },
      props: { ...props, config: cfg },
    };
  });
  const finalNodes = nodes.length > 0 ? nodes : [
    { id: crypto.randomUUID(), type: "empty-state", gridPosition: { x: 0, y: 0, w: 12, h: 4 }, props: { title: "Empty Application", description: "Add widgets to get started.", config: {} } },
  ];
  return {
    version: "1.0.0",
    meta: {
      title: typeof meta.title === "string" && meta.title.trim() ? meta.title : (requirements?.title || "Generated Application"),
      description: typeof meta.description === "string" ? meta.description : (requirements?.description || ""),
      theme: typeof meta.theme === "string" && meta.theme.trim() ? meta.theme : (requirements?.themePreference || "dark-glass"),
    },
    layout: { type: layoutType, columns: num(layout.columns, 12), gap: num(layout.gap, 16) },
    nodes: finalNodes,
  };
}

function extractJson(text: string): any {
  if (!text) throw new Error("The AI returned an empty response.");
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const first = t.indexOf("{");
  const last = t.lastIndexOf("}");
  if (first !== -1 && last !== -1 && last > first) t = t.slice(first, last + 1);
  try {
    return JSON.parse(t);
  } catch (e) {
    throw new Error("The AI response was not valid JSON. Please try rephrasing your request.");
  }
}

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

async function callChatCompletions(messages: any[]): Promise<string> {
  const res = await fetch(`${API_BASE}/code/api/v1/ai/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AI_API_TOKEN}`, "Content-Type": "application/json", "X-Session-ID": crypto.randomUUID() },
    body: JSON.stringify({ model: MODEL, messages, stream: false, temperature: 0.5 }),
  });
  if (!res.ok) {
    const text = await res.text();
    const e = parseUpstreamError(text);
    const err: any = new Error(e.message);
    err.status = res.status; err.raw = text;
    throw err;
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

async function callResponses(messages: any[]): Promise<string> {
  const input = messages.map((m) => ({ role: m.role, content: m.content }));
  const res = await fetch(`${API_BASE}/code/api/v1/ai/responses`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AI_API_TOKEN}`, "Content-Type": "application/json", "X-Session-ID": crypto.randomUUID() },
    body: JSON.stringify({ model: MODEL, input, stream: false, temperature: 0.5 }),
  });
  if (!res.ok) {
    const text = await res.text();
    const e = parseUpstreamError(text);
    const err: any = new Error(e.message);
    err.status = res.status; err.raw = text;
    throw err;
  }
  const data = await res.json();
  if (typeof data?.output_text === "string") return data.output_text;
  const items = Array.isArray(data?.output) ? data.output : [];
  const texts: string[] = [];
  for (const it of items) {
    if (it?.type === "message" && Array.isArray(it.content)) {
      for (const c of it.content) {
        if (c?.type === "output_text" && typeof c.text === "string") texts.push(c.text);
      }
    }
  }
  return texts.join("");
}

async function callLLM(messages: any[]): Promise<string> {
  try {
    return await callChatCompletions(messages);
  } catch (e: any) {
    if (isProtocolMismatch(e.status, e.raw || e.message)) {
      return await callResponses(messages);
    }
    throw e;
  }
}

function buildUserPrompt(prompt: string, requirements: any): string {
  const reqHint = requirements
    ? `\nDetected domain: ${requirements.domain}. Theme preference: ${requirements.themePreference}. Hinted widgets: ${(requirements.requestedWidgets || []).join(", ") || "n/a"}.`
    : "";
  return `User request:\n"""${prompt}"""${reqHint}\n\nGenerate the AppASTPayload JSON now. Output ONLY the JSON object.`;
}

function json(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    if (!AI_API_TOKEN) return json({ success: false, ast: null, errors: ["AI service is not configured."] }, 500);

    const body = await req.json().catch(() => ({}));
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return json({ success: false, ast: null, errors: ["A prompt is required."] }, 400);
    const requirements = body?.requirements ?? null;

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(prompt, requirements) },
    ];

    const text = await callLLM(messages);
    const rawAst = extractJson(text);
    const ast = normalizeAst(rawAst, requirements);

    return json({ success: true, ast, providerUsed: MODEL });
  } catch (e: any) {
    return json({ success: false, ast: null, errors: [e?.message || "Blueprint generation failed."] }, 500);
  }
});

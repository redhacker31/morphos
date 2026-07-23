import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Sparkles, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import { sb } from "@/lib/db";

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
  streaming?: boolean;
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "ai",
  content:
    "Welcome to MorphOS! Describe the app you want to build and I'll help you plan it. Try: \"A sales CRM dashboard with revenue KPIs, a pipeline chart, and a deals table.\"",
  timestamp: "Just now",
};

function relTime(iso?: string): string {
  if (!iso) return "Just now";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const { ready } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(
    `morphos-${Math.random().toString(36).slice(2)}`
  );
  const abortRef = useRef<AbortController | null>(null);

  // Load conversation history from the backend.
  useEffect(() => {
    if (!ready) return;
    (async () => {
      const { data } = await sb
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);
      if (data && data.length) {
        setMessages(
          data.map((r: any) => ({
            id: r.id,
            role: r.role as "ai" | "user",
            content: r.content,
            timestamp: relTime(r.created_at),
          }))
        );
      }
    })();
  }, [ready]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");
    setError(null);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    // Persist the user's message (ownership set server-side by trigger).
    void sb.from("chat_messages").insert({ role: "user", content: text });

    const aiId = `a-${Date.now()}`;
    const aiMsg: ChatMessage = {
      id: aiId,
      role: "ai",
      content: "",
      timestamp: "Just now",
      streaming: true,
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(true);

    const history = [...messages.filter((m) => m.id !== "welcome"), userMsg].map(
      (m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      })
    );

    abortRef.current = new AbortController();
    let acc = "";
    try {
      await fetchEventSource(`${SUPABASE_URL}/functions/v1/copilot-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "X-Session-ID": sessionIdRef.current,
        },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
        openWhenHidden: true,

        async onopen(res) {
          if (!res.ok) {
            const ct = res.headers.get("content-type") || "";
            let msg = `Request failed: ${res.status}`;
            if (ct.includes("text/event-stream")) {
              const t = await res.text();
              const m = t.match(/data: (.+)/);
              if (m) {
                let parsed: { message?: string } | null = null;
                try {
                  parsed = JSON.parse(m[1]);
                } catch {
                  parsed = null;
                }
                if (parsed?.message) msg = parsed.message;
              }
            } else if (ct.includes("application/json")) {
              const e = await res.json().catch(() => null);
              if (e?.error?.message) msg = e.error.message;
            }
            throw new Error(msg);
          }
        },

        onmessage(ev) {
          if (!ev.data) return;
          let d: any;
          try {
            d = JSON.parse(ev.data);
          } catch {
            return;
          }
          if (ev.event === "delta" && typeof d.content === "string") {
            acc += d.content;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiId ? { ...m, content: acc, streaming: true } : m
              )
            );
          } else if (ev.event === "error") {
            setError(d.message || "AI error");
          }
        },

        onerror(err) {
          throw err;
        },
      });

      if (acc.trim()) {
        await sb.from("chat_messages").insert({ role: "ai", content: acc });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId
              ? { ...m, content: acc, streaming: false, timestamp: "Just now" }
              : m
          )
        );
      } else {
        setMessages((prev) => prev.filter((m) => m.id !== aiId));
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        setError(e?.message || "Failed to get a response.");
        setMessages((prev) => prev.filter((m) => m.id !== aiId));
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 340, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="h-full border-l border-[var(--card-border)] bg-[var(--background-secondary)] flex flex-col overflow-hidden shrink-0"
        >
          {/* Header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--card-border)] shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[var(--primary-subtle)] flex items-center justify-center">
                <Sparkles size={14} className="text-[var(--primary)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">MorphOS Copilot</span>
                <span className="text-[10px] text-[var(--text-muted)]">Powered by GPT 5.6 Luna</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex gap-2.5 max-w-[92%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    msg.role === "ai"
                      ? "bg-[var(--primary-subtle)]"
                      : "bg-[var(--accent-subtle)]"
                  )}
                >
                  {msg.role === "ai" ? (
                    <Bot size={14} className="text-[var(--primary)]" />
                  ) : (
                    <User size={14} className="text-[var(--accent)]" />
                  )}
                </div>

                {/* Bubble */}
                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      "px-3.5 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap break-words",
                      msg.role === "ai"
                        ? "bg-[var(--card)] border border-[var(--card-border)] rounded-tl-sm"
                        : "bg-[var(--primary)] text-white rounded-tr-sm"
                    )}
                  >
                    {msg.content || (msg.streaming ? "" : "")}
                    {msg.streaming && !msg.content && (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "0.15s" }} />
                        <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "0.3s" }} />
                      </span>
                    )}
                    {msg.streaming && msg.content && (
                      <span className="inline-block w-1.5 h-4 bg-current animate-pulse ml-0.5 align-middle" />
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {error && (
              <div className="flex items-start gap-2 text-[11px] text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[var(--card-border)] shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask AI to modify..."
                disabled={isTyping}
                className="flex-1 bg-[var(--card)] border border-[var(--card-border)] px-4 py-2.5 rounded-xl text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/50 transition-colors disabled:opacity-50"
                aria-label="Chat message"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

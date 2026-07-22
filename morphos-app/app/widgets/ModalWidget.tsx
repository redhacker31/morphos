"use client";

import React, { memo, useState } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

export const ModalWidget = memo(function ModalWidget(props: WidgetProps) {
  const { title, triggerLabel = "Open Modal" } = props as {
    title?: string; triggerLabel?: string;
  } & WidgetProps;

  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="secondary-btn" onClick={() => setOpen(true)}>
        <i className="ph ph-frame-corners"></i> {triggerLabel}
      </button>
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }} onClick={() => setOpen(false)}>
          <div className="glass-panel" style={{
            padding: "2rem", maxWidth: "520px", width: "90%",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3 style={{ margin: 0 }}>{title ?? "Modal"}</h3>
              <button onClick={() => setOpen(false)} style={{
                background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.25rem",
              }}><i className="ph ph-x"></i></button>
            </div>
            {props.children ?? (
              <p style={{ color: "var(--text-muted)" }}>Modal content rendered from JSON.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export const AiChatWidget = memo(function AiChatWidget(props: WidgetProps) {
  const { messages: initialMessages } = props as {
    messages?: { role: string; content: string }[];
  } & WidgetProps;

  const [messages, setMessages] = useState(
    initialMessages ?? [{ role: "ai", content: "✅ Application generated. How can I help?" }]
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed },
      { role: "ai", content: "Schema updated based on your request." },
    ]);
    setInput("");
  };

  return (
    <div className="app-chat-panel" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="chat-header">
        <i className="ph ph-robot"></i>
        <span>MorphOS Copilot</span>
      </div>
      <div className="chat-history" style={{ flex: 1 }}>
        {messages.map((msg, i) => (
          <div key={`msg-${i}-${msg.role}`} className={`chat-bubble ${msg.role}`}>{msg.content}</div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI to modify..."
        />
        <button onClick={handleSend}><i className="ph ph-paper-plane-right"></i></button>
      </div>
    </div>
  );
});

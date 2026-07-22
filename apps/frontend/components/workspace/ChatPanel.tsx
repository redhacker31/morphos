"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockChatMessages, type ChatMessage } from "@/lib/mock-data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "ai",
        content: "I've noted your request. In the next phase, I'll be able to generate and modify your application in real-time. For now, explore the workspace!",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
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
              <span className="text-sm font-semibold">MorphOS Copilot</span>
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
                      "px-3.5 py-2.5 rounded-xl text-sm leading-relaxed",
                      msg.role === "ai"
                        ? "bg-[var(--card)] border border-[var(--card-border)] rounded-tl-sm"
                        : "bg-[var(--primary)] text-white rounded-tr-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[var(--primary-subtle)] flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-[var(--primary)]" />
                </div>
                <div className="px-4 py-3 rounded-xl rounded-tl-sm bg-[var(--card)] border border-[var(--card-border)] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[var(--card-border)] shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
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

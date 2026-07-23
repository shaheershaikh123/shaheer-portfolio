"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const QUICK = [
  "Kya services dete hain?",
  "Pricing kya hai?",
  "Portfolio dikhao",
  "Contact kaise karen?",
];

const WELCOME = {
  role: "assistant",
  text: "Assalam-o-Alaikum! 👋 Main Shaheer ka assistant hoon. Services, pricing, portfolio ya kisi bhi cheez ke bare me poochen!",
};

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  if (pathname?.startsWith("/admin")) return null;

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput("");
    const nextMessages = [...messages, { role: "user", text: msg }];
    setMessages(nextMessages);
    setTyping(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: msg, history: nextMessages.slice(-8) }),
      });
      const data = await r.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.reply || "Kuch masla hua — dobara try karen." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Connection ka masla hua. WhatsApp par baat karen: https://wa.me/923313143864",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const renderText = (text) =>
    text.split(/(https?:\/\/[^\s]+|\/[A-Za-z][^\s,!]*)/g).map((part, i) => {
      if (/^https?:\/\//.test(part)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline">
            {part.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        );
      }
      if (/^\/[A-Za-z]/.test(part)) {
        return (
          <a key={i} href={part} className="underline">
            {part}
          </a>
        );
      }
      return part;
    });

  return (
    <>
      {/* floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/40 transition-transform hover:scale-110"
        aria-label="Chat with Shaheer's assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.9 2 11.7c0 2.7 1.4 5.1 3.6 6.7-.1.9-.5 2.3-1.5 3.6 0 0 2.4-.3 4.5-1.9 1.1.3 2.2.5 3.4.5 5.5 0 10-3.9 10-8.9S17.5 3 12 3z" />
          </svg>
        )}
      </motion.button>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-[70] flex h-[520px] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0d0d0d] shadow-2xl shadow-black/60"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-4">
              <div className="relative">
                <img
                  src="/profile.jpg"
                  alt="Shaheer"
                  className="h-10 w-10 rounded-full border border-white/20 object-cover object-top"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0d0d0d] bg-green-400" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
                  Shaheer's Assistant
                </p>
                <p className="text-[11px] text-white/40">Online — usually replies instantly</p>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-white text-black"
                        : "rounded-bl-md border border-white/10 bg-white/[0.06] text-white/85"
                    }`}
                  >
                    {renderText(m.text)}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                        className="h-1.5 w-1.5 rounded-full bg-white/60"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* quick replies */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/70 transition-all hover:bg-white hover:text-black"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Apna sawal likhen..."
                className="flex-1 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/50"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 disabled:opacity-40"
                aria-label="Send"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2v6z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

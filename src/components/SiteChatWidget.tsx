"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { listingHref } from "@/lib/listing-slugs";

type ChatResult = {
  id: number;
  business_name: string;
  category: string | null;
  municipality: string | null;
  phone: string | null;
  website_url: string | null;
};

type PopularCategory = {
  name: string;
  count: number;
};

export default function SiteChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState<ChatResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [quickPrompts, setQuickPrompts] = useState<PopularCategory[]>([]);

  const ask = async (text: string) => {
    if (!text.trim()) return;
    setSubmitted(text);
    setLoading(true);
    setAnswer("");
    setResults([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Chat failed");
      setAnswer(data.answer || "I found something for you.");
      setResults(data.results || []);
    } catch {
      setAnswer("Something went wrong while checking the directory. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  useEffect(() => {
    const loadPopularCategories = async () => {
      try {
        const res = await fetch("/api/listings/popular-categories");
        const data = await res.json();
        if (!res.ok) return;
        setQuickPrompts(Array.isArray(data.categories) ? data.categories : []);
      } catch {
        setQuickPrompts([]);
      }
    };

    loadPopularCategories();
  }, []);

  const send = () => ask(input);
  const handlePromptClick = (prompt: string) => {
    setOpen(true);
    ask(prompt);
  };

  return (
    <>
      <button type="button" aria-label="Open chat assistant" onClick={() => setOpen((v) => !v)} className="site-chat-trigger">
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div className="site-chat-panel">
          <div className="site-chat-header">
            <div>
              <p className="site-chat-kicker">Siargao Finder Assistant</p>
              <h3 className="site-chat-title">Need help finding something?</h3>
            </div>
            <Sparkles size={16} className="text-white/70" />
          </div>

          <div className="site-chat-body">
            <p className="site-chat-copy">Try one of the popular categories below.</p>

            <div className="site-chat-prompt-list">
              {quickPrompts.map((prompt) => (
                <button key={prompt.name} type="button" onClick={() => handlePromptClick(prompt.name)} className="site-chat-prompt">
                  {prompt.name}
                </button>
              ))}
            </div>

            {submitted && (
              <div className="site-chat-response">
                <p className="site-chat-user">“{submitted}”</p>
                <p className="site-chat-answer">{loading ? "Checking the directory..." : answer}</p>

                {!loading && results.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {results.map((item) => (
                      <Link key={item.id} href={listingHref(item)} className="block rounded-2xl border border-slate-200/80 bg-white px-3 py-2 hover:bg-slate-50 transition">
                        <div className="text-sm font-semibold text-slate-900">{item.business_name}</div>
                        <div className="text-xs text-slate-500 mt-1">{item.category || "General Services"} • {item.municipality || "Siargao"}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="site-chat-footer">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Pick a popular category or type one..." className="site-chat-input" />
            <button type="button" onClick={send} className="site-chat-send">Send</button>
          </div>
        </div>
      )}
    </>
  );
}

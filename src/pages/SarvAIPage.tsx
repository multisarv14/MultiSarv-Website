import React from "react";
import { Bot, Send } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { useSEO } from "../hooks/useSEO";

export default function SarvAIPage() {
  useSEO({
    title: "SarvAI — Intelligent Solutions Companion",
    description: "Chat with SarvAI, MultiSarv India's AI assistant. Ask about our SaaS products, pricing, system architecture, and more."
  });

  const { chatMessages, chatInput, setChatInput, chatLoading, chatEndRef, handleChatSubmit, setChatMessages } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 font-sans">
      <div className="text-center space-y-3 animate-fade-in">
        <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">Enterprise Solutions Companion</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 dark:text-white">SarvAI Intelligent Partner</h1>
        <p className="max-w-xl mx-auto text-sm text-slate-500">
          Ask queries about our SaaS products (RealtyConnect, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, NOAI), custom pricing packages, system architectures, or technical timelines.
        </p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col h-[550px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/10">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">SarvAI Assistant Core</h3>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Solutions Expert Online
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm("Clear current conversation history?")) {
                setChatMessages([
                  {
                    id: "msg-init",
                    sender: "sarvai",
                    text: "Namaste! I am **SarvAI**, your expert Solutions Architect at **MultiSarv India**. Ask me anything about our platforms (RealtyConnect, SocietySarv, HRSarv, FinSarv, EduSarv, HealthSarv, NOAI), custom software services, or test our AI tools! **How can I help you today?**",
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  }
                ]);
              }
            }}
            className="text-[10px] uppercase font-mono text-slate-500 hover:text-white transition-all bg-slate-950 px-2.5 py-1 rounded border border-slate-800/60"
          >
            Clear Chat
          </button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin relative z-10">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-800 text-slate-200 border border-slate-700/60 shadow-inner"
                }`}
              >
                <div className="prose prose-invert max-w-none text-slate-100 font-sans whitespace-pre-wrap">
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400/80 mt-1.5 block text-right font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-400 space-x-1.5 p-4 rounded-2xl text-[10px] font-mono flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 relative z-10">
          {[
            "Tell me about RealtyConnect ERP features",
            "Explain SocietySarv security stack",
            "What are custom CRM integration fees?"
          ].map((suggest, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setChatInput(suggest)}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-800/60 px-3 py-2 rounded-xl text-[10px] text-slate-400 hover:text-white transition-all text-left overflow-hidden text-ellipsis cursor-pointer"
            >
              💡 {suggest}
            </button>
          ))}
        </div>

        <form onSubmit={handleChatSubmit} className="mt-3 flex gap-2 pt-3 border-t border-slate-800/85 relative z-10">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type message or click a suggestion prompt..."
            className="flex-grow bg-slate-950 text-xs text-white border border-slate-800 focus:border-cyan-500/80 placeholder-slate-500 rounded-xl px-4 py-3 outline-none font-sans"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";

export default function Copilot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your Knowledge Base Copilot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "I found some relevant information in the knowledge base. Let me summarize it for you...",
        "Based on your query, here are the key points from our documentation...",
        "I can help you with that! Here's what I found in the system...",
        "Let me search through the knowledge base for you...",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-xs z-[1001] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div
        className={`fixed top-[70px] right-5 w-[400px] max-w-[calc(100vw-40px)] h-[calc(100vh-100px)] max-h-[700px] z-[1002] transition-all duration-400 ease-smooth ${
          isOpen
            ? 'opacity-100 visible translate-y-0 scale-100'
            : 'opacity-0 invisible -translate-y-5 scale-95'
        }`}
        style={{ transformOrigin: 'top right' }}
      >
        <div className="h-full flex flex-col rounded-[20px] bg-surface-medium backdrop-blur-glass-lg border border-white/10 shadow-glass-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-5 border-b border-white/[0.08] bg-gradient-to-b from-neon-violet/10 to-transparent">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center shadow-glow-violet">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <circle cx="12" cy="17" r="3" />
                <path d="M12 14v-2" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Knowledge Copilot</h3>
              <span className="flex items-center gap-1.5 text-xs text-white/60 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
                Online
              </span>
            </div>
            <button
              className="w-9 h-9 rounded-xl bg-white/[0.05] text-white/60 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all"
              onClick={onClose}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 animate-fade-in-up ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-neon-violet to-neon-blue text-white rounded-br-sm'
                      : 'bg-white/[0.08] text-white/90 rounded-bl-sm'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                </div>
                <div className="px-5 py-4 rounded-2xl rounded-bl-sm bg-white/[0.08]">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-hide border-t border-white/[0.05]">
            <button
              className="px-3.5 py-2 rounded-full bg-neon-violet/15 border border-neon-violet/30 text-neon-violet/90 text-xs whitespace-nowrap hover:bg-neon-violet/25 hover:text-white transition-all"
              onClick={() => setInput("Show me recent projects")}
            >
              Recent Projects
            </button>
            <button
              className="px-3.5 py-2 rounded-full bg-neon-violet/15 border border-neon-violet/30 text-neon-violet/90 text-xs whitespace-nowrap hover:bg-neon-violet/25 hover:text-white transition-all"
              onClick={() => setInput("How do I create a task?")}
            >
              Create Task
            </button>
            <button
              className="px-3.5 py-2 rounded-full bg-neon-violet/15 border border-neon-violet/30 text-neon-violet/90 text-xs whitespace-nowrap hover:bg-neon-violet/25 hover:text-white transition-all"
              onClick={() => setInput("Search documentation")}
            >
              Search Docs
            </button>
          </div>

          {/* Input */}
          <div className="flex gap-2.5 p-4 border-t border-white/[0.08] bg-black/20">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.08] border border-white/10 text-white placeholder-white/40 text-sm resize-none outline-none focus:border-neon-violet/50 focus:bg-white/10 transition-all"
            />
            <button
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue text-white flex items-center justify-center transition-all hover:scale-105 hover:shadow-glow-violet disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

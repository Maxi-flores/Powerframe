import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Out() {
  const { activeProject } = useProjects();
  const [messages, setMessages] = useState([
    { id: 1, to: "team@company.com", subject: "Weekly Update", status: "sent", date: "2026-02-20" },
    { id: 2, to: "client@example.com", subject: "Project Proposal", status: "sent", date: "2026-02-19" },
    { id: 3, to: "dev@team.io", subject: "API Documentation", status: "draft", date: "2026-02-22" },
  ]);

  const [composing, setComposing] = useState(false);
  const [newMessage, setNewMessage] = useState({ to: "", subject: "", body: "" });

  function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.to || !newMessage.subject) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      ...newMessage,
      status: "sent",
      date: new Date().toISOString().split("T")[0]
    }]);
    setNewMessage({ to: "", subject: "", body: "" });
    setComposing(false);
  }

  const statusConfig = {
    sent: { color: "text-neon-green", bg: "bg-neon-green/20", dot: "bg-neon-green" },
    draft: { color: "text-neon-orange", bg: "bg-neon-orange/20", dot: "bg-neon-orange" }
  };

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Outbox</h1>
          <p className="text-white/60 text-sm">
            <span className="text-neon-violet">{activeProject?.name}</span> — Sent messages & drafts
          </p>
        </div>
        <button className="btn-neon" onClick={() => setComposing(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Compose
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map(msg => {
          const config = statusConfig[msg.status];
          return (
            <div key={msg.id} className="glass-card p-4 flex items-center gap-4 group">
              <div className={`w-3 h-3 rounded-full ${config.dot}`} />

              <div className="flex-1 min-w-0">
                <span className="block text-sm font-medium text-white truncate">{msg.to}</span>
                <span className="text-sm text-white/60 truncate block">{msg.subject}</span>
              </div>

              <span className="text-xs text-white/40 hidden sm:block">{msg.date}</span>

              <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-semibold ${config.bg} ${config.color}`}>
                {msg.status}
              </span>
            </div>
          );
        })}

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="glass-card p-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.06] flex items-center justify-center">
              <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white/50 mb-2">No messages yet</p>
            <p className="text-white/30 text-sm">Click Compose to send your first message</p>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {composing && (
        <div className="modal-overlay" onClick={() => setComposing(false)}>
          <div className="modal max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Compose Message</h2>
              <button
                className="w-8 h-8 rounded-lg bg-white/[0.06] text-white/60 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
                onClick={() => setComposing(false)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={sendMessage} className="space-y-5">
              <div>
                <label className="block text-sm text-white/70 mb-2">To</label>
                <input
                  type="email"
                  value={newMessage.to}
                  onChange={e => setNewMessage(m => ({ ...m, to: e.target.value }))}
                  placeholder="recipient@example.com"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Subject</label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={e => setNewMessage(m => ({ ...m, subject: e.target.value }))}
                  placeholder="Message subject"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Body</label>
                <textarea
                  value={newMessage.body}
                  onChange={e => setNewMessage(m => ({ ...m, body: e.target.value }))}
                  placeholder="Write your message..."
                  rows={6}
                  className="input resize-none"
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-glass"
                  onClick={() => setComposing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-neon">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

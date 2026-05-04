import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function CRM() {
  const { currentTheme } = useTheme();

  return (
    <div className="p-6 lg:p-8 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue/10 border border-neon-blue/40 text-neon-blue">
            CRM
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/70">
            Coming Soon
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Customer Relations</h1>
        <p className="text-white/60">Manage customer accounts, connections, and relationships across your ecosystem.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-6 rounded-[20px] border border-white/[0.12]">
          <div className="text-white/50 text-sm mb-2">Total Contacts</div>
          <div className="text-4xl font-bold text-white">0</div>
          <div className="text-white/40 text-xs mt-2">No contacts yet</div>
        </div>
        <div className="glass-card p-6 rounded-[20px] border border-white/[0.12]">
          <div className="text-white/50 text-sm mb-2">Accounts</div>
          <div className="text-4xl font-bold text-white">0</div>
          <div className="text-white/40 text-xs mt-2">Create your first account</div>
        </div>
        <div className="glass-card p-6 rounded-[20px] border border-white/[0.12]">
          <div className="text-white/50 text-sm mb-2">Connections</div>
          <div className="text-4xl font-bold text-white">0</div>
          <div className="text-white/40 text-xs mt-2">Link external services</div>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Contacts</h2>
        <div className="glass-card p-8 rounded-[22px] border border-white/[0.08] text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-white/60 text-sm">No contacts yet. Add your first contact to get started.</p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/[0.08] transition-all">
            + Add Contact
          </button>
        </div>
      </div>

      {/* Service Connectors Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Service Connectors</h2>
        <div className="glass-card p-8 rounded-[22px] border border-white/[0.08] text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <p className="text-white/60 text-sm">No connectors configured. Link your external services here.</p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/[0.08] transition-all">
            + Connect Service
          </button>
        </div>
      </div>
    </div>
  );
}

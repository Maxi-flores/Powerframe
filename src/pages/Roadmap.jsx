import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Roadmap() {
  const { currentTheme } = useTheme();

  return (
    <div className="p-6 lg:p-8 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan">
            ROADMAP
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/70">
            Coming Soon
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Knowledgebase & Planning</h1>
        <p className="text-white/60">Orchestrate AI prompts, manage project notes, and build your roadmap with powerful planning tools.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-6 rounded-[20px] border border-white/[0.12]">
          <div className="text-white/50 text-sm mb-2">Project Notes</div>
          <div className="text-4xl font-bold text-white">0</div>
          <div className="text-white/40 text-xs mt-2">Start documenting ideas</div>
        </div>
        <div className="glass-card p-6 rounded-[20px] border border-white/[0.12]">
          <div className="text-white/50 text-sm mb-2">Milestones</div>
          <div className="text-4xl font-bold text-white">0</div>
          <div className="text-white/40 text-xs mt-2">Plan your roadmap</div>
        </div>
        <div className="glass-card p-6 rounded-[20px] border border-white/[0.12]">
          <div className="text-white/50 text-sm mb-2">AI Prompts</div>
          <div className="text-4xl font-bold text-white">0</div>
          <div className="text-white/40 text-xs mt-2">Orchestrate AI workflows</div>
        </div>
      </div>

      {/* Active Roadmap Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Active Roadmap</h2>
        <div className="glass-card p-8 rounded-[22px] border border-white/[0.08]">
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-white/60 text-sm">Your roadmap timeline will appear here.</p>
              <button className="mt-4 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/[0.08] transition-all">
                + Create Milestone
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledgebase Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Knowledgebase</h2>
        <div className="glass-card p-8 rounded-[22px] border border-white/[0.08] text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25S6.5 28 12 28s10-4.745 10-10.75S17.5 6.253 12 6.253z" />
          </svg>
          <p className="text-white/60 text-sm">No notes yet. Build your knowledgebase by adding project documentation.</p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/[0.08] transition-all">
            + Add Note
          </button>
        </div>
      </div>

      {/* AI Prompt Orchestration Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">AI Prompt Orchestration</h2>
        <div className="glass-card p-8 rounded-[22px] border border-white/[0.08] text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3 3 21h4l2-4h6l2 4h4L12 3Z" />
          </svg>
          <p className="text-white/60 text-sm">Configure AI workflows and prompt chains to automate your processes.</p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/[0.08] transition-all">
            + Create Workflow
          </button>
        </div>
      </div>
    </div>
  );
}

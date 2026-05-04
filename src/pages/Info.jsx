import React from "react";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Info() {
  const { activeProject } = useProjects();

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Info</h1>
        <p className="text-white/60 text-sm">System information & help</p>
      </div>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Current Project */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-violet/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Current Project</h3>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl shadow-lg"
              style={{ background: activeProject?.color }}
            />
            <div>
              <strong className="block text-base">{activeProject?.name}</strong>
              <p className="text-sm text-white/50 mt-1">{activeProject?.description}</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-green/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">System Status</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
              <span className="flex-1 text-sm">API Server</span>
              <span className="text-xs text-neon-green">Online</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
              <span className="flex-1 text-sm">Database</span>
              <span className="text-xs text-neon-green">Connected</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
              <span className="flex-1 text-sm">Auth Service</span>
              <span className="text-xs text-neon-green">Active</span>
            </div>
          </div>
        </div>

        {/* Version */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Version</h3>
          </div>

          <div className="text-center py-2">
            <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-neon-violet to-neon-blue text-lg font-bold shadow-glow-violet">
              V2.0.0
            </span>
            <p className="text-white/60 mt-4">PowerFrame BMS Dashboard</p>
            <p className="text-white/40 text-xs mt-1">Released: February 2026</p>
          </div>
        </div>

        {/* Quick Help */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Quick Help</h3>
          </div>

          <div className="space-y-2">
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all group">
              <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm">Documentation</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all group">
              <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">Support Chat</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all group">
              <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Video Tutorials</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all group">
              <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Contact Us</span>
            </a>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="glass-card p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-orange/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">Ctrl</kbd>
                <span className="text-white/40">+</span>
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">K</kbd>
              </div>
              <span className="text-sm text-white/50">Quick Search</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">Ctrl</kbd>
                <span className="text-white/40">+</span>
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">N</kbd>
              </div>
              <span className="text-sm text-white/50">New Project</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">Ctrl</kbd>
                <span className="text-white/40">+</span>
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">D</kbd>
              </div>
              <span className="text-sm text-white/50">Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">Ctrl</kbd>
                <span className="text-white/40">+</span>
                <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-mono">P</kbd>
              </div>
              <span className="text-sm text-white/50">Switch Project</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

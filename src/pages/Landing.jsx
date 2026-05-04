import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const isLoggedIn = !!localStorage.getItem("token");

  const apps = [
    {
      name: "BMS",
      fullName: "Business Management",
      description: "Pilot application for dashboards, project management, and system generation.",
      path: "/bms",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" className="text-neon-violet">
          <path d="M14 4c3.5 0 6 2.5 6 6-2.5 4-6.5 8-10.5 10.5-3.5 0-5.5-2-5.5-5.5C6 10.5 10 6.5 14 4Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 14l-2 2M12 16l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15.5 8.5h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      ),
      accentColor: "#7c3aed",
      bgGradient: "from-neon-violet/10 to-neon-blue/5",
      borderColor: "border-neon-violet/30",
    },
    {
      name: "CRM",
      fullName: "Customer Relations",
      description: "Store user accounts, connect external webshops, and manage service integrations.",
      path: "/crm",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" className="text-neon-blue">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      accentColor: "#2563eb",
      bgGradient: "from-neon-blue/10 to-neon-cyan/5",
      borderColor: "border-neon-blue/30",
    },
    {
      name: "Roadmap",
      fullName: "Knowledgebase & Planning",
      description: "Project notes, AI prompt orchestration, and strategic roadmap management.",
      path: "/roadmap",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" className="text-neon-cyan">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      accentColor: "#0891b2",
      bgGradient: "from-neon-cyan/10 to-neon-blue/5",
      borderColor: "border-neon-cyan/30",
    },
  ];

  return (
    <div className="min-h-screen bg-navy-gradient flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet/20 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/15 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-violet/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 lg:p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center shadow-glow-violet">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Powerframe</span>
        </div>
        {!isLoggedIn && (
          <Link
            to="/bms-login"
            className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all"
          >
            Sign In
          </Link>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            The Powerframe
            <span className="block bg-gradient-to-r from-neon-violet via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Your gateway to interconnected applications. Access BMS, CRM, and planning tools in one unified platform.
          </p>
        </div>

        {/* App Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
          {apps.map(app => (
            <div key={app.name} className={`glass-card p-6 rounded-[22px] border ${app.borderColor} bg-gradient-to-br ${app.bgGradient} group hover:shadow-glow-violet transition-all duration-300 flex flex-col`}>
              {/* Icon Box */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `${app.accentColor}22`, borderColor: `${app.accentColor}44`, borderWidth: '1px' }}
              >
                {app.icon}
              </div>

              {/* App Name */}
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-1">{app.name}</h3>
              <h2 className="text-xl font-bold text-white mb-2">{app.fullName}</h2>

              {/* Description */}
              <p className="text-sm text-white/60 mb-6 flex-1">{app.description}</p>

              {/* CTA Button */}
              {isLoggedIn ? (
                <Link
                  to={app.path}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.12] text-white text-sm font-medium hover:bg-white/[0.12] transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Open</span>
                  <span>→</span>
                </Link>
              ) : (
                <Link
                  to="/bms-login"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.12] text-white text-sm font-medium hover:bg-white/[0.12] transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Sign in to access</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Auth Status Message */}
        {!isLoggedIn && (
          <div className="text-center">
            <p className="text-white/50 text-sm mb-4">New to Powerframe?</p>
            <Link
              to="/bms-login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-violet to-neon-blue text-white font-semibold hover:shadow-glow-violet transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>© 2026 Powerframe. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

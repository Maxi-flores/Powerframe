import React from "react";
import { Link } from "react-router-dom";

export default function PublicLanding() {
  return (
    <div className="min-h-screen bg-navy-gradient flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-powerstarter-blue/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-powerstarter-red/8 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-powerstarter-blue/4 rounded-full blur-[150px]" />
      </div>

      <header className="relative z-10 p-6 lg:p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Powerstarter"
            className="header-logo logo-glow shrink-0"
          />
          <span className="text-xl font-bold text-white">Powerstarter</span>
        </div>
        <Link
          to="/login"
          className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-powerstarter-blue/15 text-white text-sm font-medium hover:bg-powerstarter-blue/10 hover:border-powerstarter-red/25 transition-all"
        >
          Sign In
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-4xl">
          <img
            src="/logo.svg"
            alt="Powerstarter"
            className="hero-logo logo-glow mx-auto mb-8"
          />

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            The Powerstarter
            <span className="block bg-gradient-to-r from-powerstarter-blue via-powerstarter-blueDeep to-powerstarter-red bg-clip-text text-transparent">
              Hub
            </span>
          </h1>

          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Smart project launch hub for apps, game feeds, project journals, and TheRocketTree integrations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="btn-neon px-8 py-4 text-base"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </Link>
            <a
              href="#features"
            className="px-8 py-4 rounded-xl bg-white/[0.06] border border-powerstarter-blue/15 text-white font-medium hover:bg-powerstarter-blue/10 hover:border-powerstarter-red/25 transition-all flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/[0.06]">
            <div>
              <div className="text-3xl font-bold text-powerstarter-blue mb-1">1 Hub</div>
              <div className="text-sm text-white/50">Launch System</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-powerstarter-red mb-1">∞</div>
              <div className="text-sm text-white/50">Project Paths</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-powerstarter-blueDeep mb-1">24/7</div>
              <div className="text-sm text-white/50">Smart Access</div>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="relative z-10 px-6 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-12">
            Everything you need to launch and grow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center group hover:shadow-glow-powerstarter transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-powerstarter-blue/10 to-white/5 border border-white/8 flex items-center justify-center group-hover:from-powerstarter-blue/14 group-hover:to-powerstarter-red/8 transition-all">
                <svg className="w-7 h-7 text-powerstarter-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart App Hub</h3>
              <p className="text-sm text-white/50">Connect project input, workflows, and future app output from one central hub.</p>
            </div>

            <div className="glass-card p-6 text-center group hover:shadow-glow-powerstarter transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-powerstarter-blue/10 to-white/5 border border-white/8 flex items-center justify-center group-hover:from-powerstarter-blue/14 group-hover:to-powerstarter-red/8 transition-all">
                <svg className="w-7 h-7 text-powerstarter-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">TheRocketTree Feed</h3>
              <p className="text-sm text-white/50">Prepare game-driven project events, feed output, and interactive progression.</p>
            </div>

            <div className="glass-card p-6 text-center group hover:shadow-glow-powerstarter transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-powerstarter-blue/10 to-white/5 border border-white/8 flex items-center justify-center group-hover:from-powerstarter-blue/14 group-hover:to-powerstarter-red/8 transition-all">
                <svg className="w-7 h-7 text-powerstarter-blueDeep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Project Access</h3>
              <p className="text-sm text-white/50">Designed for private user access, project journals, and controlled ecosystem routes.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 py-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <img src="/logo.svg" alt="" aria-hidden="true" className="footer-logo logo-glow shrink-0" />
            <span>© 2026 Powerstarter. Powered by Powerframe.</span>
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


import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { POWERFRAME_APPS, getAppHref, isExternalApp } from "../config/apps.js";
import { useProjects } from "../context/ProjectContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Copilot from "../components/Copilot.jsx";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeProject, projects, switchProject } = useProjects();
  const { currentTheme } = useTheme();

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showProjectSwitcher, setShowProjectSwitcher] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [search, setSearch] = useState("");

  const appItems = POWERFRAME_APPS.map(app => ({
    key: app.name,
    path: getAppHref(app),
    icon: Icons[app.iconKey] ?? Icons.rocket,
    color: app.accent,
    isExternal: isExternalApp(app),
  }));

  const navItems = [
    { key: "Dashboard", path: "/bms", icon: Icons.home },
    { key: "Out", path: "/bms/out", icon: Icons.send },
    { key: "Tasks", path: "/bms/tasks", icon: Icons.checklist },
    { key: "Plans", path: "/bms/plans", icon: Icons.calendar },
    { key: "Web search", path: "/bms/search", icon: Icons.search },
    { key: "Projects", path: "/bms/projects", icon: Icons.folder },
    { key: "Bestanden", path: "/bms/files", icon: Icons.archive },
    { key: "Info", path: "/bms/info", icon: Icons.info },
  ];

  const currentPath = location.pathname;
  const activeKey = navItems.find(item =>
    item.path === currentPath || (item.path !== "/bms" && currentPath.startsWith(item.path))
  )?.key || "Dashboard";

  const activeApp = appItems.find(a => currentPath.startsWith(a.path))?.key || "BMS";

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("powerframe_user");
      navigate("/bms-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (showMenu && !e.target.closest(".menu-container")) {
        setShowMenu(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showMenu]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: currentTheme.customBg || currentTheme.gradient
      }}
    >
      {/* Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main gradient overlay */}
        <div
          className="absolute inset-[-60px] opacity-60"
          style={{
            background: `linear-gradient(90deg, ${currentTheme.bg1}, ${currentTheme.bg2})`
          }}
        />
        {/* Radial glow - top left */}
        <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-neon-violet/10 rounded-full blur-[120px]" />
        {/* Radial glow - bottom right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px]" />
        {/* Light streak effect */}
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-violet/20 to-transparent rotate-[15deg] blur-sm" />
        <div className="absolute bottom-1/3 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/15 to-transparent -rotate-[10deg] blur-sm" />
      </div>

      {/* Main Shell */}
      <div className="relative z-10 flex min-h-screen p-4 lg:p-[18px] gap-4 lg:gap-[18px]">

        {/* Collapsible Sidebar */}
        <aside
          className={`hidden md:block relative transition-all duration-300 ease-smooth ${
            sidebarExpanded ? 'w-[260px] min-w-[260px]' : 'w-[68px] min-w-[68px]'
          }`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => { setSidebarExpanded(false); setShowProjectSwitcher(false); }}
        >
          <div className="h-[calc(100vh-36px)] rounded-[20px] bg-sidebar backdrop-blur-glass border border-white/[0.12] shadow-glass-lg overflow-hidden flex flex-col p-3.5">

            {/* Brand */}
            <div
              className="flex items-center gap-2.5 p-2 rounded-[14px] cursor-pointer transition-colors duration-150 hover:bg-white/[0.06] overflow-hidden"
              onClick={() => setShowProjectSwitcher(!showProjectSwitcher)}
            >
              <img
                src="/symbol_logo_small.png"
                alt="Powerframe"
                className="w-[38px] h-[38px] min-w-[38px] rounded-xl shadow-inner-glow"
              />
              <div className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
              }`}>
                <div className="font-bold text-[13px] text-white">{activeProject?.name || "PowerFrame"}</div>
                <div className="text-[11px] text-white/45 mt-0.5">BMS • V2</div>
              </div>
            </div>

            {/* Project Switcher Dropdown */}
            {showProjectSwitcher && sidebarExpanded && (
              <div className="my-2.5 flex flex-col gap-1 animate-fade-in-up">
                {projects.map(p => (
                  <button
                    key={p.id}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs text-white whitespace-nowrap overflow-hidden transition-all duration-150 ${
                      p.id === activeProject?.id
                        ? 'bg-neon-green/10 border border-neon-green/40'
                        : 'bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]'
                    }`}
                    onClick={() => { switchProject(p.id); setShowProjectSwitcher(false); }}
                  >
                    <span className="w-2.5 h-2.5 min-w-[10px] rounded" style={{ background: p.color }} />
                    <span>{p.name}</span>
                  </button>
                ))}
                <button
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs text-neon-green border border-dashed border-white/[0.08] hover:bg-white/[0.08] transition-colors"
                  onClick={() => { navigate("/bms/projects"); setShowProjectSwitcher(false); }}
                >
                  + New Project
                </button>
              </div>
            )}

            {/* Progress */}
            <div className={`px-2 py-2.5 transition-all duration-300 overflow-hidden ${
              sidebarExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0'
            }`}>
              <div className="flex justify-between text-[11px] text-white/50">
                <span>V2</span>
                <span>58%</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-white/75 to-neon-blue/80"
                  style={{ width: "58%" }}
                />
              </div>
            </div>

            {/* Apps Switcher */}
            <div className="flex flex-col gap-1.5 mt-2.5 pt-2.5 border-t border-white/[0.06]">
              {appItems.map((app) => (
                <button
                  key={app.key}
                  className={`flex items-center gap-3 px-3 py-3 rounded-[14px] border transition-all duration-150 cursor-pointer overflow-hidden ${
                    activeApp === app.key
                      ? 'border-white/40 text-white'
                      : 'border-transparent text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`}
                  style={activeApp === app.key ? {
                    background: `${app.color}22`,
                    borderColor: `${app.color}66`
                  } : {}}
                  onClick={() => app.isExternal ? window.location.href = app.path : navigate(app.path)}
                  title={app.key}
                >
                  <span className="min-w-[20px] flex items-center justify-center">{app.icon}</span>
                  <span className={`text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
                    sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                  }`}>
                    {app.key}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-1.5 mt-2.5 pt-2.5 border-t border-white/[0.06] overflow-y-auto overflow-x-hidden scrollbar-hide">
              {navItems.map((it) => (
                <button
                  key={it.key}
                  className={`flex items-center gap-3 px-3 py-3 rounded-[14px] border transition-all duration-150 cursor-pointer overflow-hidden ${
                    activeKey === it.key
                      ? 'border-neon-violet/40 text-white'
                      : 'border-transparent text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`}
                  style={activeKey === it.key ? {
                    background: `${currentTheme.accent}22`,
                    borderColor: `${currentTheme.accent}66`
                  } : {}}
                  onClick={() => navigate(it.path)}
                  title={it.key}
                >
                  <span className="min-w-[20px] flex items-center justify-center">{it.icon}</span>
                  <span className={`text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
                    sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                  }`}>
                    {it.key}
                  </span>
                </button>
              ))}
            </nav>

            {/* Bottom controls */}
            <div className="flex gap-1.5 pt-2.5 border-t border-white/[0.06] mt-2.5">
              <button className="flex-1 flex items-center justify-center p-2.5 rounded-[14px] text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors" title="Scroll up">
                {Icons.chevronUp}
              </button>
              <button className="flex-1 flex items-center justify-center p-2.5 rounded-[14px] text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors" title="Scroll down">
                {Icons.chevronDown}
              </button>
            </div>
          </div>

          {/* FAB */}
          <button
            className="absolute -right-5 bottom-[30px] w-12 h-12 rounded-full border-none cursor-pointer shadow-fab flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-100"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), transparent 55%), ${currentTheme.accent}`
            }}
            onClick={() => navigate("/bms/projects")}
            title="New Project"
          >
            <span className="text-[28px] text-black/75 font-light">+</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col gap-3.5">

          {/* Top Bar */}
          <header className="h-16 rounded-[20px] bg-topbar backdrop-blur-glass border border-white/[0.14] shadow-glass flex items-center px-3.5 gap-3.5 flex-shrink-0">

            {/* Left - Logo */}
            <div className="flex items-center gap-3 min-w-0 lg:min-w-[240px]">
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-2xl border border-white/10 bg-white/[0.04]">
                <img src="/symbol_logo_small.png" alt="Powerframe" className="w-5 h-5 flex items-center text-neon-violet" />
                <span className="font-bold text-[13px] hidden sm:block">Powerframe</span>
              </div>
              <div className="font-extrabold text-lg hidden lg:block">| {activeKey}</div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 hidden lg:flex items-center gap-2.5 min-w-[200px]">
              <span className="text-[13px] text-white/50">Zoeken:</span>
              <div className="relative flex-1 max-w-[400px]">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search modules, tasks, projects…"
                  className="w-full h-[38px] rounded-full px-4 pr-10 border border-white/[0.14] bg-black/20 text-white placeholder-white/35 outline-none focus:border-neon-violet/50 focus:bg-black/30 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                  {Icons.search}
                </span>
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2.5">
              <button
                className="w-10 h-10 rounded-[14px] border border-white/[0.12] bg-white/[0.04] text-white/85 flex items-center justify-center cursor-pointer hover:bg-white/[0.08] transition-colors"
                title="Notifications"
                onClick={() => navigate("/bms/notifications")}
              >
                {Icons.bell}
              </button>
              <button
                className="w-10 h-10 rounded-[14px] border border-white/[0.12] bg-white/[0.04] text-white/85 flex items-center justify-center cursor-pointer hover:bg-white/[0.08] transition-colors hidden sm:flex"
                title="Profile"
                onClick={() => navigate("/bms/profile")}
              >
                {Icons.user}
              </button>

              {/* Menu Dropdown */}
              <div className="menu-container relative">
                <button
                  className="w-10 h-10 rounded-[14px] border border-white/[0.12] bg-white/[0.04] text-white/85 flex items-center justify-center cursor-pointer hover:bg-white/[0.08] transition-colors"
                  title="Menu"
                  onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                >
                  {Icons.menu}
                </button>
                {showMenu && (
                  <div className="dropdown absolute top-[calc(100%+8px)] right-0 w-[200px] animate-fade-in-up">
                    <button
                      className="dropdown-item"
                      onClick={() => { navigate("/bms/profile"); setShowMenu(false); }}
                    >
                      {Icons.user} <span>Profile</span>
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => { navigate("/bms/settings"); setShowMenu(false); }}
                    >
                      {Icons.settings} <span>Settings</span>
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => { navigate("/bms/management"); setShowMenu(false); }}
                    >
                      {Icons.management} <span>Management</span>
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-item danger"
                      onClick={handleLogout}
                    >
                      {Icons.logout} <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* AI Copilot Button */}
              <button
                className={`w-[46px] h-[46px] rounded-2xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  showCopilot
                    ? 'bg-gradient-to-br from-neon-violet to-neon-blue border-transparent shadow-glow-violet'
                    : 'border-white/[0.18] bg-gradient-to-b from-white/10 to-white/[0.04] text-white/90 hover:from-neon-violet/30 hover:to-neon-blue/30 hover:border-neon-violet/50 hover:scale-105'
                }`}
                title="AI Copilot"
                onClick={() => setShowCopilot(!showCopilot)}
              >
                {Icons.ai}
              </button>
            </div>
          </header>

          {/* Page Content */}
          <section className="flex-1 min-h-0 rounded-[22px] bg-black/[0.08] border border-white/[0.08] shadow-glass overflow-auto">
            <Outlet />
          </section>

          {/* Footer */}
          <footer className="h-9 flex items-center justify-center flex-shrink-0">
            <div className="flex items-center gap-2 opacity-35 text-white/75 text-xs font-bold tracking-wider lowercase">
              <img src="/symbol_logo_small.png" alt="Powerframe" className="w-4 h-4" />
              <span>powerframe</span>
            </div>
          </footer>
        </main>
      </div>

      {/* AI Copilot */}
      <Copilot isOpen={showCopilot} onClose={() => setShowCopilot(false)} />
    </div>
  );
}

/* Icons */
const Icons = {
  rocket: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M14 4c3.5 0 6 2.5 6 6-2.5 4-6.5 8-10.5 10.5-3.5 0-5.5-2-5.5-5.5C6 10.5 10 6.5 14 4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 14l-2 2M12 16l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.5 8.5h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  ),
  power: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 4.5C4.5 6.3 3 9 3 12c0 5 4 9 9 9s9-4 9-9c0-3-1.5-5.7-4-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  powerSmall: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M12 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 4.5C4.5 6.3 3 9 3 12c0 5 4 9 9 9s9-4 9-9c0-3-1.5-5.7-4-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M3 11.5 21 3l-8.5 18-2.5-7-7-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M9 6h12M9 12h12M9 18h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.5 6.2 5 7.7 7.6 5.1M3.5 12.2 5 13.7 7.6 11.1M3.5 18.2 5 19.7 7.6 17.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 7h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.8 16.8 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M3.5 6.5h6l2 2H20.5a1.5 1.5 0 0 1 1.5 1.5v9.5a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2V8a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  archive: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 7h16M6 7v14h12V7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 3h8l1 4H7l1-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10.5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 7.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  management: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12 3 3 21h4l2-4h6l2 4h4L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  chevronUp: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M6 10l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

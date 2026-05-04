import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "admin",
    email: "admin@powerframe.io",
    fullName: "Admin User",
    avatar: null
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    desktopNotifications: false
  });

  function handleSave(e) {
    e.preventDefault();
    setUser(form);
    setEditing(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function togglePreference(key) {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Profile</h1>
        <p className="text-white/60 text-sm">Manage your account settings</p>
      </div>

      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Main Profile Card */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center flex-shrink-0 shadow-glow-violet">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white">{user.fullName.charAt(0)}</span>
              )}
            </div>

            {/* Profile Info / Edit Form */}
            {editing ? (
              <form onSubmit={handleSave} className="flex-1 w-full">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-2">Username</label>
                    <input
                      type="text"
                      value={form.username}
                      onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="input"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      className="btn-glass"
                      onClick={() => { setEditing(false); setForm(user); }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-neon">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-white mb-1">{user.fullName}</h2>
                <p className="text-neon-violet font-medium mb-1">@{user.username}</p>
                <p className="text-white/50 text-sm mb-4">{user.email}</p>
                <button className="btn-neon btn-sm" onClick={() => setEditing(true)}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security Card */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Security</h3>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-left hover:bg-white/[0.08] hover:border-white/10 transition-all group">
              <span className="text-sm text-white/90">Change Password</span>
              <svg className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-left hover:bg-white/[0.08] hover:border-white/10 transition-all group">
              <span className="text-sm text-white/90">Two-Factor Authentication</span>
              <svg className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-left hover:bg-white/[0.08] hover:border-white/10 transition-all group">
              <span className="text-sm text-white/90">Active Sessions</span>
              <svg className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-violet/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Preferences</h3>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center py-4 border-b border-white/[0.06]">
              <span className="text-sm text-white/90">Dark Mode</span>
              <label className="relative w-12 h-7 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.darkMode}
                  onChange={() => togglePreference('darkMode')}
                  className="sr-only peer"
                />
                <div className="w-full h-full rounded-full bg-white/15 peer-checked:bg-neon-violet transition-colors duration-300" />
                <div className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
              </label>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/[0.06]">
              <span className="text-sm text-white/90">Email Notifications</span>
              <label className="relative w-12 h-7 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={() => togglePreference('emailNotifications')}
                  className="sr-only peer"
                />
                <div className="w-full h-full rounded-full bg-white/15 peer-checked:bg-neon-violet transition-colors duration-300" />
                <div className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
              </label>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-sm text-white/90">Desktop Notifications</span>
              <label className="relative w-12 h-7 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.desktopNotifications}
                  onChange={() => togglePreference('desktopNotifications')}
                  className="sr-only peer"
                />
                <div className="w-full h-full rounded-full bg-white/15 peer-checked:bg-neon-violet transition-colors duration-300" />
                <div className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone Card */}
        <div className="glass-card p-6 border-neon-red/30 lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neon-red/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neon-red">Danger Zone</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="px-5 py-3 rounded-xl bg-neon-red text-white font-medium hover:bg-neon-red/80 transition-all"
              onClick={handleLogout}
            >
              <svg className="w-4 h-4 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
            <button className="px-5 py-3 rounded-xl bg-transparent border border-neon-red text-neon-red font-medium hover:bg-neon-red/10 transition-all">
              <svg className="w-4 h-4 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

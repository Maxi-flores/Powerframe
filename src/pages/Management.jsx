import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Management() {
  const { projects, activeProject, updateProject, deleteProject } = useProjects();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState("projects");

  const [users] = useState([
    { id: 1, name: "Admin User", email: "admin@powerframe.io", role: "Owner", status: "active" },
    { id: 2, name: "Team Member", email: "team@powerframe.io", role: "Editor", status: "active" },
    { id: 3, name: "Viewer", email: "view@powerframe.io", role: "Viewer", status: "pending" },
  ]);

  function startEdit(project) {
    setEditingId(project.id);
    setEditForm({ name: project.name, description: project.description });
  }

  function saveEdit() {
    updateProject(editingId, editForm);
    setEditingId(null);
  }

  const roleConfig = {
    owner: { bg: "bg-neon-violet/20", color: "text-neon-violet" },
    editor: { bg: "bg-neon-blue/20", color: "text-neon-blue" },
    viewer: { bg: "bg-white/10", color: "text-white/70" }
  };

  const statusConfig = {
    active: { bg: "bg-neon-green/20", color: "text-neon-green" },
    pending: { bg: "bg-neon-orange/20", color: "text-neon-orange" }
  };

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Management</h1>
        <p className="text-white/60 text-sm">Manage projects, users and permissions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["projects", "users", "permissions"].map(tab => (
          <button
            key={tab}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-neon-violet/15 border border-neon-violet/40 text-white'
                : 'bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Section */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-neon-violet/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-neon-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">All Projects</h3>
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 rounded-xl bg-white/[0.04] text-xs text-white/50 uppercase font-semibold mb-2">
          <span>Project</span>
          <span>Status</span>
          <span>Created</span>
          <span>Actions</span>
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {projects.map(p => (
            <div
              key={p.id}
              className={`rounded-xl border transition-all ${
                p.id === activeProject?.id
                  ? 'bg-neon-green/[0.08] border-neon-green/30'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              {editingId === p.id ? (
                <div className="p-4 flex flex-wrap gap-3 items-center">
                  <input
                    value={editForm.name}
                    onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Project name"
                    className="input flex-1 min-w-[200px]"
                  />
                  <input
                    value={editForm.description}
                    onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Description"
                    className="input flex-1 min-w-[200px]"
                  />
                  <button className="btn-neon btn-sm" onClick={saveEdit}>Save</button>
                  <button className="btn-glass btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div className="p-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: p.color }}
                    />
                    <div className="min-w-0">
                      <strong className="block text-sm truncate">{p.name}</strong>
                      <span className="text-xs text-white/50 truncate block">{p.description}</span>
                    </div>
                  </div>

                  <div>
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-semibold bg-neon-green/20 text-neon-green">
                      Active
                    </span>
                  </div>

                  <span className="text-sm text-white/60">{p.createdAt}</span>

                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/[0.12] text-xs hover:bg-white/[0.12] transition-all"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    {projects.length > 1 && (
                      <button
                        className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-neon-red/30 text-xs text-neon-red hover:bg-neon-red/10 transition-all"
                        onClick={() => deleteProject(p.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Team Members</h3>
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 rounded-xl bg-white/[0.04] text-xs text-white/50 uppercase font-semibold mb-2">
          <span>User</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {users.map(u => {
            const roleCfg = roleConfig[u.role.toLowerCase()];
            const statusCfg = statusConfig[u.status];
            return (
              <div
                key={u.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center font-semibold text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-sm truncate">{u.name}</strong>
                    <span className="text-xs text-white/50 truncate block">{u.email}</span>
                  </div>
                </div>

                <div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-semibold ${roleCfg.bg} ${roleCfg.color}`}>
                    {u.role}
                  </span>
                </div>

                <div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-semibold capitalize ${statusCfg.bg} ${statusCfg.color}`}>
                    {u.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/[0.12] text-xs hover:bg-white/[0.12] transition-all">
                    Edit
                  </button>
                  {u.role !== "Owner" && (
                    <button className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-neon-red/30 text-xs text-neon-red hover:bg-neon-red/10 transition-all">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Projects() {
  const { projects, activeProject, addProject, deleteProject, switchProject } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", color: "#8B5CF6" });

  function handleAdd(e) {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    addProject(newProject);
    setNewProject({ name: "", description: "", color: "#8B5CF6" });
    setShowModal(false);
  }

  const colors = ["#8B5CF6", "#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#EC4899", "#06B6D4", "#84CC16"];

  return (
    <div className="p-6 lg:p-8 text-white min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-white/60 text-sm">Manage your projects and switch between them</p>
        </div>
        <button className="btn-neon" onClick={() => setShowModal(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map(project => (
          <div
            key={project.id}
            className={`glass-card p-5 cursor-pointer group relative transition-all duration-200 ${
              activeProject?.id === project.id
                ? 'ring-2 ring-neon-green shadow-glow-green'
                : 'hover:bg-glass-light'
            }`}
            onClick={() => switchProject(project.id)}
          >
            <div className="flex gap-4">
              {/* Color Badge */}
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 shadow-lg"
                style={{ background: project.color }}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1 truncate">{project.name}</h3>
                <p className="text-sm text-white/60 truncate mb-2">{project.description}</p>
                <span className="text-xs text-white/40">Created: {project.createdAt}</span>
              </div>
            </div>

            {/* Active Badge */}
            {activeProject?.id === project.id && (
              <span className="absolute top-3 right-12 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neon-green text-black">
                Active
              </span>
            )}

            {/* Delete Button */}
            <button
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 text-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neon-red hover:text-white transition-all"
              onClick={(e) => {
                e.stopPropagation();
                if (projects.length > 1) deleteProject(project.id);
              }}
              title={projects.length > 1 ? "Delete project" : "Cannot delete last project"}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create New Project</h2>
              <button
                className="w-8 h-8 rounded-lg bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white transition-all flex items-center justify-center"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-5">
              <div>
                <label className="block text-sm text-white/70 mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))}
                  placeholder="My Awesome Project"
                  className="input"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Description</label>
                <input
                  type="text"
                  value={newProject.description}
                  onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))}
                  placeholder="Brief project description"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-3">Color</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                        newProject.color === c
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ background: c }}
                      onClick={() => setNewProject(p => ({ ...p, color: c }))}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-footer pt-2">
                <button
                  type="button"
                  className="btn-glass"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-neon">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

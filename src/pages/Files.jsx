import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Files() {
  const { activeProject } = useProjects();
  const [files, setFiles] = useState([
    { id: 1, name: "Project Brief.pdf", type: "pdf", size: "2.4 MB", modified: "2026-02-20" },
    { id: 2, name: "Design Mockups.fig", type: "figma", size: "15.8 MB", modified: "2026-02-19" },
    { id: 3, name: "API Documentation.md", type: "doc", size: "124 KB", modified: "2026-02-22" },
    { id: 4, name: "assets.zip", type: "archive", size: "45.2 MB", modified: "2026-02-18" },
    { id: 5, name: "meeting-notes.txt", type: "doc", size: "8 KB", modified: "2026-02-21" },
  ]);

  const [view, setView] = useState("list");

  const typeConfig = {
    pdf: { icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", color: "text-red-400" },
    figma: { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", color: "text-purple-400" },
    doc: { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-blue-400" },
    archive: { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", color: "text-yellow-400" },
    image: { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", color: "text-green-400" },
    default: { icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", color: "text-white/60" }
  };

  function deleteFile(id) {
    setFiles(prev => prev.filter(f => f.id !== id));
  }

  function getTypeConfig(type) {
    return typeConfig[type] || typeConfig.default;
  }

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Files</h1>
          <p className="text-white/60 text-sm">
            <span className="text-neon-violet">{activeProject?.name}</span> — Documents & Assets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-white/[0.06] p-1">
            <button
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                view === "list" ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
              }`}
              onClick={() => setView("list")}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                view === "grid" ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
              }`}
              onClick={() => setView("grid")}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
          <button className="btn-neon">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
          </button>
        </div>
      </div>

      {/* Storage Bar */}
      <div className="glass-card p-4 mb-6">
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-white/70">Storage used</span>
          <span className="text-white">63.5 MB / 1 GB</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-violet to-neon-blue rounded-full transition-all"
            style={{ width: "6.35%" }}
          />
        </div>
      </div>

      {/* Files List/Grid */}
      {view === "list" ? (
        <div className="space-y-2">
          {files.map(file => {
            const config = getTypeConfig(file.type);
            return (
              <div
                key={file.id}
                className="glass-card p-4 flex items-center gap-4 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center ${config.color}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={config.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-white truncate">{file.name}</span>
                  <span className="text-xs text-white/40">{file.size} • {file.modified}</span>
                </div>
                <button
                  className="w-8 h-8 rounded-lg bg-white/[0.05] text-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neon-red hover:text-white transition-all"
                  onClick={() => deleteFile(file.id)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map(file => {
            const config = getTypeConfig(file.type);
            return (
              <div
                key={file.id}
                className="glass-card p-5 flex flex-col items-center text-center group relative"
              >
                <button
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/[0.05] text-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neon-red hover:text-white transition-all"
                  onClick={() => deleteFile(file.id)}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className={`w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-4 ${config.color}`}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={config.icon} />
                  </svg>
                </div>
                <span className="block text-sm font-medium text-white truncate w-full mb-1">{file.name}</span>
                <span className="text-xs text-white/40">{file.size}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <div className="glass-card p-16 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.06] flex items-center justify-center">
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <p className="text-white/50 mb-2">No files yet</p>
          <p className="text-white/30 text-sm">Upload your first file to get started</p>
        </div>
      )}
    </div>
  );
}

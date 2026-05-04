import React, { useState, useRef, useEffect } from "react";
import { useProjects } from "../context/ProjectContext.jsx";

// Widget types with their quickview data
const WIDGET_TYPES = {
  tasks: {
    title: "Tasks",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: "from-neon-blue to-neon-cyan",
    getData: () => ({ count: 12, label: "3 due today" })
  },
  calendar: {
    title: "Calendar",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-neon-violet to-neon-purple",
    getData: () => ({ count: 4, label: "events this week" })
  },
  files: {
    title: "Files",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    color: "from-neon-green to-neon-cyan",
    getData: () => ({ count: 48, label: "63.5 MB used" })
  },
  messages: {
    title: "Messages",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-neon-orange to-neon-amber",
    getData: () => ({ count: 8, label: "unread" })
  },
  analytics: {
    title: "Analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-neon-pink to-neon-violet",
    getData: () => ({ count: "89%", label: "performance" })
  },
  notes: {
    title: "Notes",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "from-neon-cyan to-neon-blue",
    getData: () => ({ count: 15, label: "total notes" })
  },
  team: {
    title: "Team",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "from-neon-green to-neon-cyan",
    getData: () => ({ count: 5, label: "members" })
  },
  progress: {
    title: "Progress",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "from-neon-orange to-neon-red",
    getData: () => ({ count: "58%", label: "complete" })
  },
};

const DEFAULT_TABS = [
  { id: "overview", name: "Overview", widgets: [
    { id: "w1", type: "tasks", x: 0, y: 0, w: 4, h: 2 },
    { id: "w2", type: "calendar", x: 4, y: 0, w: 4, h: 2 },
    { id: "w3", type: "files", x: 8, y: 0, w: 4, h: 2 },
    { id: "w4", type: "messages", x: 0, y: 2, w: 3, h: 2 },
    { id: "w5", type: "analytics", x: 3, y: 2, w: 3, h: 2 },
    { id: "w6", type: "notes", x: 6, y: 2, w: 3, h: 2 },
    { id: "w7", type: "progress", x: 9, y: 2, w: 3, h: 2 },
  ]},
  { id: "analytics", name: "Analytics", widgets: [
    { id: "a1", type: "analytics", x: 0, y: 0, w: 6, h: 2 },
    { id: "a2", type: "progress", x: 6, y: 0, w: 6, h: 2 },
  ]},
];

export default function Overview() {
  const { activeProject } = useProjects();
  const gridRef = useRef(null);

  // Project-scoped tabs stored in localStorage
  const storageKey = `bms_tabs_${activeProject?.id || "default"}`;
  const [tabs, setTabs] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : DEFAULT_TABS;
  });

  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [dragging, setDragging] = useState(null);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [showAddTab, setShowAddTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");

  // Save tabs to localStorage when changed
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tabs));
  }, [tabs, storageKey]);

  // Reset tabs when project changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setTabs(saved ? JSON.parse(saved) : DEFAULT_TABS);
    setActiveTab(tabs[0]?.id || "overview");
  }, [activeProject?.id]);

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  function addTab() {
    if (!newTabName.trim()) return;
    const newTab = { id: Date.now().toString(), name: newTabName, widgets: [] };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
    setNewTabName("");
    setShowAddTab(false);
  }

  function deleteTab(tabId) {
    if (tabs.length <= 1) return;
    setTabs(prev => prev.filter(t => t.id !== tabId));
    if (activeTab === tabId) setActiveTab(tabs[0].id);
  }

  function addWidget(type) {
    const widget = { id: Date.now().toString(), type, x: 0, y: 0, w: 4, h: 2 };
    setTabs(prev => prev.map(t =>
      t.id === activeTab ? { ...t, widgets: [...t.widgets, widget] } : t
    ));
    setShowAddWidget(false);
  }

  function removeWidget(widgetId) {
    setTabs(prev => prev.map(t =>
      t.id === activeTab ? { ...t, widgets: t.widgets.filter(w => w.id !== widgetId) } : t
    ));
  }

  function handleDragStart(e, widget) {
    setDragging(widget);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e, targetX, targetY) {
    e.preventDefault();
    if (!dragging) return;

    setTabs(prev => prev.map(t => {
      if (t.id !== activeTab) return t;
      return {
        ...t,
        widgets: t.widgets.map(w =>
          w.id === dragging.id ? { ...w, x: targetX, y: targetY } : w
        )
      };
    }));
    setDragging(null);
  }

  return (
    <div className="p-6 text-white h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: activeProject?.color || '#8B5CF6' }}
          >
            {activeProject?.name || 'PowerFrame'}
          </span>
        </div>
        <button
          className="btn-neon"
          onClick={() => setShowAddWidget(true)}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Widget
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.08]">
        <div className="flex gap-1.5 flex-1 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`flex items-center rounded-xl overflow-hidden transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-neon-violet/15 border border-neon-violet/40'
                  : 'bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              <button
                className="px-4 py-2.5 text-sm font-medium text-white"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
              {tabs.length > 1 && (
                <button
                  className="px-2 py-2.5 text-white/40 hover:text-neon-red transition-colors text-lg"
                  onClick={() => deleteTab(tab.id)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          className="w-9 h-9 rounded-xl bg-white/[0.04] border border-dashed border-white/20 text-white/50 hover:bg-white/[0.08] hover:text-white transition-all text-lg flex items-center justify-center"
          onClick={() => setShowAddTab(true)}
        >
          +
        </button>
      </div>

      {/* Widget Grid */}
      <div
        ref={gridRef}
        className="flex-1 grid grid-cols-12 grid-rows-6 gap-3 min-h-[400px] relative"
      >
        {/* Drop zones */}
        {Array.from({ length: 12 }).map((_, x) =>
          Array.from({ length: 6 }).map((_, y) => (
            <div
              key={`zone-${x}-${y}`}
              className="border border-dashed border-transparent rounded-lg transition-all hover:border-neon-green/40 hover:bg-neon-green/5"
              style={{ gridColumn: x + 1, gridRow: y + 1 }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, x, y)}
            />
          ))
        )}

        {/* Widgets */}
        {currentTab?.widgets.map(widget => {
          const config = WIDGET_TYPES[widget.type];
          const data = config.getData();
          return (
            <div
              key={widget.id}
              className={`glass-card p-4 cursor-grab transition-all duration-200 flex flex-col relative z-10 group hover-lift ${
                dragging?.id === widget.id ? 'opacity-50 cursor-grabbing' : ''
              }`}
              style={{
                gridColumn: `${widget.x + 1} / span ${widget.w}`,
                gridRow: `${widget.y + 1} / span ${widget.h}`,
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, widget)}
              onDragEnd={() => setDragging(null)}
            >
              {/* Widget Header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white shadow-lg`}>
                  {config.icon}
                </div>
                <span className="font-semibold text-sm flex-1">{config.title}</span>
                <button
                  className="w-6 h-6 rounded-md bg-white/[0.06] text-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neon-red hover:text-white transition-all"
                  onClick={() => removeWidget(widget.id)}
                >
                  ×
                </button>
              </div>

              {/* Widget Body */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-4xl font-bold text-gradient-violet">{data.count}</div>
                <div className="text-sm text-white/50 mt-1">{data.label}</div>
              </div>

              {/* Drag Hint */}
              <div className="absolute bottom-2 right-3 text-[10px] text-white/25 opacity-0 group-hover:opacity-100 transition-opacity">
                Drag to move
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {currentTab?.widgets.length === 0 && (
          <div className="col-span-full row-span-full flex flex-col items-center justify-center text-white/40">
            <svg className="w-16 h-16 mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="mb-4">No widgets yet</p>
            <button
              className="btn-glass"
              onClick={() => setShowAddWidget(true)}
            >
              Add your first widget
            </button>
          </div>
        )}
      </div>

      {/* Add Widget Modal */}
      {showAddWidget && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddWidget(false)}
        >
          <div
            className="modal max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Add Widget</h2>
              <button
                className="w-8 h-8 rounded-lg bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white transition-all flex items-center justify-center"
                onClick={() => setShowAddWidget(false)}
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.entries(WIDGET_TYPES).map(([key, config]) => (
                <button
                  key={key}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20 transition-all text-left group"
                  onClick={() => addWidget(key)}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {config.icon}
                  </div>
                  <span className="font-medium">{config.title}</span>
                </button>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="btn-glass"
                onClick={() => setShowAddWidget(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tab Modal */}
      {showAddTab && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddTab(false)}
        >
          <div
            className="modal max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">New Tab</h2>
              <button
                className="w-8 h-8 rounded-lg bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white transition-all flex items-center justify-center"
                onClick={() => setShowAddTab(false)}
              >
                ×
              </button>
            </div>
            <input
              type="text"
              value={newTabName}
              onChange={e => setNewTabName(e.target.value)}
              placeholder="Tab name"
              className="input mb-6"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && addTab()}
            />
            <div className="modal-footer">
              <button
                className="btn-glass"
                onClick={() => setShowAddTab(false)}
              >
                Cancel
              </button>
              <button
                className="btn-neon"
                onClick={addTab}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

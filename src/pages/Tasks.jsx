import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Tasks() {
  const { activeProject } = useProjects();
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review dashboard designs", status: "completed", priority: "high" },
    { id: 2, title: "Implement user authentication", status: "in_progress", priority: "high" },
    { id: 3, title: "Set up database schema", status: "in_progress", priority: "medium" },
    { id: 4, title: "Write API documentation", status: "pending", priority: "low" },
    { id: 5, title: "Configure CI/CD pipeline", status: "pending", priority: "medium" },
  ]);
  const [newTask, setNewTask] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, {
      id: Date.now(),
      title: newTask,
      status: "pending",
      priority: "medium"
    }]);
    setNewTask("");
  }

  function toggleStatus(id) {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextStatus = { pending: "in_progress", in_progress: "completed", completed: "pending" };
      return { ...t, status: nextStatus[t.status] };
    }));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const statusConfig = {
    pending: { color: "text-neon-orange", bg: "bg-neon-orange", border: "border-neon-orange" },
    in_progress: { color: "text-neon-blue", bg: "bg-neon-blue", border: "border-neon-blue" },
    completed: { color: "text-neon-green", bg: "bg-neon-green", border: "border-neon-green" }
  };

  const priorityConfig = {
    high: { bg: "bg-neon-red/20", color: "text-neon-red" },
    medium: { bg: "bg-neon-orange/20", color: "text-neon-orange" },
    low: { bg: "bg-neon-green/20", color: "text-neon-green" }
  };

  const completedCount = tasks.filter(t => t.status === "completed").length;

  return (
    <div className="p-6 lg:p-8 text-white min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Tasks</h1>
        <p className="text-white/60 text-sm">
          <span className="text-neon-violet">{activeProject?.name || 'PowerFrame'}</span>
          {' — '}
          <span className="text-neon-green">{completedCount}</span>/{tasks.length} completed
        </p>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex gap-3 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="input flex-1"
        />
        <button type="submit" className="btn-neon">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </form>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map(task => {
          const statusCfg = statusConfig[task.status];
          const priorityCfg = priorityConfig[task.priority];

          return (
            <div
              key={task.id}
              className={`glass-card p-4 flex items-center gap-4 group transition-all duration-200 ${
                task.status === 'completed' ? 'opacity-60' : ''
              }`}
            >
              {/* Status Checkbox */}
              <button
                className={`w-6 h-6 rounded-full border-2 ${statusCfg.border} flex items-center justify-center transition-all hover:scale-110`}
                onClick={() => toggleStatus(task.id)}
              >
                {task.status === "completed" && (
                  <svg className={`w-3.5 h-3.5 ${statusCfg.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <span className={`text-sm ${task.status === 'completed' ? 'line-through text-white/50' : 'text-white'}`}>
                  {task.title}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${priorityCfg.bg} ${priorityCfg.color}`}>
                  {task.priority}
                </span>
              </div>

              {/* Status Label */}
              <span className={`text-xs capitalize ${statusCfg.color} hidden sm:block`}>
                {task.status.replace("_", " ")}
              </span>

              {/* Delete Button */}
              <button
                className="w-7 h-7 rounded-lg bg-white/[0.05] text-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neon-red hover:text-white transition-all"
                onClick={() => deleteTask(task.id)}
              >
                ×
              </button>
            </div>
          );
        })}

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="glass-card p-12 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-white/50 mb-4">No tasks yet</p>
            <p className="text-white/30 text-sm">Add your first task above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

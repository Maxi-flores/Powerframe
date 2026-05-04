import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext.jsx";

export default function Plans() {
  const { activeProject } = useProjects();
  const [view, setView] = useState("month");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Generate calendar days
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const events = [
    { day: 5, title: "Sprint Planning", color: "violet" },
    { day: 12, title: "Design Review", color: "blue" },
    { day: 15, title: "Release v1.0", color: "green" },
    { day: 22, title: "Team Meeting", color: "orange" },
  ];

  const eventColors = {
    violet: "bg-neon-violet",
    blue: "bg-neon-blue",
    green: "bg-neon-green",
    orange: "bg-neon-orange"
  };

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Plans</h1>
          <p className="text-white/60 text-sm">
            <span className="text-neon-violet">{activeProject?.name}</span> — Calendar & Scheduling
          </p>
        </div>
        <div className="flex rounded-xl bg-white/[0.06] p-1">
          {["week", "month"].map(v => (
            <button
              key={v}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                view === v
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-center gap-5 mb-5">
        <button className="w-10 h-10 rounded-xl border border-white/15 bg-white/[0.05] text-white hover:bg-white/10 transition-all flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold min-w-[200px] text-center">{currentMonth}</h2>
        <button className="w-10 h-10 rounded-xl border border-white/15 bg-white/[0.05] text-white hover:bg-white/10 transition-all flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card p-4 mb-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(d => (
            <div key={d} className="text-center text-xs text-white/50 py-2 font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[80px]" />
          ))}
          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === currentDate.getDate();
            const dayEvents = events.filter(e => e.day === dayNum);
            return (
              <div
                key={dayNum}
                className={`min-h-[80px] rounded-xl p-2 transition-all cursor-pointer hover:bg-white/[0.06] ${
                  isToday
                    ? 'bg-neon-green/15 border border-neon-green/40'
                    : 'bg-white/[0.03]'
                }`}
              >
                <span className={`text-sm font-semibold ${isToday ? 'text-neon-green' : 'text-white/80'}`}>
                  {dayNum}
                </span>
                {dayEvents.map((e, idx) => (
                  <div
                    key={idx}
                    className={`mt-1.5 px-1.5 py-1 rounded text-[10px] font-medium truncate ${eventColors[e.color]}`}
                  >
                    {e.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-violet/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-neon-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
        </div>

        <div className="space-y-1">
          {events.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-3 border-b border-white/[0.06] last:border-0"
            >
              <div className={`w-3 h-3 rounded-full ${eventColors[e.color]}`} />
              <span className="text-sm text-white/50 min-w-[60px]">Feb {e.day}</span>
              <span className="text-sm text-white">{e.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

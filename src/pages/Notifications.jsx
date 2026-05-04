import React, { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", title: "Welcome to PowerFrame", message: "Get started by creating your first project", time: "Just now", read: false },
    { id: 2, type: "success", title: "Task Completed", message: "User authentication implementation finished", time: "2 hours ago", read: false },
    { id: 3, type: "warning", title: "Storage Warning", message: "You're approaching your storage limit", time: "5 hours ago", read: true },
    { id: 4, type: "info", title: "New Feature", message: "Check out the new calendar view in Plans", time: "1 day ago", read: true },
  ]);

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function deleteNotification(id) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function toggleRead(id) {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: !n.read } : n
    ));
  }

  const typeConfig = {
    info: {
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "text-neon-blue",
      bg: "bg-neon-blue/20"
    },
    success: {
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "text-neon-green",
      bg: "bg-neon-green/20"
    },
    warning: {
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      color: "text-neon-orange",
      bg: "bg-neon-orange/20"
    },
    error: {
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "text-neon-red",
      bg: "bg-neon-red/20"
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 lg:p-8 text-white min-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Notifications</h1>
          <p className="text-white/60 text-sm">
            <span className="text-neon-violet">{unreadCount}</span> unread notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn-glass btn-sm" onClick={markAllRead}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-w-3xl space-y-3">
        {notifications.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.06] flex items-center justify-center">
              <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-white/50 mb-2">No notifications</p>
            <p className="text-white/30 text-sm">You're all caught up!</p>
          </div>
        ) : (
          notifications.map(n => {
            const config = typeConfig[n.type];
            return (
              <div
                key={n.id}
                className={`glass-card p-4 flex items-start gap-4 group transition-all ${
                  n.read ? 'opacity-60' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-5 h-5 ${config.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                  </svg>
                </div>

                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleRead(n.id)}>
                  <div className="flex items-center gap-2 mb-1">
                    <strong className="text-sm">{n.title}</strong>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-white/70 mb-1">{n.message}</p>
                  <span className="text-xs text-white/40">{n.time}</span>
                </div>

                <button
                  className="w-8 h-8 rounded-lg bg-white/[0.05] text-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neon-red hover:text-white transition-all flex-shrink-0"
                  onClick={() => deleteNotification(n.id)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

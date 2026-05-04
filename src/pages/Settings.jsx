import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Settings() {
  const {
    theme,
    setTheme,
    themes,
    currentTheme,
    customBg,
    setCustomBg,
    customAccent,
    setCustomAccent,
    bgPresets,
  } = useTheme();

  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    autoSave: true,
    compactMode: false,
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState(customAccent || "#8B5CF6");

  function updateSetting(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  function applyCustomAccent() {
    setCustomAccent(customColor);
    setShowColorPicker(false);
  }

  function resetTheme() {
    setTheme("default");
    setCustomBg(null);
    setCustomAccent(null);
  }

  const accentColors = ["#8B5CF6", "#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#EC4899", "#06B6D4", "#84CC16"];

  return (
    <div className="p-6 lg:p-8 text-white overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-white/60 text-sm">Configure your dashboard preferences</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Theme Selection */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">Theme</h3>
            <button
              className="btn-glass btn-sm"
              onClick={resetTheme}
            >
              Reset to Default
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                className={`flex flex-col items-center gap-2.5 p-3 rounded-xl transition-all duration-200 ${
                  theme === key && !customBg
                    ? 'bg-neon-green/10 ring-2 ring-neon-green'
                    : 'bg-white/[0.04] hover:bg-white/[0.08]'
                }`}
                onClick={() => { setTheme(key); setCustomBg(null); }}
              >
                <div
                  className="w-full h-14 rounded-lg relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${t.bg1}, ${t.bg2})` }}
                >
                  <div
                    className="absolute bottom-2 right-2 w-5 h-5 rounded-md border-2 border-white/30"
                    style={{ background: t.accent }}
                  />
                </div>
                <span className="text-xs text-white/80">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Background */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Custom Background</h3>
          <p className="text-sm text-white/50 mb-4">Choose a gradient or solid color background</p>

          <div className="flex flex-wrap gap-3 mb-4">
            {bgPresets.map(preset => (
              <button
                key={preset.id}
                className={`w-12 h-12 rounded-xl transition-all duration-200 hover:scale-105 ${
                  customBg === preset.value ? 'ring-2 ring-neon-green ring-offset-2 ring-offset-transparent' : ''
                }`}
                style={{ background: preset.value }}
                onClick={() => setCustomBg(preset.value)}
              />
            ))}
            <button
              className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/50 text-lg hover:bg-white/20 transition-all ${
                !customBg ? 'ring-2 ring-neon-green' : ''
              }`}
              onClick={() => setCustomBg(null)}
            >
              ✕
            </button>
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-2">Custom CSS Background</label>
            <input
              type="text"
              placeholder="e.g., linear-gradient(135deg, #667eea, #764ba2)"
              value={customBg || ""}
              onChange={e => setCustomBg(e.target.value || null)}
              className="input"
            />
          </div>
        </div>

        {/* Accent Color */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Accent Color</h3>
          <p className="text-sm text-white/50 mb-4">Customize the accent color for buttons and highlights</p>

          <div className="flex flex-wrap gap-3">
            {accentColors.map(color => (
              <button
                key={color}
                className={`w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110 ${
                  (customAccent || currentTheme.accent) === color
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent'
                    : ''
                }`}
                style={{ background: color }}
                onClick={() => setCustomAccent(color)}
              />
            ))}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg hover:scale-110 transition-all"
              style={{ background: customAccent || '#666' }}
              onClick={() => setShowColorPicker(true)}
            >
              +
            </button>
          </div>

          {showColorPicker && (
            <div className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-black/20">
              <input
                type="color"
                value={customColor}
                onChange={e => setCustomColor(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={customColor}
                onChange={e => setCustomColor(e.target.value)}
                placeholder="#8B5CF6"
                className="input flex-1 font-mono"
              />
              <button className="btn-neon btn-sm" onClick={applyCustomAccent}>Apply</button>
              <button
                className="w-9 h-9 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-all"
                onClick={() => setShowColorPicker(false)}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>

          <div className="space-y-1">
            <SettingRow
              label="Push Notifications"
              desc="Receive browser notifications"
              checked={settings.notifications}
              onChange={v => updateSetting("notifications", v)}
            />
            <SettingRow
              label="Email Alerts"
              desc="Get important updates via email"
              checked={settings.emailAlerts}
              onChange={v => updateSetting("emailAlerts", v)}
            />
          </div>
        </div>

        {/* Data & Storage */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Data & Storage</h3>

          <div className="space-y-1">
            <SettingRow
              label="Auto-save"
              desc="Automatically save changes"
              checked={settings.autoSave}
              onChange={v => updateSetting("autoSave", v)}
            />
            <SettingRow
              label="Compact Mode"
              desc="Use smaller UI elements"
              checked={settings.compactMode}
              onChange={v => updateSetting("compactMode", v)}
            />

            <div className="flex justify-between items-center py-4 border-b border-white/[0.06]">
              <div>
                <span className="block text-sm font-medium">Clear Cache</span>
                <span className="text-xs text-white/50">Remove temporary data</span>
              </div>
              <button className="btn-glass btn-sm">Clear</button>
            </div>

            <div className="flex justify-between items-center py-4">
              <div>
                <span className="block text-sm font-medium">Export Data</span>
                <span className="text-xs text-white/50">Download all your data</span>
              </div>
              <button className="btn-glass btn-sm">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-white/[0.06] last:border-0">
      <div>
        <span className="block text-sm font-medium">{label}</span>
        <span className="text-xs text-white/50">{desc}</span>
      </div>
      <label className="relative w-12 h-7 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-full h-full rounded-full bg-white/15 peer-checked:bg-neon-violet transition-colors duration-300" />
        <div className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
      </label>
    </div>
  );
}

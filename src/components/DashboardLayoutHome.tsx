// src/components/DashboardLayoutHome.tsx
import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import WidgetSlot from "./WidgetSlot";
import DraggableWidget from "./DraggableWidget";
import { useLayoutStore } from "../store/layoutStore";
import { WidgetType } from "../types";
import "./DashboardLayoutHome.css";

const ROWS = 3;
const COLS = 3;

interface SlotConfig {
  id: string;
}

const WIDGET_SLOTS: SlotConfig[] = Array.from({ length: ROWS * COLS }, (_, i) => ({
  id: `slot${i + 1}`,
}));

// ALL WIDGETS INCLUDING REVENUE
const WIDGET_PALETTE: WidgetType[] = [
  "kanban",
  "chart",
  "metrics",
  "tasks",
  "calendar",
  "revenue",
];

// REQUIRED FOR PLASMIC
interface DashboardLayoutHomeProps {
  className?: string;
}

export default function DashboardLayoutHome({ className }: DashboardLayoutHomeProps) {
  const { layout, addWidget, moveWidget, removeWidget } = useLayoutStore();
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: (item: { type: WidgetType; id?: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset || !dropRef.current) return;

      const dropTarget = document.elementFromPoint(offset.x, offset.y);
      const slotId = dropTarget?.closest("[data-slot-id]")?.getAttribute("data-slot-id");

      if (slotId) {
        if (item.id) {
          moveWidget(item.id, slotId);
        } else {
          addWidget(item.type, slotId);
        }
      }
    },
  }));

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`dashboard-layout-home ${className || ""}`}
      data-plasmic-name="DashboardLayoutHome"
      data-plasmic-id="dashboard-layout-home"
    >
      {/* DARK BACKGROUND */}
      <div className="dashboard-bg" />

      {/* 3×3 GRID – FIXED HEIGHT, AUTO-SPACING */}
      <div className="dashboard-grid">
        {WIDGET_SLOTS.map((slot) => (
          <WidgetSlot
            key={slot.id}
            id={slot.id}
            widget={layout[slot.id]}
            isHovered={hoveredSlot === slot.id}
            onHover={setHoveredSlot}
            onRemove={() => removeWidget(slot.id)}
          />
        ))}
      </div>

      {/* FAB + DARK PALETTE */}
      <div className="fab-container">
        <button
          onClick={() => setShowPalette((p) => !p)}
          className="fab-button"
          aria-label="Add widget"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            className={`fab-icon ${showPalette ? "rotate" : ""}`}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        {showPalette && (
          <div className="widget-palette">
            <div className="palette-title">Add Widget</div>
            {WIDGET_PALETTE.map((type) => (
              <DraggableWidget key={type} type={type} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
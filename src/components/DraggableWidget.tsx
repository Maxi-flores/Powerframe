import React from "react";
import { useDrag } from "react-dnd";
import { WidgetType } from "../types";

interface DraggableWidgetProps {
  type: WidgetType;
  gridSize?: { w: number; h: number };
}

const previews: Record<WidgetType, string> = {
  kanban: "📋 Kanban Board",
  chart: "📊 Analytics Chart",
  metrics: "📈 Key Metrics",
  tasks: "✅ Task List",
  calendar: "📅 Full Calendar",
  revenue: "💰 Revenue XL",
  timeline: "⏰ Project Timeline",
  notifications: "🔔 Notifications",
  "active-projects": "🚀 Active Projects",
};

export default function DraggableWidget({ type, gridSize }: DraggableWidgetProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { type, gridSize },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div ref={drag} className="draggable-widget-preview" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {previews[type] || type}
    </div>
  );
}

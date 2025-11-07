// src/main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PlasmicRootProvider } from "@plasmicapp/loader-react";
import { PLASMIC } from "@/plasmic-init";
import PlasmicHost from "./plasmic-host";
import "./index.css";

// Preload Michroma for instant sidebar render
const preloadMichroma = () => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "style";
  link.href = "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
  link.onload = () => {
    link.rel = "stylesheet";
  };
  document.head.appendChild(link);
};

preloadMichroma();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 1. PlasmicRootProvider – Must wrap everything */}
    <PlasmicRootProvider loader={PLASMIC}>
      {/* 2. DndProvider – Required for drag & drop */}
      <DndProvider backend={HTML5Backend}>
        {/* 3. Router */}
        <BrowserRouter>
          <Routes>
            {/* Plasmic Studio */}
            <Route path="/plasmic-host" element={<PlasmicHost />} />

            {/* Main App */}
            <Route path="/" element={<DashboardLayoutHome />} />
            <Route path="*" element={<DashboardLayoutHome />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </PlasmicRootProvider>
  </StrictMode>
);
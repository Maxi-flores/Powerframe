// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PlasmicRootProvider } from "@plasmicapp/loader-react";
import { PLASMIC } from "@/plasmic-init";
import PlasmicHost from "./plasmic-host";
import DashboardPage from "./pages/DashboardPage";
import "./index.css";

// Google Fonts: Michroma for Sidebar
import "@fontsource/michroma";

// Optional: Preload critical Google font for faster rendering
const link = document.createElement("link");
link.rel = "preload";
link.as = "style";
link.href = "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
document.head.appendChild(link);

// Mount the React app
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Make sure your HTML has <div id='root'></div>.");
}

createRoot(rootElement).render(
  <React.StrictMode>
    {/* 1. PlasmicRootProvider – must wrap entire app */}
    <PlasmicRootProvider loader={PLASMIC}>
      {/* 2. DndProvider – wraps components that use drag and drop */}
      <DndProvider backend={HTML5Backend}>
        {/* 3. BrowserRouter – handles routing inside the app */}
        <BrowserRouter>
          <Routes>
            {/* Plasmic Studio host endpoint */}
            <Route path="/plasmic-host" element={<PlasmicHost />} />
            {/* Main dashboard / app routes */}
            <Route path="/*" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </PlasmicRootProvider>
  </React.StrictMode>
);

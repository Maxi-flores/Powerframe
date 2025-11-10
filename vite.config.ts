import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // NO INCLUDE ANYWHERE
    // FORCE EXCLUDE REACT
    exclude: ["react", "react-dom", "@plasmicapp/loader-react"],
    include: [], // EXPLICITLY EMPTY
  },
  assetsInclude: ["**/*.otf", "**/*.ttf", "**/*.woff", "**/*.woff2"],
});

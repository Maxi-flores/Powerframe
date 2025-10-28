import { initPlasmicLoader } from "@plasmicapp/loader-react";
import { Counter } from "./components/Counter"; // ✅ import your custom tool

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "dmLmwLa7oPVx57TJDP3Fhb",
      token: "zuwzv2xbUe0rd6zhXlbsCggS3mPJ3HOV8M10gnROEPkxNotUtApwOPtqbIJ9WRD5YFsFO13Rb8ifUGBdw",
      version: "v2"
    }
  ],
  preview: true
});

/**
 * ✅ Register your custom code component with Plasmic
 */
PLASMIC.registerComponent(Counter, {
  name: "Counter",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class"
    }
  }
});


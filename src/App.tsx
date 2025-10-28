import { PlasmicRootProvider, PlasmicComponent } from "@plasmicapp/loader-react";
import { PLASMIC } from "./plasmic-init";

export default function App() {
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <PlasmicComponent component="TodoApp" />
    </PlasmicRootProvider>
  );
}

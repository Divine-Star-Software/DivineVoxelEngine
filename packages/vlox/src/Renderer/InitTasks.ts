import type { SetSectionMeshTask } from "./Renderer.types";
import type { LocationData } from "Math/index.js";
import { Threads } from "@amodx/threads/";
import { MeshManager } from "./MeshManager";
import { MeshRegister } from "./MeshRegister";

export default function RendererTasks() {
  Threads.registerTask<SetSectionMeshTask>("set-section", (data) =>
    MeshManager.updateSection(data)
  );
  Threads.registerTask<LocationData>("remove-sector", (data) => {
    MeshManager.removeSector(data);
  });
  Threads.registerTask<LocationData>("clear-all", (data) => {
    MeshRegister.clearAll();
  });
}

import type { SetSectionMeshTask } from "../Mesher/Types/Mesher.types";
import type { LocationData } from "Math/index.js";
import { Threads } from "@amodx/threads/";
import { MeshManager } from "./MeshManager";
import { MeshRegister } from "./MeshRegister";
import { EngineSettings } from "../Settings/EngineSettings";
import { getLocationData } from "../Util/LocationData";

export default function RendererTasks() {
  Threads.registerTask<SetSectionMeshTask>("set-section", (data, origin) => {
    MeshManager.updateSection(data);
    if (!EngineSettings.settings.rendererSettings.cpuBound) {
      origin.sendMessage([], [data]);
    }
  });
  Threads.registerBinaryTask("remove-sector", (data) => {
    MeshManager.removeSector(...getLocationData(data));
  });
  Threads.registerTask<LocationData>("clear-all", (data) => {
    MeshRegister.clearAll();
  });
}

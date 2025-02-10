import type { SetSectionMeshTask } from "../Mesher/Types/Mesher.types";
import type { LocationData } from "Math/index.js";
import { Thread, ThreadPool, Threads } from "@amodx/threads/";
import { MeshManager } from "./MeshManager";
import { MeshRegister } from "./MeshRegister";
import { RunBuildQueue } from "Tasks/Tasks.types";
import { TaskTool } from "../Tools/Tasks/TasksTool";
import { EngineSettings } from "../Settings/EngineSettings";

export default function RendererTasks(threads: Thread | ThreadPool) {
  const tasks = new TaskTool(threads);

  Threads.registerTask<SetSectionMeshTask>("set-section", (data, origin) => {
    MeshManager.updateSection(data);
    if (!EngineSettings.settings.rendererSettings.cpuBound) {
      origin.sendMessage([], [data]);
    }
  });
  Threads.registerTask<LocationData>("remove-sector", (data) => {
    MeshManager.removeSector(data);
  });
  Threads.registerTask<LocationData>("clear-all", (data) => {
    MeshRegister.clearAll();
  });

  Threads.registerTask<RunBuildQueue>("build-queue", ([dim, sections]) => {
    for (const position of sections) {
      tasks.build.section.run([dim, ...position]);
    }
  });
}

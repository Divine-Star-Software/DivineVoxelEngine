import type { SetSectionMeshTask } from "./Renderer.types";
import type { LocationData } from "Math/index.js";
import { Thread, ThreadPool, Threads } from "@amodx/threads/";
import { MeshManager } from "./MeshManager";
import { MeshRegister } from "./MeshRegister";
import { RunBuildQueue } from "Tasks/Tasks.types";
import { TaskTool } from "../Tools/Tasks/TasksTool";
import { CompactSubMesh } from "../Mesher/Types";
import { EngineSettings } from "../Settings/EngineSettings";

export default function RendererTasks(threads: Thread | ThreadPool) {
  const tasks = new TaskTool(threads);

  Threads.registerTask<SetSectionMeshTask>("set-section", (data, origin) => {
    MeshManager.updateSection(data);
    const tranfers: any[] = [];

    if (data[1][0] == 0) {
      const comp = data[1][1];
      for (const mesh of comp) {
        tranfers.push(mesh[1].buffer);
        tranfers.push(mesh[2].buffer);
      }
    }

    if (!EngineSettings.settings.rendererSettings.cpuBound) {
      origin.sendMessage([], tranfers);
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

import type {
  RemoveChunkMeshTasks,
  RemoveChunksOutsideDistance,
  SetChunkMeshTask,
} from "./Renderer.types"
import type { LocationData } from "Math/index.js";
import { Threads } from "@amodx/threads/";
import { MeshManager } from "./MeshManager"
import { MeshRegister } from "./MeshRegister"

export default function RendererTasks() {
  Threads.registerTask<SetChunkMeshTask>("set-chunk", (data) =>
    MeshManager.update(data)
  );
  Threads.registerTask<RemoveChunkMeshTasks>("remove-chunk", (data) => {
    MeshManager.remove(data);
  });

  Threads.registerTask<LocationData>("remove-column", (data) => {
    MeshManager.removeColumn(data);
  });
  Threads.registerTask<LocationData>("clear-all", (data) => {
    MeshRegister.clearAll();
  });
  Threads.registerTask<RemoveChunksOutsideDistance>(
    "remove-column-outside-radius",
    (data) => {
      MeshManager.removeColumnsOutsideRadius(data[0], data[1]);
    }
  );
}

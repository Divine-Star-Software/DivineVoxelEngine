import type {
  RemoveChunkMeshTasks,
  RemoveChunksOutsideDistance,
  SetChunkMeshTask,
} from "./RenderTasks.types.js";
import type { LocationData } from "Math/index.js";
import { Threads } from "@amodx/threads/";
import { MeshManager } from "../Scene/MeshManager.js";
import { MeshRegister } from "../Scene/MeshRegister.js";

export const RenderTasks = {
  setChunk: Threads.registerTasks<SetChunkMeshTask>("set-chunk", (data) => {
    MeshManager.update(data);
  }),
  removeChunk: Threads.registerTasks<RemoveChunkMeshTasks>(
    "remove-chunk",
    (data) => {
      MeshManager.remove(data);
    }
  ),
  removeColumn: Threads.registerTasks<LocationData>("remove-column", (data) => {
    MeshManager.removeColumn(data);
  }),
  clearAll: Threads.registerTasks<LocationData>("clear-all", (data) => {
    MeshRegister.clearAll();
  }),
  removeColumnsOutsideRadius:
    Threads.registerTasks<RemoveChunksOutsideDistance>(
      "remove-column-outside-radius",
      (data) => {
        MeshManager.removeColumnsOutsideRadius(data[0], data[1]);
      }
    ),
};

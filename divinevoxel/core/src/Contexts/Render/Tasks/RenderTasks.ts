import type {
 RemoveChunkMeshTasks,
 RemoveChunksOutsideDistance,
 SetChunkMeshTask,
} from "./RenderTasks.types.js";
import type { LocationData } from "Math/index.js";
import { ThreadComm } from "@divinestar/threads/";
import { MeshManager } from "../Scene/MeshManager.js";
import { MeshRegister } from "../Scene/MeshRegister.js";

export const RenderTasks = {
 setChunk: ThreadComm.registerTasks<SetChunkMeshTask>("set-chunk", (data) => {
    MeshManager.chunks.update(data);
 }),
 removeChunk: ThreadComm.registerTasks<RemoveChunkMeshTasks>(
  "remove-chunk",
  (data) => {
   MeshManager.chunks.remove(data);
  }
 ),
 removeColumn: ThreadComm.registerTasks<LocationData>(
  "remove-column",
  (data) => {
   MeshManager.chunks.removeColumn(data);
  }
 ),
 clearAll: ThreadComm.registerTasks<LocationData>("clear-all", (data) => {
  MeshRegister.clearAll();
 }),
 removeColumnsOutsideRadius:
  ThreadComm.registerTasks<RemoveChunksOutsideDistance>(
   "remove-column-outside-radius",
   (data) => {
    MeshManager.removeColumnsOutsideRadius(data[0], data[1]);
   }
  ),
};

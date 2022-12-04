import type {
 RemoveChunkMeshTasks,
 SetChunkMeshTask,
} from "Meta/Tasks/RenderTasks.types";
import type { LocationData } from "Meta/Data/CommonTypes.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { DVER } from "../DivineVoxelEngineRender.js";
import { VoxelSubstanceRecord } from "../../Data/Register/VoxelRecords.js";

export const RenderTasks = {
 setChunk: ThreadComm.registerTasks<SetChunkMeshTask>("set-chunk", (data) => {
  const dimension = data[0];
  const substance = data[1];
  const chunkKey = WorldBounds.getChunkKeyFromPosition(
   data[2],
   data[3],
   data[4]
  );
  DVER.meshManager.handleChunkUpdate(
   dimension,
   VoxelSubstanceRecord[substance],
   chunkKey,
   data
  );
 }),
 removeChunk: ThreadComm.registerTasks<RemoveChunkMeshTasks>(
  "remove-chunk",
  (data) => {
   const dimension = data[0];
   const substance = data[1];
   const chunkKey = WorldBounds.getChunkKeyFromPosition(
    data[2],
    data[3],
    data[4]
   );
   DVER.meshManager.removeChunkMesh(
    dimension,
    VoxelSubstanceRecord[substance],
    chunkKey
   );
  }
 ),
 removeAllChunk: ThreadComm.registerTasks<LocationData>(
  "remove-all-chunks",
  (data) => {
   const dimension = data[0];
   const chunkKey = WorldBounds.getChunkKeyFromPosition(
    data[1],
    data[2],
    data[3]
   );

   DVER.meshManager.removeChunkMesh(dimension as string, "solid", chunkKey);
   DVER.meshManager.removeChunkMesh(dimension as string, "liquid", chunkKey);
   DVER.meshManager.removeChunkMesh(dimension as string, "flora", chunkKey);
   DVER.meshManager.removeChunkMesh(dimension as string, "magma", chunkKey);
  }
 ),
};

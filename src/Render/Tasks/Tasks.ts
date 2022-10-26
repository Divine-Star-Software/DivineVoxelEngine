import type { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
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
 removeChunk: ThreadComm.registerTasks<LocationData>(
  "remove-chunk",
  (data) => {}
 ),
};

//type
import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
//inter comms
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { BuilderCommManager } from "./InterComms/Builder/BuilderCommManager.js";
import { PropagationCommManager } from "./InterComms/Propagators/PropagationCommManager.js";
//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";
import { QueuesManager } from "./Queues/QueuesManager.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export const DVEW = {
 environment: <"node" | "browser">"browser",

 _3dFlatArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),
 __settingsHaveBeenSynced: false,
 __renderIsDone: false,

 UTIL: Util,
 settings: EngineSettings,

 matrix: Matrix,
 matrixCentralHub: MatrixCentralHub,

 nexusComm: NexusComm,
 renderComm: RenderComm,
 builderCommManager: BuilderCommManager,
 propagationCommManager: PropagationCommManager,

 worldGeneration: WorldGeneration,
 worldData: WorldData,
 voxelManager: VoxelManager,
 queues: QueuesManager,

 isReady() {
  let ready =
   DVEW.builderCommManager.isReady() &&
   DVEW.propagationCommManager.isReady() &&
   DVEW.__settingsHaveBeenSynced &&
   DVEW.__renderIsDone;
  return ready;
 },

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  this.__settingsHaveBeenSynced = true;
 },

 /**# Remove Chunk
  * ---
  * Removes a chunk from the render thread.
  * Can also delete the chunk from world ata.
  */
 removeChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  deleteChunk = false
 ) {
  const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;
  this.renderComm.sendMessage("remove-chunk", [chunkX, chunkY, chunkZ]);
  if (deleteChunk) {
   this.worldData.removeChunk(chunkX, chunkY, chunkZ);
   this.matrixCentralHub.releaseChunk(chunkX, chunkY, chunkZ);
  }
  return true;
 },

 /**# Delete Chunk
  * ---
  * Deletes a chunk from world data and releases it from all threads.
  */
 deleteChunk(chunkX: number, chunkY: number, chunkZ: number) {
  this.worldData.removeChunk(chunkX, chunkY, chunkZ);
  this.matrixCentralHub.releaseChunk(chunkX, chunkY, chunkZ);
 },

 buildChunk(chunkX: number, chunkY: number, chunkZ: number) {
  this.builderCommManager.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ);
 },

 async $INIT(data: DVEWInitData) {
  await InitWorldWorker(this, data);
 },
};

export type DivineVoxelEngineWorld = typeof DVEW;
DVEW.environment = Util.getEnviorment();

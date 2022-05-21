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
import { WorldGenCommManager } from "./InterComms/WorldGenerators/WorldGenCommManager.js";
//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";

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
 engineSettings: EngineSettings,

 matrix: Matrix,
 matrixCentralHub: MatrixCentralHub,

 nexusComm: NexusComm,
 renderComm: RenderComm,
 builderCommManager: BuilderCommManager,
 worldGenCommManager : WorldGenCommManager,

 worldGeneration: WorldGeneration,
 worldData: WorldData,
 voxelManager: VoxelManager,

 isReady() {
  let ready =
   DVEW.builderCommManager.isReady() &&
   DVEW.worldGenCommManager.isReady() && 
   DVEW.__settingsHaveBeenSynced &&
   DVEW.__renderIsDone;
  return ready;
 },

 syncSettings(data: EngineSettingsData) {
  this.engineSettings.syncSettings(data);
  if (data.chunks) {
   this.worldBounds.setChunkBounds(
    data.chunks.chunkXPow2,
    data.chunks.chunkYPow2,
    data.chunks.chunkZPow2
   );
   this.worldBounds.syncBoundsWithFlat3DArray(this._3dFlatArray);
  }
  if (data.regions) {
   this.worldBounds.setRegionBounds(
    data.regions.regionXPow2,
    data.regions.regionYPow2,
    data.regions.regionZPow2
   );
  }
  this.__settingsHaveBeenSynced = true;
 },

 runRGBLightUpdateQue() {
  const queue = this.worldData.getRGBLightUpdateQue();
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   this.worldGeneration.illumantionManager.runRGBFloodFillAt(
    position[0],
    position[1],
    position[2]
   );
  }
  this.worldData.clearRGBLightUpdateQue();
 },

 clearRGBLightUpdateQue() {
  this.worldData.clearRGBLightUpdateQue();
 },

 runRGBLightRemoveQue() {
  const queue = this.worldData.getRGBLightRemoveQue();
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   this.worldGeneration.illumantionManager.runRGBFloodRemoveAt(
    true,
    position[0],
    position[1],
    position[2]
   );
  }
  this.worldData.clearRGBLightRemoveQue();
 },

 clearRGBLightRemoveQue() {
  this.worldData.clearRGBLightRemoveQue();
 },

 runChunkRebuildQue() {
  const queue = this.worldData.getChunkRebuildQue();
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   const substance = this.worldData.getSubstanceNeededToRebuild(
    position[0],
    position[1],
    position[2]
   );
   if (substance.all) {
    this.buildChunk(position[0], position[1], position[2]);
   }
  }
  this.worldData.clearChunkRebuildQue();
 },

 clearChunkRebuildQue() {
  this.worldData.clearChunkRebuildQue();
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

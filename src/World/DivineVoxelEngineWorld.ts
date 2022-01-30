import { EngineSettings } from "../Global/EngineSettings.js";
import type { DVEWInitData } from "Meta/World/DVEW";
import { VoxelPalette } from "Meta/WorldData/World.types.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { InitWorldWorker } from "./Functions/InitWorldWorker.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export class DivineVoxelEngineWorld {
 worker: Worker;

 settings = {
  voxelPaletteMode: "per-chunk",
 };

 engineSettings: EngineSettings = new EngineSettings();
 UTIL = new Util();

 builderManager = new BuilderManager();
 worldGeneration = new WorldGeneration(this);

 worldData = new WorldData(this);

 textureManager = new TextureManager();
 voxelManager = new VoxelManager();
 voxelHelper = new VoxelHelper(
  this.UTIL,
  this.worldData,
  this.textureManager,
  this.voxelManager
 );

 chunkProccesor = new ChunkProcessor(this);

 constructor(worker: Worker) {
  this.worker = worker;
  this.builderManager.setMainThreadCom(<any>this.worker);
 }
 syncSettings(data: EngineSettingsData) {
  this.engineSettings.syncSettings(data);
  if (data.chunks) {
   this.worldData.chunkXPow2 = data.chunks.chunkXPow2;
   this.worldData.chunkYPow2 = data.chunks.chunkYPow2;
   this.worldData.chunkZPow2 = data.chunks.chunkZPow2;
  }
 }

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
 }

 clearRGBLightUpdateQue() {
  this.worldData.clearRGBLightUpdateQue();
 }

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
  }
 
  clearRGBLightRemoveQue() {
   this.worldData.clearRGBLightRemoveQue();
  }

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
    this.buildChunkAsync(position[0], position[1], position[2]);
    this.buildFluidMesh();
   }
  }
  this.worldData.clearChunkRebuildQue();
 }

 async runChunkRebuildQueAsync() {
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
    this.buildChunkAsync(position[0], position[1], position[2]);
    this.buildFluidMesh();
   }
  }
  this.worldData.clearChunkRebuildQue();
 }

 clearChunkRebuildQue() {
  this.worldData.clearChunkRebuildQue();
 }

 removeChunk(chunkX: number, chunkY: number, chunkZ: number) {
  const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;
  this.builderManager.requestFullChunkBeRemoved(chunkX, chunkZ);
  this.worldData.removeChunk(chunkX, chunkY, chunkZ);
  return true;
 }

 buildChunk(chunkX: number, chunkY: number, chunkZ: number) {
  const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;

  // let t0= performance.now();
  const template = this.chunkProccesor.makeAllChunkTemplates(
   chunk,
   chunkX,
   chunkY,
   chunkZ
  );
  this.builderManager.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, template);

  // let t1= performance.now();
  // console.log(t1 - t0);
  return true;
 }
 async buildChunkAsync(chunkX: number, chunkY: number, chunkZ: number) {
  const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) return false;
  const template = this.chunkProccesor.makeAllChunkTemplatesAsync(
   chunk,
   chunkX,
   chunkY,
   chunkZ
  );
  // console.log("sending")
  // this.builderManager.requestFullChunkBeBuiltAsync(chunkX, chunkY, chunkZ, template);
  return true;
 }

 buildFluidMesh() {
  this.builderManager.requestFluidMeshBeReBuilt();
 }

 async $INIT(data: DVEWInitData) {
  this.settings.voxelPaletteMode = data.voxelPaletteMode;
  await InitWorldWorker(this, data.onReady, data.onMessage, data.onRestart);
 }
}

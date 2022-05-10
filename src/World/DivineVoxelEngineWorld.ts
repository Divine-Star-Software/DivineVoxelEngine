//type
import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";
//classes
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
//comms
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { FluidBuilderComm } from "./InterComms/FluidBuilder/FluidBuilderComm.js";
import { BuilderCommManager } from "./InterComms/Builder/BuilderCommManager.js";
import { WorldBounds } from "../Global/WorldBounds/WorldBounds.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { TextureManager } from "./Textures/TextureManager.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export class DivineVoxelEngineWorld {
 environment: "node" | "browser" = "browser";
 worker: Worker;
 worldBounds = WorldBounds;
 __settingsHaveBeenSynced = false;
 __renderIsDone = false;
 engineSettings  = EngineSettings;
 UTIL = new Util();

 builderCommManager = new BuilderCommManager(this);
 //builderComm = new BuilderComm(this);
 fluidBuilderComm = FluidBuilderComm;
 worldGeneration = new WorldGeneration(this);
 renderComm = RenderComm;

 worldData = new WorldData(this);

 matrix = new Matrix(this);
 matrixCentralHub = new MatrixCentralHub(this);

 nexusComm = NexusComm;

 voxelManager = new VoxelManager(this);
 textureManager = new TextureManager();

 constructor(worker: Worker) {
  this.worker = worker;
  //this.builderComm.setMainThreadCom(<any>this.worker);
 }

 isReady() {
  let ready =
   this.builderCommManager.isReady() &&
   this.fluidBuilderComm.ready &&
   this.__settingsHaveBeenSynced &&
   this.__renderIsDone;
  if (ready) {
   console.log("WORLD READY");
  }
  return ready;
 }

 syncSettings(data: EngineSettingsData) {
  this.engineSettings.syncSettings(data);
  if (data.chunks) {
   this.worldBounds.setChunkBounds(
    data.chunks.chunkXPow2,
    data.chunks.chunkYPow2,
    data.chunks.chunkZPow2
   );
   this.worldData.syncChunkBounds();
   this.worldGeneration.illumantionManager.syncChunkBounds();
   this.worldGeneration.chunkDataHelper.syncChunkBounds();
  }
  if (data.regions) {
   this.worldBounds.setRegionBounds(
    data.regions.regionXPow2,
    data.regions.regionYPow2,
    data.regions.regionZPow2
   );
  }
  this.__settingsHaveBeenSynced = true;
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
    this.buildChunk(position[0], position[1], position[2]);
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
  // this.builderComm.requestFullChunkBeRemoved(chunkX, chunkZ);
  this.renderComm.sendMessage("remove-chunk", [chunkX, chunkZ]);
  this.fluidBuilderComm.requestFullChunkBeRemoved(chunkX, chunkZ);
  this.worldData.removeChunk(chunkX, chunkY, chunkZ);
  return true;
 }

 buildChunk(chunkX: number, chunkY: number, chunkZ: number) {
  this.builderCommManager.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ);
 }

 buildFluidMesh() {
  DVEW.fluidBuilderComm.requestFluidMeshBeReBuilt();
 }

 async $INIT(data: DVEWInitData) {
  await InitWorldWorker(this, data.onReady, data.onMessage, data.onRestart);
 }
}

//@ts-ignore
export const DVEW = new DivineVoxelEngineWorld(self as Worker);

//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
 DVEW.environment = "node";
}

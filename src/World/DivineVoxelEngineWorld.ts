import type { DVEW } from "Meta/World/DVEW";
import { VoxelPallet } from "Meta/WorldData/World.types.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { InitWorldWorker } from "./Functions/InitWorldWorker.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export class DivineVoxelEngineWorld implements DVEW {
 worker: Worker;

 settings = {
  voxelPalletMode: "per-chunk",
 };

 UTIL = new Util();

 builderManager = new BuilderManager();
 worldGeneration = new WorldGeneration();

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

 removeChunk(chunkX: number, chunkZ: number) {
  const chunk = this.worldData.getChunk(chunkX, chunkZ);
  if (!chunk) return false;
  this.builderManager.requestChunkBeRemoved(chunkX, chunkZ);
  this.worldData.removeChunk(chunkX, chunkZ);
  return true;
 }

 buildChunk(chunkX: number, chunkZ: number) {
  const chunk = this.worldData.getChunk(chunkX, chunkZ);
  if (!chunk) return false;

  let pallet = <VoxelPallet>chunk.voxelPallet;
  if (this.settings.voxelPalletMode == "global" && !chunk.voxelPallet) {
   pallet = this.worldGeneration.getGlobalVoxelPallet();
  }

 // let t0= performance.now(); 
  const template = this.chunkProccesor.makeAllChunkTemplates(
   chunk.voxels,
   pallet,
   chunkX,
   chunkZ
  );
  this.builderManager.requestFullChunkBeBuilt(chunkX, chunkZ, template);

 // let t1= performance.now(); 
 // console.log(t1 - t0);
  return true;
 }

 buildFluidMesh() {

  this.builderManager.requestFluidMeshBeReBuilt();
 }

 async $INIT(data: {
  voxelPalletMode: "per-chunk" | "global";
  onReady: Function;
  onMessage: (message: string, data: any[]) => void;
 }) {
  this.settings.voxelPalletMode = data.voxelPalletMode;
  await InitWorldWorker(this, data.onReady, data.onMessage);
 }
}

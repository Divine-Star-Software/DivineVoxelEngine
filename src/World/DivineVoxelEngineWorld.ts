import { DVEW } from "Meta/Contents/World/DVEW.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { InitWorldWorker } from "./Functions/InitWorldWorker.js";
import { TextureManager } from "./Textures/TextreManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export class DivineVoxelEngineWorld implements DVEW {
 worker: Worker;
 UTIL = new Util();

 builderManager = new BuilderManager();

 worldData = new WorldData(this.builderManager, this.UTIL);

 textureManager = new TextureManager();
 voxelHelper = new VoxelHelper(this.UTIL, this.textureManager);
 voxelManager = new VoxelManager();

 chunkProccesor = new ChunkProcessor(
  this.worldData,
  this.voxelManager,
  this.UTIL
 );

 constructor(worker: Worker) {
  this.worker = worker;
  this.builderManager.setMainThreadCom(<any>this.worker);
  this.worldData.setChunkProcessor(this.chunkProccesor);
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
  const template = this.chunkProccesor.makeChunkTemplate(chunk, chunkX, chunkZ);
  this.builderManager.requestChunkBeBuilt(chunkX, chunkZ, template);
  return true;
 }

 $INIT(data: {
  onReady: Function;
  onMessage: (message: string, data: any[]) => void;
 }) {
  InitWorldWorker(this, data.onReady, data.onMessage);
 }
}

import { DVEW } from "Meta/Contents/World/DVEW.js";
import { Util } from "../../../Global/Util.helper.js";
import { BuilderManager } from "./BuilderManager.js";
import { ChunkMap } from "./Chunks/ChunkMap.js";
import { ChunkProcessor } from "./Chunks/ChunkProcessor.js";
import { InitWorldWorker } from "./Functions/InitWorldWorker.js";
import { TextureManager } from "./Textures/TextreManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { WorldData } from "./WorldData/WorldData.js";
import { PlayerWatcher } from "./WorldGen/PlayerWatcher.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker content.
 */
export class DivineVoxelEngineWorld implements DVEW {
 worker: Worker;
 UTIL = new Util();

 builderManager = new BuilderManager();

 chunkMap = new ChunkMap();
 worldData = new WorldData(this.builderManager, this.chunkMap, this.UTIL);
 playerWatcher = new PlayerWatcher(this.worldData);

 textureManager = new TextureManager();
 voxelHelper = new VoxelHelper(this.UTIL,this.textureManager);
 voxelManager = new VoxelManager();

 chunkProccesor = new ChunkProcessor(
  this.worldData,
  this.voxelManager,
  this.playerWatcher,
  this.UTIL
 );

 constructor(worker: Worker) {
  this.worker = worker;
  this.builderManager.setMainThreadCom(<any>this.worker);
  this.worldData.setChunkProcessor(this.chunkProccesor);
 }



 $INIT() {
  InitWorldWorker(this);
 }
}

//types
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import type { DVEBInitData } from "Meta/Builder/DVEB.js";
//objects
import { ChunkMeshBuilder } from "./Mesher/ChunkMeshBuilder.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { ChunkProcessor } from "./Processor/ChunkProcessor.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//inter comms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";

export const DVEB = {
 _3dFlatArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),
 environment: <"node" | "browser">"browser",
 UTIL: Util,
 worldMatrix: WorldMatrix,
 matrixHub: MatrixHub,

 renderComm: RenderComm,
 worldComm: WorldComm,

 chunkProccesor: ChunkProcessor,
 textureManager: TextureManager,
 voxelManager: VoxelManager,
 voxelHelper: VoxelHelper,
 __connectedToWorld: false,

 engineSettings: EngineSettings,
 __settingsHaveBeenSynced: false,
 shapeManager: ShapeManager,
 shapeHelper: ShapeHelper,
 chunkMesher: ChunkMeshBuilder,

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
 reStart() {},

 isReady() {
  return (
   this.__connectedToWorld &&
   this.matrixHub.worldPort !== undefined &&
   this.voxelManager.shapMapIsSet() &&
   this.worldComm.port !== null &&
   this.textureManager.isReady() &&
   this.__settingsHaveBeenSynced
  );
 },

 async $INIT(initData: DVEBInitData) {
  await InitWorker(this, initData);

  this.worldComm.sendMessage("ready", []);
 },

 async buildChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let chunk = this.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) {
   await this.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
   chunk = this.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
   if (!chunk) {
    console.warn(`${chunkX} ${chunkY} ${chunkZ} could not be loaded`);
    return;
   }
  }
  const template = this.chunkProccesor.makeAllChunkTemplates(
   chunk.voxels,
   chunkX,
   chunkY,
   chunkZ
  );
  this.chunkMesher.buildChunkMesh(chunkX, chunkY, chunkZ, template);
  return true;
 },
};

export type DivineVoxelEngineBuilder = typeof DVEB;

//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
 DVEB.environment = "node";
}

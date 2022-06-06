//types
import type { DVEPInitData } from "Meta/Propagation/DVEP.js";
import type { EngineSettingsData, VoxelSubstanceType } from "Meta/index.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { QueuesManager } from "./Queues/QueuesManager.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
//inter comms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";

export const DVEP = {
 environment: <"node" | "browser">"browser",
 __settingsHaveBeenSynced: false,
 __connectedToWorld: false,
 __queueStatesSet: false,

 UTIL: Util,
 worldBounds: Util.getWorldBounds(),
 _3dFlatArray: Util.getFlat3DArray(),
 settings: EngineSettings,

 worldMatrix: WorldMatrix,
 matrixHub: MatrixHub,

 worldComm: WorldComm,
 renderComm: RenderComm,

 illumination: IlluminationManager,

 voxelManager: VoxelManager,
 voxelHelper: VoxelHelper,
 queues: QueuesManager,

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  this.__settingsHaveBeenSynced = true;
 },

 isReady() {
  return this.__settingsHaveBeenSynced && this.worldComm.port !== undefined;
 },
 reStart() {},

 async $INIT(initData: DVEPInitData) {
  this.settings.setContext("DVEP");
  await InitWorker(this, initData);
  this.worldComm.sendMessage("ready", []);
 },

 rebuildQueMap: <Record<string, boolean>>{},

 addToRebuildQue(
  x: number,
  y: number,
  z: number,
  substance: VoxelSubstanceType | "all"
 ) {
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKey(chunkPOS);

  if (!this.rebuildQueMap[chunkKey]) {
   this.rebuildQueMap[chunkKey] = true;
   //@ts-ignore
   this.worldComm.port.postMessage([0, x, y, z, substance]);
  }
 },

 runRGBFloodFill(x: number, y: number, z: number) {
  this.illumination.runRGBFloodFillAt(x, y, z);
  this.queues.finishRGBLightUpdate();
  this.rebuildQueMap = {};
 },
 runRGBFloodRemove(x: number, y: number, z: number) {
  this.illumination.runRGBFloodRemoveAt(true, x, y, z);
  this.queues.finishRGBLightRemove();
  this.rebuildQueMap = {};
 },
 runSunLightForWorldColumn(x: number, z: number, maxY: number) {
  this.illumination.populateWorldColumnWithSunLight(x, z, maxY);

  this.queues.finishWorldColumnSunLightProp();
 },
 runSunFloodFill(x: number, y: number, z: number) {
  this.illumination.runSunLightUpdateAt(x, y, z);
  this.queues.finishSunLightUpdate();
 },
 runSunFloodFillAtMaxY(x: number, z: number, maxY: number) {
  this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
  this.queues.finishSunLightUpdateAtMaxY();
 },
 runSunFloodRemove(x: number, y: number, z: number) {
  this.rebuildQueMap = {};
 },
};

export type DivineVoxelEnginePropagation = typeof DVEP;

DVEP.environment = Util.getEnviorment();

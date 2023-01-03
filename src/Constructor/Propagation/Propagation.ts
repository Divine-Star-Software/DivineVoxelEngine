//types
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { ConstructorRemoteThreadTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import {
 ExplosionTasks,
 ReBuildTasks,
 RunRebuildTasks,
 UpdateTasksO,
 WorldSunTask,
} from "Meta/Tasks/Tasks.types.js";
import { ExplosionManager } from "./Explosion/ExplosionManager.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";

export const Propagation = {
 illumination: IlluminationManager,
 flow: FlowManager,
 explosion: ExplosionManager,
 rebuildQueMap: <Map<string, Map<string, boolean>>>new Map(),

 $INIT() {},

 _dimension: "main",
 _buildQueue: "main",

 addToRebuildQue(
  x: number,
  y: number,
  z: number,
  substance: VoxelSubstanceType | "all"
 ) {
  if (DVEC.settings.settings.server.enabled) return;
  const chunkPOS = WorldSpaces.chunk.getPositionXYZ(x, y, z);
  const chunkKey = WorldSpaces.chunk.getKey();

  if (!this.rebuildQueMap.has(this._buildQueue)) {
   this.rebuildQueMap.set(this._buildQueue, new Map());
  }
  const map = this.rebuildQueMap.get(this._buildQueue);
  if (!map) return;

  if (!map.has(chunkKey)) {
   map.set(chunkKey, true);
   DVEC.worldComm.runTasks<ReBuildTasks>(
    ConstructorRemoteThreadTasks.addToRebuildQue,
    [this._dimension, chunkPOS.x, chunkPOS.y, chunkPOS.z, this._buildQueue]
   );
  }
 },

 setBuildData(dimension: string, buildQueue: string) {
  this._dimension = dimension;
  this._buildQueue = buildQueue;
 },

 _process(data: UpdateTasksO) {
  this._dimension = data[0];
  this._buildQueue = data[4];
 },

 resetRebuildQue() {
  this.rebuildQueMap.clear();
 },

 runRebuildQue() {
  DVEC.worldComm.runTasks<RunRebuildTasks>(
   ConstructorRemoteThreadTasks.runRebuildQue,
   [this._buildQueue]
  );
  this.rebuildQueMap.clear();
 },

 runRGBUpdate(data: UpdateTasksO) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination._sDataTool.setDimension(data[0]);
  this.illumination._nDataTool.setDimension(data[0]);
  this.illumination.runRGBUpdateAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },
 runRGBRemove(data: UpdateTasksO) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination._sDataTool.setDimension(data[0]);
  this.illumination._nDataTool.setDimension(data[0]);
  this.illumination.runRGBRemoveAt(true, data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 runSunLightUpdate(data: UpdateTasksO) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination._sDataTool.setDimension(data[0]);
  this.illumination._nDataTool.setDimension(data[0]);
  this.illumination.runSunLightUpdateAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 runSunLightRemove(data: UpdateTasksO) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination._sDataTool.setDimension(data[0]);
  this.illumination._nDataTool.setDimension(data[0]);
  this.illumination.runSunLightRemoveAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 async updateFlowAt(data: UpdateTasksO) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination._sDataTool.setDimension(data[0]);
  this.illumination._nDataTool.setDimension(data[0]);
  this.flow._sDataTool.setDimension(data[0]);
  this.flow._nDataTool.setDimension(data[0]);
  await this.flow.runFlow(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 async removeFlowAt(data: UpdateTasksO) {
  this._process(data);
  WorldRegister.cache.enable();
  this.flow._sDataTool.setDimension(data[0]);
  this.flow._nDataTool.setDimension(data[0]);
  await this.flow.runFlowRemove(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 runExplosion(data: ExplosionTasks) {
  this._dimension = data[0];
  this._buildQueue = data[5];
  WorldRegister.cache.enable();
  this.explosion.runExplosion(data[0], data[1], data[2], data[3], data[4]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },
 runWorldSun(data: WorldSunTask) {
  WorldRegister.cache.enable();
  this.flow._sDataTool.setDimension(data[0]);
  this.flow._nDataTool.setDimension(data[0]);
  this.illumination.runWorldSun(data);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },
};

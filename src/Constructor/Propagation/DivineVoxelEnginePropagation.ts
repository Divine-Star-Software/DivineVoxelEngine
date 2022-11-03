//types
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { WorldTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import {
 ReBuildTasks,
 RunRebuildTasks,
 UpdateTasks,
} from "Meta/Tasks/Tasks.types.js";
export const DVEP = {
 illumination: IlluminationManager,
 flow: FlowManager,
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
  const chunkPOS = WorldBounds.getChunkPosition(x, y, z);
  const chunkKey = WorldBounds.getChunkKey(chunkPOS);

  if (!this.rebuildQueMap.has(this._buildQueue)) {
   this.rebuildQueMap.set(this._buildQueue, new Map());
  }



  const map = this.rebuildQueMap.get(this._buildQueue);
  if (!map) return;

  if (!map.has(chunkKey)) {

   map.set(chunkKey, true);
   DVEC.worldComm.runTasks<ReBuildTasks>(WorldTasks.addToRebuildQue, [
    this._dimension,
    chunkPOS.x,
    chunkPOS.y,
    chunkPOS.z,
    this._buildQueue,
   ]);
  }
 },

 _process(data: UpdateTasks) {
  this._dimension = data[0];
  this._buildQueue = data[4];
 },

 resetRebuildQue() {
  this.rebuildQueMap.clear();
 },

 runRebuildQue() {
  DVEC.worldComm.runTasks<RunRebuildTasks>(WorldTasks.runRebuildQue, [
   this._buildQueue,
  ]);
  this.rebuildQueMap.clear();
 },

 runRGBFloodFill(data: UpdateTasks) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination.runRGBFloodFillAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },
 runRGBFloodRemove(data: UpdateTasks) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination.runRGBFloodRemoveAt(true, data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },
 runSunLightForWorldColumn(x: number, z: number, maxY: number) {
  WorldRegister.cache.enable();
  this.illumination.populateWorldColumnWithSunLight(x, z, maxY);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 runSunFloodFillAtMaxY(x: number, z: number, maxY: number) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },
 runSunFloodFillMaxYFlood(x: number, z: number, maxY: number) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightFloodOut(x, z);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 runSunLightUpdate(data: UpdateTasks) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination.runSunLightUpdateAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 runSunLightRemove(data: UpdateTasks) {
  this._process(data);
  WorldRegister.cache.enable();
  this.illumination.runSunLightRemoveAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 async updateFlowAt(data: UpdateTasks) {
  this._process(data);
  WorldRegister.cache.enable();
  await this.flow.runFlow(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },

 async removeFlowAt(data: UpdateTasks) {
  this._process(data);
  WorldRegister.cache.enable();
  await this.flow.runFlowRemove(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap.clear();
 },
};

export type DivineVoxelEnginePropagation = typeof DVEP;

//types
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { WorldTasks } from "../../Common/Threads/Contracts/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { UpdateTasks } from "Meta/Tasks/Tasks.types.js";
export const DVEP = {
 illumination: IlluminationManager,
 flow: FlowManager,
 rebuildQueMap: <Record<string, boolean>>{},

 $INIT() {},

 addToRebuildQue(
  x: number,
  y: number,
  z: number,
  substance: VoxelSubstanceType | "all"
 ) {
  if (DVEC.settings.settings.server.enabled) return;
  const chunkPOS = WorldBounds.getChunkPosition(x, y, z);
  const chunkKey = WorldBounds.getChunkKey(chunkPOS);

  if (!this.rebuildQueMap[chunkKey]) {
   this.rebuildQueMap[chunkKey] = true;
   DVEC.worldComm.sendMessage(WorldTasks.addToRebuildQue, [
    chunkPOS.x,
    chunkPOS.y,
    chunkPOS.z,
    substance,
   ]);
  }
 },

 resetRebuildQue() {
  this.rebuildQueMap = {};
 },

 runRebuildQue() {
  DVEC.worldComm.sendMessage(WorldTasks.runRebuildQue, []);
  this.rebuildQueMap = {};
 },

 runRGBFloodFill(data : UpdateTasks) {
  WorldRegister.cache.enable();
  this.illumination.runRGBFloodFillAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },
 runRGBFloodRemove(data : UpdateTasks) {
  WorldRegister.cache.enable();
  this.illumination.runRGBFloodRemoveAt(true,data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },
 runSunLightForWorldColumn(x: number, z: number, maxY: number) {
  WorldRegister.cache.enable();
  this.illumination.populateWorldColumnWithSunLight(x, z, maxY);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 runSunFloodFillAtMaxY(x: number, z: number, maxY: number) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },
 runSunFloodFillMaxYFlood(x: number, z: number, maxY: number) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightFloodOut(x, z);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 runSunLightUpdate(data : UpdateTasks) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightUpdateAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 runSunLightRemove(data : UpdateTasks) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightRemoveAt(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 async updateFlowAt(data : UpdateTasks) {
  WorldRegister.cache.enable();
  await this.flow.runFlow(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 async removeFlowAt(data : UpdateTasks) {
  WorldRegister.cache.enable();
  await this.flow.runFlowRemove(data[1], data[2], data[3]);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },
};

export type DivineVoxelEnginePropagation = typeof DVEP;

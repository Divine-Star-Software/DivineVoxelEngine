//types
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { WorldTasks } from "../../Data/Constants/InterComms/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
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

 runRGBFloodFill(x: number, y: number, z: number) {
  WorldRegister.cache.enable();
  this.illumination.runRGBFloodFillAt(x, y, z);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },
 runRGBFloodRemove(x: number, y: number, z: number) {
  WorldRegister.cache.enable();
  this.illumination.runRGBFloodRemoveAt(true, x, y, z);
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

 runSunLightUpdate(x: number, y: number, z: number) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightUpdateAt(x, y, z);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 runSunLightRemove(x: number, y: number, z: number) {
  WorldRegister.cache.enable();
  this.illumination.runSunLightRemoveAt(x, y, z);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 async updateFlowAt(x: number, y: number, z: number) {
  WorldRegister.cache.enable();
  await this.flow.runFlow(x, y, z);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },

 async removeFlowAt(x: number, y: number, z: number) {
  WorldRegister.cache.enable();
  await this.flow.runFlowRemove(x, y, z);
  WorldRegister.cache.disable();
  this.rebuildQueMap = {};
 },
};

export type DivineVoxelEnginePropagation = typeof DVEP;

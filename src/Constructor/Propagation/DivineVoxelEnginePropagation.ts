//types
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { WorldTasks } from "../../Constants/InterComms/WorldTasks.js";
import { FlowManager } from "./Flow/FlowManager.js";
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
  const chunkPOS = DVEC.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = DVEC.worldBounds.getChunkKey(chunkPOS);
  
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
  this.illumination.runRGBFloodFillAt(x, y, z);
  this.rebuildQueMap = {};
 },
 runRGBFloodRemove(x: number, y: number, z: number) {
  this.illumination.runRGBFloodRemoveAt(true, x, y, z);
  this.rebuildQueMap = {};
 },
 runSunLightForWorldColumn(x: number, z: number, maxY: number) {
  this.illumination.populateWorldColumnWithSunLight(x, z, maxY);
  this.rebuildQueMap = {};
 },

 runSunFloodFillAtMaxY(x: number, z: number, maxY: number) {
  this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
  this.rebuildQueMap = {};
 },
 runSunFloodFillMaxYFlood(x: number, z: number, maxY: number) {
  this.illumination.runSunLightFloodOut(x, z);
  this.rebuildQueMap = {};
 },
 runSunLightUpdate(x: number, y: number, z: number) {
  this.illumination.runSunLightUpdateAt(x, y, z);
  this.rebuildQueMap = {};
 },

 runSunLightRemove(x: number, y: number, z: number) {
  this.illumination.runSunLightRemoveAt(x, y, z);
  this.rebuildQueMap = {};
 },

 async updateFlowAt(x: number, y: number, z: number) {
  await this.flow.runFlow(x, y, z);
  this.rebuildQueMap = {};
 },

 async removeFlowAt(x: number, y: number, z: number) {
  await this.flow.runFlowRemove(x, y, z);
  this.rebuildQueMap = {};
 },
};

export type DivineVoxelEnginePropagation = typeof DVEP;

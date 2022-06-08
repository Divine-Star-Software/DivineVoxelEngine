//types
import type { VoxelSubstanceType } from "Meta/index.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { ConstructorToWorldMessages } from "../../Shared/InterComms/ConstructorToWorld.js";
export const DVEP = {
 illumination: IlluminationManager,
 rebuildQueMap: <Record<string, boolean>>{},

 $INIT() {},

 addToRebuildQue(
  x: number,
  y: number,
  z: number,
  substance: VoxelSubstanceType | "all"
 ) {
  const chunkPOS = DVEC.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = DVEC.worldBounds.getChunkKey(chunkPOS);

  if (!this.rebuildQueMap[chunkKey]) {
   this.rebuildQueMap[chunkKey] = true;
   DVEC.worldComm.sendMessage(ConstructorToWorldMessages.addToRebuildQue, [
    x,
    y,
    z,
    substance,
   ]);
  }
 },

 runRGBFloodFill(x: number, y: number, z: number) {
  this.illumination.runRGBFloodFillAt(x, y, z);
  DVEC.queues.finishRGBLightUpdate();
  this.rebuildQueMap = {};
 },
 runRGBFloodRemove(x: number, y: number, z: number) {
  this.illumination.runRGBFloodRemoveAt(true, x, y, z);
  DVEC.queues.finishRGBLightRemove();
  this.rebuildQueMap = {};
 },
 runSunLightForWorldColumn(x: number, z: number, maxY: number) {
  this.illumination.populateWorldColumnWithSunLight(x, z, maxY);

  DVEC.queues.finishWorldColumnSunLightProp();
 },
 runSunFloodFill(x: number, y: number, z: number) {
  this.illumination.runSunLightUpdateAt(x, y, z);
  DVEC.queues.finishSunLightUpdate();
 },
 runSunFloodFillAtMaxY(x: number, z: number, maxY: number) {
  this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
  DVEC.queues.finishSunLightUpdateAtMaxY();
 },
 runSunFloodRemove(x: number, y: number, z: number) {
  this.rebuildQueMap = {};
 },
};

export type DivineVoxelEnginePropagation = typeof DVEP;

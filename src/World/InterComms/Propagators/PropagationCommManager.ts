//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
//comms
import { GetNewPropagationComm } from "./PropagationComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { VoxelSubstanceType } from "Meta/index.js";

/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export const PropagationCommManager = {
 count: 0,
 numWorldGens: 0,
 states: <Int32Array>new Int32Array(),

 __numLightUpdates: 0,

 propagators: <InterCommInterface[]>[],

 worldGensConnected: 0,

 $INIT() {
  const sab = new SharedArrayBuffer(4 * 4);
  PropagationCommManager.states = new Int32Array(sab);
  for (const propagators of this.propagators) {
   propagators.sendMessage(-1, [sab]);
  }
 },

 addPropagator(port: InterCommPortTypes) {
  const newComm = GetNewPropagationComm(this.numWorldGens + 1, port);
  this.propagators.push(newComm);
 },

 syncChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number) {
  for (const worldGen of this.propagators) {
   DVEW.matrixCentralHub.syncChunkInThread(
    worldGen.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 releaseChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number) {
  for (const worldGen of this.propagators) {
   DVEW.matrixCentralHub.releaseChunkInThread(
    worldGen.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 syncRegionInAllWorldGens(regionX: number, regionY: number, regionZ: number) {
  for (const worldGen of this.propagators) {
   DVEW.matrixCentralHub.syncRegionInThread(
    worldGen.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 releaseRegionInAllWorldGens(
  regionX: number,
  regionY: number,
  regionZ: number
 ) {
  for (const worldGen of this.propagators) {
   DVEW.matrixCentralHub.releaseRegionInThread(
    worldGen.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 isReady() {
  if (!this.worldGensConnected) return false;
  if (this.worldGensConnected < this.numWorldGens) return false;
  return true;
 },

 _chunkRebuildQueMap: <
  Record<string, Record<VoxelSubstanceType | "all", boolean>>
 >{},
 _chunkRebuildQue: <number[][]>[],

 __addToRebuildQue(
  x: number,
  y: number,
  z: number,
  substance: VoxelSubstanceType | "all"
 ) {
  const chunk = DVEW.worldData.getChunk(x, y, z);
  if (!chunk) return;
  const chunkPOS = DVEW.worldBounds.getChunkPosition(x, y, z);
  const chunkKey = DVEW.worldBounds.getChunkKey(chunkPOS);
  if (!this._chunkRebuildQueMap[chunkKey]) {
   this._chunkRebuildQue.push([chunkPOS.x, chunkPOS.y, chunkPOS.z]);
   //@ts-ignore
   this._chunkRebuildQueMap[chunkKey] = {};
   this._chunkRebuildQueMap[chunkKey][substance] = true;
  } else {
   this._chunkRebuildQueMap[chunkKey][substance] = true;
  }
 },

 awaitAllLightUpdates() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return PropagationCommManager.__numLightUpdates == 0;
   },
   checkInterval: 1,
  });
 },

 runRebuildQue() {
  const queue = this._chunkRebuildQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   DVEW.buildChunk(position[0], position[1], position[2]);
  }
 },

 runRGBFloodFillAt(x: number, y: number, z: number) {
  const comm = this.propagators[this.count];
  comm.sendMessage(0, [x, y, z]);
  this.count++;
  if (this.count >= this.numWorldGens) {
   this.count = 0;
  }
 },
 runRGBFloodRemoveAt(x: number, y: number, z: number) {
  const comm = this.propagators[this.count];
  comm.sendMessage(1, [x, y, z]);
  this.count++;
  if (this.count >= this.numWorldGens) {
   this.count = 0;
  }
 },

 areRGBLightUpdatesAllDone() {
  return Atomics.load(this.states, 0) == 0;
 },
 areRGBLightRemovesAllDone() {
  return Atomics.load(this.states, 1) == 0;
 },
};

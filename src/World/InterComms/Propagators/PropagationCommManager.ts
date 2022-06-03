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

 __numLightUpdates: 0,

 propagators: <InterCommInterface[]>[],

 worldGensConnected: 0,

 $INIT(statesSAB: SharedArrayBuffer) {
  for (const propagators of this.propagators) {
   propagators.sendMessage(-1, [statesSAB]);
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

 __handleCount() {
  this.count++;
  if (this.count >= this.numWorldGens) {
   this.count = 0;
  }
 },
 runRGBFloodFillAt(x: number, y: number, z: number) {
  const comm = this.propagators[this.count];
  comm.sendMessage(0, [x, y, z]);
  this.__handleCount();
 },
 runRGBFloodRemoveAt(x: number, y: number, z: number) {
  const comm = this.propagators[this.count];
  comm.sendMessage(1, [x, y, z]);
  this.__handleCount();
 },
 runSunLightForWorldColumn(x: number, z: number) {
  const comm = this.propagators[this.count];
  comm.sendMessage(2, [x, z]);
  this.__handleCount();
 },
 runSunFillAt(x: number, y: number, z: number) {
  const comm = this.propagators[this.count];
  comm.sendMessage(3, [x, y, z]);
  this.__handleCount();
 },
 runSunRemoveAt(x: number, y: number, z: number) {
  const comm = this.propagators[this.count];
  comm.sendMessage(4, [x, y, z]);
  this.__handleCount();
 },
};

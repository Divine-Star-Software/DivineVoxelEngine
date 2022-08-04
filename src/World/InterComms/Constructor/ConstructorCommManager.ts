//types
import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
//comms
import { GetNewConstructorComm } from "./ConstructorComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { VoxelSubstanceType } from "Meta/index.js";
import { WorldToConstructorMessages } from "../../../Constants/InterComms/WorldToConstructor.js";

/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export const ConstructorCommManager = {
 count: 0,
 numConstructors: 0,

 __numLightUpdates: 0,

 constructors: <InterCommInterface[]>[],

 constructorsConnected: 0,

 $INIT(statesSAB: SharedArrayBuffer) {
  for (const constructor of this.constructors) {
   constructor.sendMessage(WorldToConstructorMessages.setQueueStates, [
    statesSAB,
   ]);
  }
 },

 addThread(port: InterCommPortTypes) {
  const newComm = GetNewConstructorComm(this.numConstructors + 1, port);
  this.constructors.push(newComm);
 },

 syncChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number) {
  for (const constructor of this.constructors) {
   DVEW.matrixCentralHub.syncChunkInThread(
    constructor.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 releaseChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number) {
  for (const constructor of this.constructors) {
   DVEW.matrixCentralHub.releaseChunkInThread(
    constructor.name,
    chunkX,
    chunkY,
    chunkZ
   );
  }
 },

 syncRegionInAllThreads(regionX: number, regionY: number, regionZ: number) {
  for (const constructor of this.constructors) {
   DVEW.matrixCentralHub.syncRegionInThread(
    constructor.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 releaseRegionInAllThreads(regionX: number, regionY: number, regionZ: number) {
  for (const constructor of this.constructors) {
   DVEW.matrixCentralHub.releaseRegionInThread(
    constructor.name,
    regionX,
    regionY,
    regionZ
   );
  }
 },

 isReady() {
  if (!this.constructorsConnected) return false;
  if (this.constructorsConnected < this.numConstructors) return false;
  return true;
 },

 __handleCount() {
  let countReturn = this.count;
  this.count++;
  if (this.count >= this.numConstructors) {
   this.count = 0;
  }
  return countReturn;
 },

 requestFullChunkBeBuilt(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  LOD = 1
 ) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.buildChunk, [
   chunkX,
   chunkY,
   chunkZ,
   LOD,
  ]);
  return this.__handleCount();
 },
 runRGBLightUpdate(x: number, y: number, z: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.RGBlightUpdate, [x, y, z]);
  return this.__handleCount();
 },
 runRGBUpdate(x: number, y: number, z: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.RGBlightRemove, [x, y, z]);
  return this.__handleCount();
 },
 runSunLightForWorldColumn(x: number, z: number, maxY: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.fillWorldColumnWithSunLight, [
   x,
   z,
   maxY,
  ]);
  return this.__handleCount();
 },
 runSunFillAtMaxY(x: number, y: number, maxY: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.runSunLightUpdateAtMaxY, [
   x,
   y,
   maxY,
  ]);
  return this.__handleCount();
 },
 //Must send thread number returned from runSunFillAtMaxY
 runSunFillMaxYFlood(x: number, y: number, maxY: number, thread: number) {
  const comm = this.constructors[thread];
  comm.sendMessage(WorldToConstructorMessages.runSunLightUpdateMaxYFlood, [
   x,
   y,
   maxY,
  ]);
  return thread;
 },
 runSunLightUpdate(x: number, y: number, z: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.sunLightUpdate, [x, y, z]);
  return this.__handleCount();
 },
 runSunLightRemove(x: number, y: number, z: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.sunLightRemove, [x, y, z]);
  return this.__handleCount();
 },

 runFlow(x: number, y: number, z: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.runFlow, [x, y, z]);
  return this.__handleCount();
 },

 removeFlow(x: number, y: number, z: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.removeFlow, [x, y, z]);
  return this.__handleCount();
 },

 runGeneration(x: number, z: number, data: any) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.generate, [x, z, data]);
  return this.__handleCount();
 },

 constructEntity(
  x: number,
  y: number,
  z: number,
  width: number,
  depth: number,
  height: number,
  composed: number,
  voxelData: Uint32Array[],
  voxelStateData: Uint32Array[]
 ) {
  const comm = this.constructors[this.count];
  const transferArray: any[] = [];
  const dataArray: any[] = [];
  for (let i = 0; i < voxelData.length; i++) {
   dataArray.push(voxelData[i], voxelStateData[i]);
   transferArray.push(voxelData[i].buffer, voxelStateData[i].buffer);
  }

  comm.sendMessage(
   WorldToConstructorMessages.constructEntity,
   [x, y, z, width, depth, height, composed, ...transferArray],
   transferArray
  );
  return this.__handleCount();
 },

 constructItem(itemId: string, x: number, y: number, z: number) {
  const comm = this.constructors[this.count];
  comm.sendMessage(WorldToConstructorMessages.constructItem, [itemId, x, y, z]);
  return this.__handleCount();
 },
};

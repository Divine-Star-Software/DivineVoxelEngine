//types
import { VoxelSubstanceType } from "Meta/index";
//objects
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { QueuesIndexes } from "../../Shared/Queues.js";

export const QueuesManager = {
 _numChunksRebuilding: 0,

 _numRGBLightUpdates: 0,
 _numRGBLightRemoves: 0,

 _RGBLightRemoveQue: <number[][]>[],
 _RGBLightUpdateQue: <number[][]>[],

 _worldColumnSunLightPropMap: <
  Record<string, { max: number; thread: number }>
 >{},
 _worldColumnSunLightPropQue: <number[][]>[],

 _chunkRebuildQueMap: <
  Record<string, Record<VoxelSubstanceType | "all", boolean>>
 >{},
 _chunkRebuildQue: <number[][]>[],

 __statesSAB: new SharedArrayBuffer(4 * 8),
 __states: new Uint32Array(),

 $INIT() {
  this.__states = new Uint32Array(this.__statesSAB);
  DVEW.constructorCommManager.$INIT(this.__statesSAB);
 },

 addWorldColumnToSunLightQue(x: number, z: number) {
  const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(x, z);
  if (!this._worldColumnSunLightPropMap[worldColumnKey]) {
   this._worldColumnSunLightPropQue.push([x, z]);
   this._worldColumnSunLightPropMap[worldColumnKey] = { max: 0, thread: 0 };
  }
 },

 async runWorldColumnSunLightAndUpateQue() {
  const queue = this._worldColumnSunLightPropQue;
  let i = queue.length;
  //stage 1 fill with full sun light
  while (i--) {
   const position = queue[i];
   const x = position[0];
   const z = position[1];
   DVEW.worldData.fillWorldCollumnWithChunks(x, z);
   const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(x, z);
   const maxY = DVEW.worldData.getRelativeMaxWorldColumnHeight(x, z);
   Atomics.add(this.__states, QueuesIndexes.worldColumnSunLightProp, 1);
   DVEW.constructorCommManager.runSunLightForWorldColumn(x, z, maxY);
   this._worldColumnSunLightPropMap[worldColumnKey] = { max: maxY, thread: 0 };
  }
  i = queue.length;
  await this.awaitAllWorldColumnSunLightProp();
  //stage 2 flood down from maxY
  while (i--) {
   const position = queue[i];
   const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(
    position[0],
    position[1]
   );
   const data = this._worldColumnSunLightPropMap[worldColumnKey];
   const x = position[0];
   const z = position[1];
   data.thread = DVEW.constructorCommManager.runSunFillAtMaxY(x, z, data.max);
   Atomics.add(this.__states, QueuesIndexes.sunLgithUpdateMaxY, 1);
  }
  await this.awaitAllSunLightUpdatesAtMaxY();
 //stage 3 flood out from maxY
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;

   const worldColumnKey = DVEW.worldBounds.getWorldColumnKey(
    position[0],
    position[1]
   );
   const data = this._worldColumnSunLightPropMap[worldColumnKey];
   const x = position[0];
   const z = position[1];
   data.thread = DVEW.constructorCommManager.runSunFillMaxYFlood(x, z, data.max,data.thread);
   Atomics.add(this.__states, QueuesIndexes.sunLightMaxYFlood, 1);
  }
  this._worldColumnSunLightPropMap = {};
  this._worldColumnSunLightPropQue = [];
  await this.awaitAllSunLightUpdatesMaxYFlood();
 },

 awaitAllWorldColumnSunLightProp() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager.areWorldColumnSunLightUpdatsDone();
   },
   checkInterval: 1,
  });
 },
 areWorldColumnSunLightUpdatsDone() {
  return (
   Atomics.load(this.__states, QueuesIndexes.worldColumnSunLightProp) == 0
  );
 },
 awaitAllSunLightUpdatesAtMaxY() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager.areAllSunLightUpdatesAtMaxYDone();
   },
   checkInterval: 1,
  });
 },
 areAllSunLightUpdatesAtMaxYDone() {
  return Atomics.load(this.__states, QueuesIndexes.sunLgithUpdateMaxY) == 0;
 },

 awaitAllSunLightUpdatesMaxYFlood() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager.areAllSunLightUpdatesMaxYFloodDone();
   },
   checkInterval: 1,
  });
 },
 areAllSunLightUpdatesMaxYFloodDone() {
  return Atomics.load(this.__states, QueuesIndexes.sunLightMaxYFlood) == 0;
 },

 awaitAllSunLightUpdates() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager.areAllSunLightUpdatesDone();
   },
   checkInterval: 1,
  });
 },
 areAllSunLightUpdatesDone() {
  return Atomics.load(this.__states, QueuesIndexes.sunLightUpdate) == 0;
 },

 addToRGBUpdateQue(x: number, y: number, z: number) {
  this._RGBLightUpdateQue.push([x, y, z]);
 },

 addToRGBRemoveQue(x: number, y: number, z: number) {
  this._RGBLightRemoveQue.push([x, y, z]);
 },

 runRGBUpdateQue() {
  const queue = this._RGBLightUpdateQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   Atomics.add(this.__states, QueuesIndexes.RGBLightUpdate, 1);
   DVEW.constructorCommManager.runRGBFloodFillAt(
    position[0],
    position[1],
    position[2]
   );
  }
  this._RGBLightUpdateQue = [];
 },

 runRGBRemoveQue() {
  const queue = this._RGBLightRemoveQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   Atomics.add(this.__states, QueuesIndexes.RGBLightRemove, 1);
   DVEW.constructorCommManager.runRGBFloodRemoveAt(
    position[0],
    position[1],
    position[2]
   );
  }
  this._RGBLightRemoveQue = [];
 },

 awaitAllRGBLightUpdates() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager.areRGBLightUpdatesAllDone();
   },
   checkInterval: 1,
  });
 },
 awaitAllRGBLightRemove() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager.areRGBLightRemovesAllDone();
   },
   checkInterval: 1,
  });
 },

 areRGBLightUpdatesAllDone() {
  return Atomics.load(this.__states, QueuesIndexes.RGBLightUpdate) == 0;
 },
 areRGBLightRemovesAllDone() {
  return Atomics.load(this.__states, QueuesIndexes.RGBLightRemove) == 0;
 },

 addToRebuildQue(
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

 runRebuildQue() {
  const queue = this._chunkRebuildQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   DVEW.buildChunk(position[0], position[1], position[2]);
  }
  this._chunkRebuildQue = [];
  this._chunkRebuildQueMap = {};
 },

 awaitAllChunksToBeBuilt() {
  return DVEW.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager._numChunksRebuilding == 0;
   },
   checkInterval: 1,
  });
 },
};

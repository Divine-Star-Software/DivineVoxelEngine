//types
import { VoxelSubstanceType } from "Meta/index";
//objects
import { DVEW } from "../DivineVoxelEngineWorld.js";

export const QueuesManager = {
 _numChunksRebuilding: 0,

 _numRGBLightUpdates: 0,
 _numRGBLightRemoves: 0,

 _RGBLightRemoveQue: <number[][]>[],
 _RGBLightUpdateQue: <number[][]>[],

 _worldColumnSunLightPropMap: <Record<string, boolean>>{},
 _worldColumnSunLightPropQue: <number[][]>[],

 _chunkRebuildQueMap: <
  Record<string, Record<VoxelSubstanceType | "all", boolean>>
 >{},
 _chunkRebuildQue: <number[][]>[],

 __statesSAB: new SharedArrayBuffer(4 * 4),
 __states: new Uint32Array(),
 __stateIndexes: {
  RGBLightUpdate: 0,
  RGBLightRemove: 1,
  worldColumnSunLightProp: 2,
  sunLightUpdate: 3,
  sunLightRemove: 4,
 },

 $INIT() {
  this.__states = new Uint32Array(this.__statesSAB);
  DVEW.propagationCommManager.$INIT(this.__statesSAB);
 },

 addWorldColumnToSunLightQue(x: number, z: number) {
  const worldColumnKey = `${x}-${z}`;
  if (!this._worldColumnSunLightPropMap[worldColumnKey]) {
   this._worldColumnSunLightPropQue.push([x, z]);
   this._worldColumnSunLightPropMap[worldColumnKey] = true;
  }
 },

 runWorldColumnSunLightQue() {
  const queue = this._worldColumnSunLightPropQue;
  while (queue.length != 0) {
   const position = queue.shift();
   if (!position) break;
   Atomics.add(this.__states, this.__stateIndexes.worldColumnSunLightProp, 1);
   DVEW.propagationCommManager.runSunLightForWorldColumn(
    position[0],
    position[1]
   );
  }
  this._worldColumnSunLightPropMap = {};
  this._worldColumnSunLightPropQue = [];
 },

 areWorldColumnSunLightUpdatsDone() {
  return (
   Atomics.load(this.__states, this.__stateIndexes.worldColumnSunLightProp) == 0
  );
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
   Atomics.add(this.__states, this.__stateIndexes.RGBLightUpdate, 1);
   DVEW.propagationCommManager.runRGBFloodFillAt(
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
   Atomics.add(this.__states, this.__stateIndexes.RGBLightRemove, 1);
   DVEW.propagationCommManager.runRGBFloodRemoveAt(
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
  return Atomics.load(this.__states, this.__stateIndexes.RGBLightUpdate) == 0;
 },
 areRGBLightRemovesAllDone() {
  return Atomics.load(this.__states, this.__stateIndexes.RGBLightRemove) == 0;
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

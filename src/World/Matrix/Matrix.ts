import type { ChunkData } from "Meta/World/WorldData/Chunk.types";
import { DVEW } from "../DivineVoxelEngineWorld.js";
import { Util } from "../../Global/Util.helper.js";
import { MatrixRegionData } from "Meta/Matrix/Matrix.types.js";

/**# Matrix
 * ---
 * Holds all shared array buffer.
 */
export const Matrix = {
 //two minutes
 updateDieTime: 120000,
 worldBounds: Util.getWorldBounds(),
 regions: <Record<string, MatrixRegionData>>{},

 isChunkInMatrix(x: number, y: number, z: number) {
  if (!this.isRegionInMatrix(x, y, z)) return false;
  return (
   this.regions[this.worldBounds.getChunkKeyFromPosition(x, y, z)] !== undefined
  );
 },

 isRegionInMatrix(x: number, y: number, z: number) {
  return (
   this.regions[this.worldBounds.getRegionKeyFromPosition(x, y, z)] !==
   undefined
  );
 },

 isChunkLocked(x: number, y: number, z: number) {
  const chunkData = this.getMatrixChunkData(x, y, z);
  if (!chunkData) return false;
  return Atomics.load(chunkData.chunkStates, 0) == 1;
 },

 lockChunk(x: number, y: number, z: number) {
  const chunkData = this.getMatrixChunkData(x, y, z);
  if (!chunkData) return false;
  Atomics.store(chunkData.chunkStates, 0, 1);
  return true;
 },

 unLockChunk(x: number, y: number, z: number) {
  const chunkData = this.getMatrixChunkData(x, y, z);
  if (!chunkData) return false;
  Atomics.store(chunkData.chunkStates, 0, 0);
  return true;
 },

 updateChunkData(
  x: number,
  y: number,
  z: number,
  run: (chunk: ChunkData) => {}
 ): false | Promise<boolean> {
  const chunk = DVEW.worldData.getChunk(x, y, z);
  if (!chunk) {
   return false;
  }
  if (!this.isChunkInMatrix(x, y, z)) {
   run(chunk);
  }
  return Util.createPromiseCheck({
   check: () => {
    return !this.isChunkLocked(x, y, z);
   },
   onReady: () => {
    run(chunk);
   },
   checkInterval: 10,
   failTimeOut: this.updateDieTime,
   onFail: () => {
    const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
    console.warn(`The chunk ${chunkKey} could not be updated in time.`);
   },
  });
 },

 releaseChunk(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regions[regionKey]) return;
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  if (!this.regions[regionKey].chunks[chunkKey]) return false;
  delete this.regions[regionKey].chunks[chunkKey];
  return true;
 },

 createMatrixChunkData(
  x: number,
  y: number,
  z: number
 ): SharedArrayBuffer[] | false {
  const chunk = DVEW.worldData.getChunk(x, y, z);
  if (!chunk) return false;
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  const chunkStateSAB = new SharedArrayBuffer(1);
  if (!this.regions[regionKey]) {
   this.regions[regionKey] = {
    chunks: {},
    threadsLoadedIn: {},
   };
  }
  this.regions[regionKey].chunks[chunkKey] = {
   chunkStates: new Uint8Array(chunkStateSAB),
   chunkStatesSAB: chunkStateSAB,
   voxelsSAB: chunk.voxelsSAB,
   voxelsStatesSAB: chunk.voxelsStatesSAB,
   heightMapSAB: chunk.heightMapSAB,
   minMaxMapSAB : chunk.minMaxMapSAB
  };
  return [
   chunk.voxelsSAB,
   chunk.voxelsStatesSAB,
   chunk.heightMapSAB,
   chunk.minMaxMapSAB,
   chunkStateSAB,
  ];
 },

 getMatrixChunkData(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regions[regionKey]) return false;
  const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
  if (!this.regions[regionKey].chunks[chunkKey]) return false;
  return this.regions[regionKey].chunks[chunkKey];
 },

 getMatrixRegionData(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regions[regionKey]) return false;
  return this.regions[regionKey];
 },

 addRegionToMatrix(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regions[regionKey]) {
   this.regions[regionKey] = {
    chunks: {},
    threadsLoadedIn: {},
   };
  }
  return this.regions[regionKey];
 },

 removeRegionFromMatrix(x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regions[regionKey]) return false;
  delete this.regions[regionKey];
 },

 deleteThreadFromRegion(threadId: string, x: number, y: number, z: number) {
  const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
  if (!this.regions[regionKey]) return false;
  if (!this.regions[regionKey].threadsLoadedIn[threadId]) return false;
  delete this.regions[regionKey].threadsLoadedIn[threadId];
 },
};

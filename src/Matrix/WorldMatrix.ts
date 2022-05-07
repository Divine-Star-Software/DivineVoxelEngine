import { WorldRegionPalette } from "Meta/WorldData/World.types.js";
import { Flat3DArray } from "../Global/Util/Flat3DArray.js";
import { VoxelByte } from "../Global/Util/VoxelByte.js";
import { WorldBounds } from "../Global/WorldBounds/WorldBounds.js";

/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export class WorldMatrix {
 _3dArray = new Flat3DArray();
 worldBounds = WorldBounds;
 voxelByte = new VoxelByte();

 //two minutes
 updateDieTime = 120000;
 loadDieTime = 10000;

 regionXPow2 = 9;
 regionZPow2 = 9;
 regionYPow2 = 8;

 regions: Record<
  string,
  {
   palette?: WorldRegionPalette;
   chunks: Record<
    string,
    {
     voxels: Uint32Array;
     chunkStates: Uint8Array;
    }
   >;
  }
 > = {};

 chunks: Record<string, Uint32Array> = {};
 chunkStates: Record<string, Uint8Array> = {};

 paletteMode = 0;
 globalVoxelPalette: Record<number, string> = {};
 globalVoxelPaletteRecord: Record<string, string[]> = {};
 regionVoxelPalettes: Record<string, Record<number, string>> = {};

 threadName = "";
 constructor() {}

 syncChunkBounds(): void {
  this.worldBounds.syncBoundsWithFlat3DArray(this._3dArray);
 }

 /**# Await Chunk Load
  * ---
  * Wait for a chunk to loaded into the matrix  for use.
  */
 awaitChunkLoad(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  timeout = this.loadDieTime
 ) {
  return new Promise((resolve, reject) => {
   let inte = 0;
   const failTimeout = setTimeout(() => {
    clearInterval(inte);
    console.warn(
     `${this.threadName} could not load the chunk ${chunkX}-${chunkY}-${chunkZ} in time.`
    );
    reject(false);
   }, timeout);
   inte = setInterval(() => {
    if (this.getChunk(chunkX, chunkY, chunkZ)) {
     clearTimeout(failTimeout);
     resolve(true);
    }
   }, 10);
  });
 }

 __setGlobalVoxelPalette(
  palette: Record<number, string>,
  record: Record<string, string[]>
 ) {
  this.globalVoxelPalette = palette;
  this.globalVoxelPaletteRecord = record;
 }

 __syncRegionData(
  x: number,
  y: number,
  z: number,
  palette: WorldRegionPalette
 ) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const region = this.regions[`${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`];
  region.palette = palette;
 }

 __removeRegionVoxelPalette(regionX: number, regionY: number, regionZ: number) {
  if (!this.regionVoxelPalettes[`${regionX}-${regionZ}-${regionY}`])
   return false;
  delete this.regionVoxelPalettes[`${regionX}-${regionZ}-${regionY}`];
 }

 getVoxel(x: number, y: number, z: number) {
  let palette = this.globalVoxelPalette;
  let record = this.globalVoxelPaletteRecord;

  if (this.paletteMode == 1) {
   const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
   const region = this.regions[`${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`];
   if (region && region?.palette) {
    palette = region.palette.palette;
    record = region.palette.record;
   } else {
    return false;
   }
  }

  const numericVoxelId = this.getVoxelNumberID(x, y, z);
  if (!numericVoxelId) return false;

  if (numericVoxelId == 0) return ["dve:air"];
  const paletteId = palette[numericVoxelId];
  return record[paletteId];
 }

 _createRegion(x: number, y: number, z: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const region = {
   chunks: {},
  };
  this.regions[`${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`] = region;
  return region;
 }

 /**# Set Chunk
  * ---
  * To be only called by the Matrix Hub.
  */
 __setChunk(
  x: number,
  y: number,
  z: number,
  chunkSAB: SharedArrayBuffer,
  chunkStateSAB: SharedArrayBuffer
 ) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  let region = this.regions[`${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`];
  if (!region) {
   region = this._createRegion(x, y, z);
  }
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  region.chunks[`${chunkPOS.x}-${chunkPOS.z}-${chunkPOS.y}`] = {
   voxels: new Uint32Array(chunkSAB),
   chunkStates: new Uint8Array(chunkStateSAB),
  };
 }

 /**# Remove Chunk
  * ---
  * To be only called by the Matrix Hub.
  */
 __removeChunk(x: number, y: number, z: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  let region = this.regions[`${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`];
  if (!region) return false;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  delete region.chunks[`${chunkPOS.x}-${chunkPOS.z}-${chunkPOS.y}`];
 }

 getChunk(x: number, y: number, z: number) {
  const regionPOS = this.worldBounds.getRegionPosition(x, y, z);
  const region = this.regions[`${regionPOS.x}-${regionPOS.z}-${regionPOS.y}`];
  if (!region) return false;
  const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
  const chunk = region.chunks[`${chunkPOS.x}-${chunkPOS.z}-${chunkPOS.y}`];
  if (!chunk) return false;
  return chunk;
 }

 isChunkLocked(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  return Atomics.load(chunk.chunkStates, 0) == 1;
 }

 lockChunk(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  Atomics.store(chunk.chunkStates, 0, 1);
  return true;
 }

 unLockChunk(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  Atomics.store(chunk.chunkStates, 0, 0);
  return true;
 }

 updateChunkData(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  run: (chunk: { voxels: Uint32Array; chunkStates: Uint8Array }) => {}
 ): false | Promise<boolean> {
  const chunk = this.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) {
   return false;
  }
  const prom: Promise<boolean> = new Promise((resolve, reject) => {
   if (!this.isChunkLocked(chunkX, chunkY, chunkZ)) {
    this.lockChunk(chunkX, chunkY, chunkZ);
    run(chunk);
    this.unLockChunk(chunkX, chunkY, chunkZ);
    resolve(true);
   } else {
    const inte = setInterval(() => {
     if (!this.isChunkLocked(chunkX, chunkY, chunkZ)) {
      this.lockChunk(chunkX, chunkY, chunkZ);
      run(chunk);
      this.unLockChunk(chunkX, chunkY, chunkZ);
      resolve(true);
     }
    }, 1);
    setTimeout(() => {
     clearInterval(inte);
     resolve(false);
    }, this.updateDieTime);
   }
  });
  return prom;
 }

 setData(x: number, y: number, z: number, data: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return false;
  const voxelPOS = this.worldBounds.getVoxelPosition(
   x,
   y,
   z,
   this.worldBounds.getChunkPosition(x, y, z)
  );
  this._3dArray.setValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels,
   data
  );
 }

 getData(x: number, y: number, z: number) {
  const chunk = this.getChunk(x, y, z);
  if (!chunk) return -1;
  const voxelPOS = this.worldBounds.getVoxelPosition(
   x,
   y,
   z,
   this.worldBounds.getChunkPosition(x, y, z)
  );
  return this._3dArray.getValue(
   voxelPOS.x,
   voxelPOS.y,
   voxelPOS.z,
   chunk.voxels
  );
 }
 getVoxelNumberID(x: number, y: number, z: number) {
  const rawVoxelData = this.getData(x, y, z);
  if (rawVoxelData < 0) return false;
  return this.voxelByte.getId(rawVoxelData);
 }
}

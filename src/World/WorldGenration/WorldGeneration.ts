//types
import { ChunkData } from "Meta/World/WorldData/Chunk.types";
import { WorldRegion } from "Meta/World/WorldData/World.types.js";
//objects
import { Util } from "../../Global/Util.helper.js";
import { VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";

/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export const WorldGeneration = {
 heightByte: Util.getHeightByte(),
 chunkReader: Util.getChunkReader(),
 voxelPalette: VoxelPaletteManager,

 getBlankRegion(): WorldRegion {
  return {
   chunks: {},
  };
 },

 createChunkFromDataThread(data: any[]): ChunkData {
  return {
   buffer: data[0],
   data: new DataView(data[0]),
  };
 },

 createChunkFromServer(data: ArrayBuffer): ChunkData {
  const sab = new SharedArrayBuffer(data.byteLength);
  const temp = new Uint8Array(data);
  const temp2 = new Uint8Array(sab);
  temp2.set(temp, 0);
  const dv = new DataView(sab);
  return {
   buffer: sab,
   data: dv,
  };
 },

 getBlankChunk(empty: boolean = true, proto: boolean = true): ChunkData {
  const chunkSAB = new SharedArrayBuffer(this.chunkReader.chunkByteSize);
  const data = new DataView(chunkSAB);
  this.heightByte.initalizeChunk(data);
  return {
   buffer: chunkSAB,
   data: data,
  };
 },
};

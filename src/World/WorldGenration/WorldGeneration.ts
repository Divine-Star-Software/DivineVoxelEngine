//types
import { ChunkData } from "Meta/Chunks/Chunk.types";
import { WorldRegion } from "Meta/World/WorldData/World.types.js";
//objects
import { Util } from "../../Global/Util.helper.js";
import { VoxelPaletteManager as VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";

/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export const WorldGeneration = {
 worldBounds: Util.getWorldBounds(),
 voxelByte: Util.getVoxelByte(),
 heightByte: Util.getHeightByte(),
 voxelPalette: VoxelPaletteManager,

 paintVoxel(voxelPalletId: number) {
  return this.voxelByte.setId(voxelPalletId, 0);
 },

 getBlankRegion(palette: boolean = false): WorldRegion {
  let paletteData = {};
  if (palette) {
   paletteData = {
    count: 0,
    map: {},
    record: {},
   };
  }
  return {
   chunks: {},
   ...paletteData,
  };
 },
 
 getBlankChunk(empty: boolean = true, proto: boolean = true): ChunkData {
  const chunkSAB = new SharedArrayBuffer(this.worldBounds.chunkTotalVoxels * 4);
  const chunkVoxels = new Uint32Array(chunkSAB);
  const chunkStatesSAB = new SharedArrayBuffer(
   this.worldBounds.chunkTotalVoxels * 4
  );
  const chunkStatesVoxels = new Uint32Array(chunkSAB);
  const heightMapSAB = new SharedArrayBuffer(
   this.worldBounds.chunkArea * 4 * 2
  );
  const heightMap = new Uint32Array(heightMapSAB);
  let i = heightMap.length;
  let startingValue = this.heightByte.getStartingHeightMapValue();
  while (i--) {
   heightMap[i] = startingValue;
  }

  const minMaxMapSAB = new SharedArrayBuffer(4 * 2);
  const minMaxMap = new Uint32Array(minMaxMapSAB);

  return {
   proto: 0,
   voxelsSAB: chunkSAB,
   voxels: chunkVoxels,
   voxelsStatesSAB: chunkStatesSAB,
   voxelsStates: chunkStatesVoxels,
   heightMapSAB: heightMapSAB,
   heightMap: heightMap,
   minMaxMapSAB: minMaxMapSAB,
   minMaxMap: minMaxMap,
   isEmpty: empty,
   position: [],
  };
 },
};

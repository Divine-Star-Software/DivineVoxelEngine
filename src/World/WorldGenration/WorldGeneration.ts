import { VoxelByte } from "Global/Util/VoxelByte.js";
import { ChunkData } from "Meta/Chunks/Chunk.types";
import { WorldRegion } from "Meta/WorldData/World.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteManager as VoxelPaletteManager } from "./VoxelPalettes/VoxelPaletteHelper.js";

/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export class WorldGeneration {
 chunkDataHelper: ChunkDataHelper;
 illumantionManager: IlluminationManager;
 voxelPalette: VoxelPaletteManager;
 voxelByte: VoxelByte;

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.illumantionManager = new IlluminationManager(this.DVEW);
  this.chunkDataHelper = new ChunkDataHelper(this.DVEW);
  this.voxelPalette = new VoxelPaletteManager(this.DVEW);
  this.voxelByte = this.DVEW.UTIL.getVoxelByte();
 }

 paintVoxel(voxelPalletId: number) {
  return this.voxelByte.setId(voxelPalletId, 0);
 }

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
   ...{
    chunks: {},
    ...paletteData,
   },
  };
 }

 getBlankChunk(
  empty: boolean = true,
  palette: boolean = false,
  proto: boolean = true
 ): ChunkData {
  let paletteData = {};
  if (palette) {
   paletteData = {
    count: 0,
    map: {},
    record: {},
   };
  }
  const chunkSAB = new SharedArrayBuffer(
   this.DVEW.worldBounds.chunkTotalVoxels * 4
  );
  const chunkVoxels = new Uint32Array(chunkSAB);
  return {
   ...{
    proto: proto,
    voxelsSAB: chunkSAB,
    voxels: chunkVoxels,
    maxMinHeight: [],
    heightMap: [],
    isEmpty: empty,
    ...paletteData,
   },
  };
 }
}

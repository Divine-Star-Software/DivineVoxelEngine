import { ChunkData } from "Meta/Chunks/Chunk.types";
import type { WorldGenerationInterface } from "Meta/World/WorldGeneration/WorldGeneration.interface";
import type { VoxelPalette } from "Meta/WorldData/World.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";

/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export class WorldGeneration implements WorldGenerationInterface {
 globalVoxelPaletteIndex = 1;
 globalVoxelPalette: VoxelPalette = {};
 globalVoxelPaletteMap: Record<string, number> = {};

 chunkDataHelper: ChunkDataHelper;
 illumantionManager: IlluminationManager;

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.illumantionManager = new IlluminationManager(this.DVEW);
  this.chunkDataHelper = new ChunkDataHelper(this.DVEW);
 }

 getVoxelIdFromGlobalPalette(id: string): number {
  return this.globalVoxelPaletteMap[id];
 }

 addToGlobalVoxelPalette(id: string, voxleStateData: any[]) {
  this.globalVoxelPalette[this.globalVoxelPaletteIndex] = voxleStateData;
  this.globalVoxelPaletteMap[id] = this.globalVoxelPaletteIndex;
  this.globalVoxelPaletteIndex++;
 }

 getGlobalVoxelPalette() {
  return this.globalVoxelPalette;
 }

 getBlankChunk(empty: boolean = true, voxels: number[][][] = []): ChunkData {
  return {
   ...{
    voxels: voxels,
    maxMinHeight: [],
    heightMap: [],
    isEmpty: empty,
   },
  };
 }
}

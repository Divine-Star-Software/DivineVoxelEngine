import { ChunkData } from "Meta/Chunks/Chunk.types";
import type { WorldGenerationInterface } from "Meta/World/WorldGeneration/WorldGeneration.interface";
import type { VoxelPalette } from "Meta/WorldData/World.types";

/**# World Generation
 * ---
 * Helps with creating the needed format for each chunk.
 */
export class WorldGeneration implements WorldGenerationInterface {
 globalVoxelPaletteIndex = 1;
 globalVoxelPalette: VoxelPalette = {};
 globalVoxelPaletteMap: Record<string, number> = {};

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

 getBlankChunk(empty : boolean = true,voxels : number[][][] = []): ChunkData {
  return {...{
   voxels: voxels,
   maxMinHeight: [],
   heightMap: [],
   isEmpty: empty,
  }};
 }
}

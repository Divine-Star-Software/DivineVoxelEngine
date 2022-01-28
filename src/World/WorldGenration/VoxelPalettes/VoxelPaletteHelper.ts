import type { ChunkData } from "Meta/Chunks/Chunk.types";
import { WorldGeneration } from "../WorldGeneration";

/**# Voxel Palette Helper
 * ---
 * Used to help decode voxel ids and states from per-chunk voxel palettes.
 */
export class VoxelPaletteHelper {
 constructor(private worldGeneration: WorldGeneration) {}

 getVoxelData(chunk: ChunkData, voxelId: number): string[] | false {
  if (!chunk.palette) return false;
  const palette = chunk.palette;
  const id = palette.record[voxelId];
  return this.worldGeneration.perChunkVoxelRecord[id];
 }
 getVoxelPaletteId(
  chunk: ChunkData,
  voxelId: string,
  voxelState: string
 ): number | false {
  if (!chunk.palette) return false;
  const palette = chunk.palette;
  return palette.map[`${voxelId}:${voxelState}`];
 }
 addToChunksVoxelPalette(
  chunk: ChunkData,
  voxelId: string,
  voxelState: string
 ) {
  if (!chunk.palette) return false;
  const palette = chunk.palette;
  const id = `${voxelId}:${voxelState}`;
  palette.record[palette.count] = id;
  palette.map[id] = palette.count;
  palette.count++;
  return true;
 }
}

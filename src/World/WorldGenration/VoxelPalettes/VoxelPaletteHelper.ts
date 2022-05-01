import type { ChunkData } from "Meta/Chunks/Chunk.types";
import { VoxelInteface } from "Meta/Voxels/Voxel.types";
import { WorldRegion } from "Meta/WorldData/World.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { WorldGeneration } from "../WorldGeneration";

/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from per-region voxel palettes.
 */
export class VoxelPaletteManager {
 globalVoxelPaletteIndex = 1;
 perRegionVoxelRecord: Record<string, string[]> = {};
 perChunkVoxelRecord: Record<string, string[]> = {};
 globalVoxelPalette: Record<number, string> = {};
 globalVoxelPaletteMap: Record<string, number> = {};
 globalVoxelPaletteRecord: Record<string, string[]> = {};

 constructor(private DVEW: DivineVoxelEngineWorld) {}

 /**# Get Vooxel Id From Global Palette
  * ---
  * Gets the number id for use of actual world generation.
  * This is what is actually stored in the chunk voxels.
  * @param voxelTrueId
  * @param voxelStateId
  * @returns
  */
 getVoxelPaletteIdFromGlobalPalette(
  voxelTrueId: string,
  voxelStateId: string
 ): number {
  return this.globalVoxelPaletteMap[`${voxelTrueId}:${voxelStateId}`];
 }
 /**# Get Voxel True Id From Global Palette
  * ---
  * Returns the string id and state from the global voxel palette.
  * @param voxelId
  * @param voxelStateId
  * @returns
  */
 getVoxelDataFromGlobalPalette(voxelId: number): string[] {
  const id = this.globalVoxelPalette[voxelId];
  return this.globalVoxelPaletteRecord[id];
 }

 registerVoxelForGlobalPalette(voxel: VoxelInteface) {
  const defaultId = `${voxel.data.id}:default`;
  this.globalVoxelPalette[this.globalVoxelPaletteIndex] = defaultId;
  this.globalVoxelPaletteMap[`${voxel.data.id}:default`] =
   this.globalVoxelPaletteIndex;
  this.globalVoxelPaletteIndex++;
  this.globalVoxelPaletteRecord[defaultId] = [voxel.data.id, "default"];
  if (voxel.data.states) {
   for (const state of voxel.data.states) {
    const stateID = `${voxel.data.id}:${state}`;
    this.globalVoxelPalette[this.globalVoxelPaletteIndex] = stateID;
    this.globalVoxelPaletteRecord[stateID] = [voxel.data.id, state];
    this.globalVoxelPaletteMap[`${voxel.data.id}:${state}`] =
     this.globalVoxelPaletteIndex;
    this.globalVoxelPaletteIndex++;
   }
  }
 }


 registerVoxelForPerRegionVoxelPalette(voxel: VoxelInteface) {
  const defaultId = `${voxel.data.id}:default`;
  this.perRegionVoxelRecord[defaultId] = [voxel.data.id, "default"];
  if (voxel.data.states) {
   for (const state of voxel.data.states) {
    const stateID = `${voxel.data.id}:${state}`;
    this.perRegionVoxelRecord[stateID] = [voxel.data.id, state];
   }
  }
 }

 getGlobalVoxelPalette() {
  return this.globalVoxelPalette;
 }
/**# Get Global Voxel Palette Record
 * ---
 * Returns a record that maps voxel ids and states to already split array of values.
 */
 getGlobalVoxelPaletteRecord() {
    return this.globalVoxelPaletteRecord;
}

 getVoxelDataFromRegion(
  region: WorldRegion,
  voxelId: number
 ): string[] | false {
  if (!region.palette) return false;
  const palette = region.palette;
  const id = palette.record[voxelId];
  return this.perChunkVoxelRecord[id];
 }
 getVoxelPaletteIdFromRegion(
  region: WorldRegion,
  voxelId: string,
  voxelState: string
 ): number | false {
  if (!region.palette) return false;
  const palette = region.palette;
  return palette.map[`${voxelId}:${voxelState}`];
 }
 addToRegionsVoxelPalette(
  region: WorldRegion,
  voxelId: string,
  voxelState: string
 ): number {
  if (!region.palette) return 0;
  const palette = region.palette;
  const id = `${voxelId}:${voxelState}`;
  palette.record[palette.count] = id;
  palette.map[id] = palette.count;
  palette.count++;
  return palette.count - 1;
 }
}

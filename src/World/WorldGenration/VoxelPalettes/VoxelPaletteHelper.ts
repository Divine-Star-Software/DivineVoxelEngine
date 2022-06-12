import type { VoxelData } from "Meta/Voxels/Voxel.types";
import type { WorldRegion } from "Meta/World/WorldData/World.types";

/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from per-region voxel palettes.
 */
export const VoxelPaletteManager = {
 globalVoxelPaletteIndex : 2,
 perRegionVoxelRecord: <Record<string, string[]>>{},
 globalVoxelPalette: <Record<number, string>>{},
 globalVoxelPaletteMap: <Record<string, number>>{},
 globalVoxelPaletteRecord: <Record<string, string[]>>{},

 /**# Get Vooxel Id From Global Palette
  * ---
  * Gets the number id for use of actual world generation.
  * This is what is actually stored in the chunk voxels.
  */
 getVoxelPaletteIdFromGlobalPalette(
  voxelTrueId: string,
  voxelStateId: string
 ): number {
  return this.globalVoxelPaletteMap[`${voxelTrueId}:${voxelStateId}`];
 },
 /**# Get Voxel True Id From Global Palette
  * ---
  * Returns the string id and state from the global voxel palette.
  */
 getVoxelDataFromGlobalPalette(voxelId: number): string[] {
  const id = this.globalVoxelPalette[voxelId];
  return this.globalVoxelPaletteRecord[id];
 },

 registerVoxelForGlobalPalette(voxel: VoxelData) {
  const defaultId = `${voxel.id}:default`;
  this.globalVoxelPalette[this.globalVoxelPaletteIndex] = defaultId;
  this.globalVoxelPaletteMap[`${voxel.id}:default`] =
   this.globalVoxelPaletteIndex;
  this.globalVoxelPaletteIndex++;
  this.globalVoxelPaletteRecord[defaultId] = [voxel.id, "default"];
  if (voxel.states) {
   for (const state of voxel.states) {
    const stateID = `${voxel.id}:${state}`;
    this.globalVoxelPalette[this.globalVoxelPaletteIndex] = stateID;
    this.globalVoxelPaletteRecord[stateID] = [voxel.id, state];
    this.globalVoxelPaletteMap[`${voxel.id}:${state}`] =
     this.globalVoxelPaletteIndex;
    this.globalVoxelPaletteIndex++;
   }
  }
 },

 registerVoxelForPerRegionVoxelPalette(voxel: VoxelData) {
  const defaultId = `${voxel.id}:default`;
  this.perRegionVoxelRecord[defaultId] = [voxel.id, "default"];
  if (voxel.states) {
   for (const state of voxel.states) {
    const stateID = `${voxel.id}:${state}`;
    this.perRegionVoxelRecord[stateID] = [voxel.id, state];
   }
  }
 },

 getGlobalVoxelPalette() {
  return this.globalVoxelPalette;
 },
 /**# Get Global Voxel Palette Record
  * ---
  * Returns a record that maps voxel ids and states to already split array of values.
  */
 getGlobalVoxelPaletteRecord() {
  return this.globalVoxelPaletteRecord;
 },

 getVoxelDataFromRegion(
  region: WorldRegion,
  voxelId: number
 ): string[] | false {
  if (!region.palette) return false;
  const palette = region.palette;
  const stringId = palette.palette[voxelId];
  return palette.record[stringId];
 },
 getVoxelPaletteIdFromRegion(
  region: WorldRegion,
  voxelId: string,
  voxelState: string
 ): number | false {
  if (!region.palette) return false;
  const palette = region.palette;
  return palette.map[`${voxelId}:${voxelState}`];
 },
 addToRegionsVoxelPalette(
  region: WorldRegion,
  voxelId: string,
  voxelState: string
 ): number {
  if (!region.palette) return 0;
  const palette = region.palette;
  const id = `${voxelId}:${voxelState}`;
  palette.record[palette.count] = [id, voxelState];
  palette.map[id] = palette.count;
  palette.palette[palette.count] = id;
  palette.count++;
  return palette.count - 1;
 },
};

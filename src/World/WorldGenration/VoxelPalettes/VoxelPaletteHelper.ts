import type { VoxelData } from "Meta/Voxels/Voxel.types";

/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from voxel palettes.
 */
export const VoxelPaletteManager = {
 voxelPaletteCount: 2,
 voxelPalette: <Record<number, string>>{},
 voxelPaletteMap: <Record<string, number>>{},
 voxelPaletteRecord: <Record<string, string[]>>{},

 /**# Get Vooxel Id From Global Palette
  * ---
  * Gets the number id for use of actual world generation.
  * This is what is actually stored in the chunk voxels.
  */
 getVoxelPaletteId(voxelId: string, voxelState: string): number {
  return this.voxelPaletteMap[`${voxelId}:${voxelState}`];
 },
 /**# Get Voxel True Id From Global Palette
  * ---
  * Returns the string id and state from the global voxel palette.
  */
 getVoxelData(voxelId: number): string[] {
  const id = this.voxelPalette[voxelId];
  return this.voxelPaletteRecord[id];
 },

 registerVoxel(voxel: VoxelData) {
  this._register(voxel.id, "default");
  if (voxel.states) {
   for (const state of voxel.states) {
    this._register(voxel.id, state);
   }
  }
 },

 _register(id: string, stateId: string) {
  const newId = `${id}:${stateId}`;
  this.voxelPalette[this.voxelPaletteCount] = newId;
  this.voxelPaletteMap[newId] = this.voxelPaletteCount;
  this.voxelPaletteRecord[newId] = [id, stateId];
  this.voxelPaletteCount++;
 },

 getVoxelPartentId(id: number) {
  const mainData = this.getVoxelData(id);
  return this.getVoxelPaletteId(mainData[0], "default");
 },

 isVoxelIdAState(id: number) {
  const mainData = this.getVoxelData(id);
  return mainData[0] != "default";
 },

 getVoxelPalette() {
  return this.voxelPalette;
 },
 getVoxelPaletteMap() {
  return this.voxelPaletteMap;
 },
 /**# Get Global Voxel Palette Record
  * ---
  * Returns a record that maps voxel ids and states to already split array of values.
  */
 getVoxelPaletteRecord() {
  return this.voxelPaletteRecord;
 },
};

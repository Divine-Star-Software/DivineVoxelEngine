import { VoxelPalette, VoxelPaletteMap } from "Meta/Data/WorldData.types";

export const VoxelPaletteReader = {
 _palette: <Record<number, string>>{
  0: "dve_air",
  1: "dve_barrier",
 },
 _map: <Record<string, number>>{
  "dve_air": 0,
  "dve_barrier": 1,
 },

 setVoxelPalette(voxelPalette: VoxelPalette, voxelPaletteMap: VoxelPaletteMap) {
  this._palette = voxelPalette;
  this._map = voxelPaletteMap;
 },
 id: {
  stringFromNumber(id: number) {
   return VoxelPaletteReader._palette[id];
  },
  numberFromString(id: string) {
   return VoxelPaletteReader._map[id];
  },
  getPaletteId(voxelId: string, voxelState: number) {
   const numericID = VoxelPaletteReader._map[voxelId];
   const stateId = voxelState + numericID;
   if (VoxelPaletteReader._palette[stateId] != voxelId) {
    throw new Error(
     `${voxelState} is not a valid state for voxel with id : ${voxelId}`
    );
   }
   if (stateId) {
    return stateId;
   }
   return -1;
  },
  baseNumeric(id: number) {
   if (id < 2) return id;
   const paletteId = VoxelPaletteReader._palette[id];
   return VoxelPaletteReader._map[paletteId];
  },
 },
};

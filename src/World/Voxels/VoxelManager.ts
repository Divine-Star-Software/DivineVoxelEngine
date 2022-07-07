import { VoxelHooks, VoxelData } from "Meta/Voxels/Voxel.types";
import { DVEW } from "../DivineVoxelEngineWorld.js";
export const VoxelManager = {
 voxels: <Record<string, VoxelData>>{},
 shapeMap: <Record<string, number>>{},
 shapeMapHasBeenSet: false,

 fluidShapeMap: <Record<string, number>>{},
 fluidShapeMapHasBeenSet: false,

 getVoxel(id: string): VoxelData {
  return this.voxels[id];
 },

 registerVoxelData(voxel: VoxelData) {
  this.voxels[voxel.id] = voxel;
  DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(voxel);
 },

 getCurrentVoxelSize() {
  const data = JSON.stringify(this.voxels);
  return new Blob([data]).size;
 },

 runVoxelHookForAll(hook: VoxelHooks) {
  /*   for (const voxelID of Object.keys(this.voxels)) {
   const voxel = this.voxels[voxelID];
   if (!voxel.hooks[hook]) continue;
   voxel.hooks[hook]();
  } */
 },
};

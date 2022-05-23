import { VoxelHooks, VoxelData } from "Meta/Voxels/Voxel.types";

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
 },
 runVoxelHookForAll(hook: VoxelHooks) {
  /*   for (const voxelID of Object.keys(this.voxels)) {
   const voxel = this.voxels[voxelID];
   if (!voxel.hooks[hook]) continue;
   voxel.hooks[hook]();
  } */
 },
};

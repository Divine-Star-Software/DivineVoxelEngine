import { VoxelData } from "Meta/index";

export const VoxelManager = {
 voxelData: <Record<string, VoxelData>>{},

 getVoxelData(id: string) {
  const voxelData = this.voxelData[id];
  if (!voxelData) {
   throw new Error(`Voxel with ${id} does not exists.`);
  }
  return voxelData;
 },

 registerVoxelData(data: VoxelData) {
  this.voxelData[data.id] = data;
 },
};

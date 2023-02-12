import type { VoxelData } from "../../../Meta/Data/Voxels/Voxel.types";


export const VoxelManager = {
 voxelData: <Map<string, VoxelData>>new Map(),
 getVoxelData(id: string) {
  const voxelData = this.voxelData.get(id);
  if (!voxelData) {
   throw new Error(`Voxel with ${id} does not exists.`);
  }
  return voxelData;
 },
 registerVoxelData(data: VoxelData | VoxelData[]) {
  if (Array.isArray(data)) {
   for (const voxel of data) {
    this.voxelData.set(voxel.id, voxel);
   }
   return;
  }
  this.voxelData.set(data.id, data);
 },
};

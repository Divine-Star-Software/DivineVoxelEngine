import { VoxelData } from "Meta/index";

export const VoxelManager = {
 voxelData: <Record<string, VoxelData>>{},
 _onRegister: (data: VoxelData) => {},
 getVoxelData(id: string) {
  const voxelData = this.voxelData[id];
  if (!voxelData) {
   throw new Error(`Voxel with ${id} does not exists.`);
  }
  return voxelData;
 },

 registerVoxelData(data: VoxelData) {
  this.voxelData[data.id] = data;
  this._onRegister(data);
 },

 onRegister(func: (data: VoxelData) => void) {
  this._onRegister = func;
 },
};

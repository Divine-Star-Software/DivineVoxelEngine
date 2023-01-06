//types
import { VoxelConstructor } from "../../../Meta/Constructor/Voxel.types.js";
import type { VoxelHooks } from "Meta/Data/Voxels/Voxel.types";
//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";

export const VoxelManager = {
 voxelObjects: <Record<string, VoxelConstructor>>{},

 getVoxel(id: string): VoxelConstructor {
  return this.voxelObjects[id];
 },

 registerVoxel(voxel: VoxelConstructor) {
  this.voxelObjects[voxel.id] = voxel;
 },

 runVoxelHookForAll(hook: VoxelHooks) {
  for (const voxelID of Object.keys(this.voxelObjects)) {
   const voxel = this.voxelObjects[voxelID];
   if (!voxel.hooks[hook]) continue;
   voxel.hooks[hook](DVEC.builder as any);
  }
 },
 removeVoxelHookForAll(hook: VoxelHooks) {
  for (const voxelID of Object.keys(this.voxelObjects)) {
   const voxel = this.voxelObjects[voxelID];
   if (!voxel.hooks[hook]) continue;
   delete voxel.hooks[hook];
  }
 },
};

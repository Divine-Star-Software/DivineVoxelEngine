//types
import type {
 VoxelHooks,
 VoxelBuilderThreadObject,
 VoxelData,
} from "Meta/Voxels/Voxel.types";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";

export const VoxelManager = {
 voxelObjects: <Record<string, VoxelBuilderThreadObject>>{},
 setShapeMap(shapeMap: Record<string, number>) {
  for (const voxelId of Object.keys(this.voxelObjects)) {
   const voxel = this.voxelObjects[voxelId];
   voxel.trueShapeId = shapeMap[voxel.data.shapeId];
  }
 },

 getVoxel(id: string): VoxelBuilderThreadObject {
  return this.voxelObjects[id];
 },

 getVoxelData(id: string): VoxelData {
  return this.voxelObjects[id].data;
 },

 registerVoxel(voxel: VoxelBuilderThreadObject) {
  this.voxelObjects[voxel.data.id] = voxel;
 },

 runVoxelHookForAll(hook: VoxelHooks) {
  for (const voxelID of Object.keys(this.voxelObjects)) {
   const voxel = this.voxelObjects[voxelID];
   if (!voxel.hooks[hook]) continue;
   voxel.hooks[hook](DVEC.DVEB as any);
  }
 },
};

//types
import type {
 VoxelHooks,
 VoxelConstructorObject,
 VoxelData,
} from "Meta/Data/Voxels/Voxel.types";
//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";

export const VoxelManager = {
 voxelObjects: <Record<string, VoxelConstructorObject>>{},
 */*  
 syncData() {
  for (const voxelId of Object.keys(this.voxelObjects)) {
   const trueId = DVEC.worldMatrix.getVoxelPaletteId(voxelId,0);
   const shapeId = DVEC.worldMatrix.
   voxel.trueShapeId = shapeMap[voxel.data.shapeId];
  }
 },
 */

 syncShapeData() {},

 getVoxel(id: string): VoxelConstructorObject {
  return this.voxelObjects[id];
 },

 registerVoxel(voxel: VoxelConstructorObject) {
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

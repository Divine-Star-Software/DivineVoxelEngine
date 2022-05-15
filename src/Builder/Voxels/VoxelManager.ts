//types
import type {
 VoxelHooks,
 VoxelBuilderThreadObject,
} from "Meta/Voxels/Voxel.types";
//objects
import { DVEB } from "../DivineVoxelEngineBuilder.js";

export const VoxelManager = {
 voxelObjects: <Record<string, VoxelBuilderThreadObject>>{},
 shapeMap: <Record<string, number>>{},
 shapeMapHasBeenSet: false,

 fluidShapeMap: <Record<string, number>>{},
 fluidShapeMapHasBeenSet: false,

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  this.shapeMapHasBeenSet = true;
  for (const voxelId of Object.keys(this.voxelObjects)) {
   const voxel = this.voxelObjects[voxelId];
   voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
  }
 },

 shapMapIsSet() {
  return this.shapeMapHasBeenSet;
 },

 fluidShapMapIsSet() {
  return this.fluidShapeMapHasBeenSet;
 },

 getVoxel(id: string): VoxelBuilderThreadObject {
  return this.voxelObjects[id];
 },

 registerVoxel(voxel: VoxelBuilderThreadObject) {
  this.voxelObjects[voxel.data.id] = voxel;
 },

 runVoxelHookForAll(hook: VoxelHooks) {
  for (const voxelID of Object.keys(this.voxelObjects)) {
   const voxel = this.voxelObjects[voxelID];
   if (!voxel.hooks[hook]) continue;
   voxel.hooks[hook](DVEB);
  }
 },
};

import type { DivineVoxelEngineBuilder  } from "index";
import { VoxelHooks, VoxelData,VoxelBuilderThreadObject } from "Meta/Voxels/Voxel.types";

export class VoxelManager  {
 voxelObjects: Record<string, VoxelBuilderThreadObject> = {};
 shapeMap: Record<string, number> = {};
 shapeMapHasBeenSet = false;

 fluidShapeMap: Record<string, number> = {};
 fluidShapeMapHasBeenSet = false;

 constructor(private DVEB: DivineVoxelEngineBuilder) {}

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  this.shapeMapHasBeenSet = true;
 }

 setFluidShapeMap(shapeMap: Record<string, number>) {
  this.fluidShapeMap = shapeMap;
  this.fluidShapeMapHasBeenSet = true;
 }

 shapMapIsSet() {
  return this.shapeMapHasBeenSet;
 }

 fluidShapMapIsSet() {
  return this.fluidShapeMapHasBeenSet;
 }

 getVoxel(id: string): VoxelBuilderThreadObject {
  return this.voxelObjects[id];
 }


 registerVoxel(voxel: VoxelBuilderThreadObject) {
  this.voxelObjects[voxel.data.id] = voxel;
 }


}

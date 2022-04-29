import type { DivineVoxelEngineBuilder  } from "index";
import { VoxelHooks, VoxelData,VoxelInteface } from "Meta/World/Voxels/Voxel.types";

export class VoxelManager  {
 voxelData: Record<string, VoxelData> = {};
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

 getVoxel(id: string): VoxelData {
  return this.voxelData[id];
 }


 registerVoxelData(voxel: VoxelData) {
  this.voxelData[voxel.id] = voxel;
 }


}

import { VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/World/Voxels/VoxelManager.interface";

export class VoxelManager implements VoxelManagerInterface {
 voxels: Record<string, VoxelInteface> = {};
 shapeMap: Record<string, number> = {};
 shapeMapHasBeenSet = false;

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  this.shapeMapHasBeenSet = true;

  for (const voxelId of Object.keys(this.voxels)) {
   const voxel = this.voxels[voxelId];
   voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
  }
 }

 shapMapIsSet() {
  return this.shapeMapHasBeenSet;
 }

 getVoxel(id: string): VoxelInteface {
  return this.voxels[id];
 }

 registerVoxelData(voxel: VoxelInteface) {
  this.voxels[voxel.data.id] = voxel;
 }
}

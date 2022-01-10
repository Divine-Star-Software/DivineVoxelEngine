import { VoxelInteface } from "Meta/Voxels/Voxel.types";
import { VoxelHelper } from "../VoxelHelper";

export class DVEVoxel1 implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelper) {}

 data = {
  name: "Voxel 1",
  shapeId: 0,
  id: "dve:voxel",
 };
 hooks = {};

 getShapeId(voxelData: any[]): number {
     return this.data.shapeId;
 }

 getUVs(
  uvs: number[],
  voxelExposedFaceEncodedBit: number,
  voxelData: any[]
 ): void {
  if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
   uvs.push(2);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")
  ) {
   uvs.push(2);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")
  ) {
    uvs.push(2);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")
  ) {
    uvs.push(2);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")
  ) {
    uvs.push(2);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")
  ) {
    uvs.push(2);
  }
 }
}

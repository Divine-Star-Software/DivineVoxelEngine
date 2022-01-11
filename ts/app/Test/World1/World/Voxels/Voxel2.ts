import {
 VoxelData,
 VoxelInteface,
} from "Meta/Contents/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/Contents/World/Voxels/VoxelHelper.interface";

export class DVEVoxel2 implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}

 data: VoxelData = {
  name: "Voxel 2",
  shapeId: 0,
  id: "dve:voxel2",
  substance: "solid",
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
  const uv = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-top"
  );
  if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")
  ) {
   uvs.push(uv);
  }
 }
}

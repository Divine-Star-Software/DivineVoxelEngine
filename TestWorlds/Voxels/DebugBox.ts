import type {
  VoxelData,
  VoxelInteface,
 } from "../../out/Meta/World/Voxels/Voxel.types";
 import type { VoxelHelperInterface } from "../../out/Meta/World/Voxels/VoxelHelper.interface";
 

export class DebugBox implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data  = <VoxelData>{
  name: "Debug Box",
  shapeId: 0,
  id: "dve:debugbox",
  substance:  "solid",
  defaultState : ["dve:debugbox",0]
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
  let topUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "top"
  );
  let bottomUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "bottom"
  );
  let northUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "north"
  );
  let southUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "south"
  );
  let eastUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "east"
  );
  let westUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "west"
  );

  if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
   uvs.push(topUV);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")
  ) {
   uvs.push(bottomUV);
  }
  if (
    this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")
   ) {
    uvs.push(eastUV);
   }
  if (
    this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")
   ) {
    uvs.push(westUV);
   }
   if (
    this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")
   ) {
    uvs.push(southUV);
   }
   if (
    this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")
   ) {
    uvs.push(northUV);
   }
 



 }
}

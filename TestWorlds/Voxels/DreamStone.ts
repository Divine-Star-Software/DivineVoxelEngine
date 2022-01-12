import type {
 VoxelData,
 VoxelInteface,
} from "../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../out/Meta/World/Voxels/VoxelHelper.interface";

export class Dreamestone implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data  = <VoxelData>{
   name: "Dream Stone",
   shapeId: 0,
   id: "dve:dreamstone",
   substance:  "solid",
   defaultState : ["dve:dreamstone",0]
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
   "dreamstone",
   "grassy-top"
  );
  let bottomUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone"
  );
  let sideUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-side"
  );

  if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
   uvs.push(topUV);
  } else {
   sideUV = bottomUV;
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")
  ) {
   uvs.push(bottomUV);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")
  ) {
   uvs.push(sideUV);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")
  ) {
   uvs.push(sideUV);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")
  ) {
   uvs.push(sideUV);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")
  ) {
   uvs.push(sideUV);
  }
 }
}

import type {
 VoxelAOCalcData,
 VoxelData,
 VoxelInteface,
 VoxelLightCalcData,
} from "../../../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../../../out/Meta/World/Voxels/VoxelHelper.interface";

export class DreamGrassBlock implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Dream Grass Block",
  shapeId: "Box",
  id: "dve:dreamgrassblock",
  substance: "solid",
  defaultState: ["dve:dreamgrassblock", 0],
 };
 hooks = {};
 trueShapeId = 0;

 getShapeId(voxelData: any[]): number {
  return this.trueShapeId;
 }

 getUVs(
  uvs: number[],
  chunkX: number,
  chunkZ: number,
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

 getAO(data: VoxelAOCalcData): void {
  this.voxelHelper.calculateVoxelAO(data, this);
 }
 getLight(data: VoxelLightCalcData): void {
  this.voxelHelper.calculateVoxelLight(data, this);
 }
}

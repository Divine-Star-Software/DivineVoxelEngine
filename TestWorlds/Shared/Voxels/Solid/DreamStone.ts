import type {
 VoxelAOCalcData,
 VoxelData,
 VoxelInteface,
 VoxelLightCalcData,
 VoxelProcessData,
} from "../../../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../../../out/Meta/World/Voxels/VoxelHelper.interface";

export class Dreamestone implements VoxelInteface {
 topUV: number;
 bottomUV: number;
 sideUV: number;

 data = <VoxelData>{
  name: "Dream Stone",
  shapeId: "Box",
  id: "dve:dreamstone",
  substance: "solid",
  defaultState: ["dve:dreamstone", 0],
 };
 hooks = {};
 trueShapeId = 0;

 constructor(public voxelHelper: VoxelHelperInterface) {
  this.topUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-top"
  );
  this.bottomUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone"
  );
  this.sideUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-side"
  );
 }

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
  return;
 }
 getAO(data: VoxelAOCalcData): void {
   return;
 }
 getLight(data: VoxelLightCalcData): void {
   return;
 }
 process(data: VoxelProcessData): void {
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

  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topUV);
  } else {
   sideUV = bottomUV;
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(bottomUV);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(sideUV);
  }
  this.voxelHelper.processVoxelLight(data, this);
  return;
 }
}

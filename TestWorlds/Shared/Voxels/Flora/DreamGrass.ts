import type {
 VoxelAOCalcData,
 VoxelData,
 VoxelInteface,
 VoxelLightCalcData,
 VoxelProcessData,
} from "../../../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../../../out/Meta/World/Voxels/VoxelHelper.interface";

export class DreamGrass implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Dream Grass ",
  shapeId: "FullBoxDiagonalIntersection",
  id: "dve:dreamgrass",
  substance: "flora",
  defaultState: ["dve:dreamgrass", 0],
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
   "flora",
   "dreamgrass"
  );

  uvs.push(uv, uv);
 }

 getAO(data: VoxelAOCalcData): void {
  data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
 }
 getLight(data: VoxelLightCalcData): void {
  this.voxelHelper.calculateVoxelLight(data, this);
 }
 process(data: VoxelProcessData): void {
  if (data.exposedFaces[0]) {
   data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
  }
  if (data.exposedFaces[1]) {
   data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
  }
  if (data.exposedFaces[2]) {
   data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
  }
  if (data.exposedFaces[3]) {
   data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
  }
  if (data.exposedFaces[4]) {
   data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
  }
  if (data.exposedFaces[5]) {
   data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
  }
 }
}

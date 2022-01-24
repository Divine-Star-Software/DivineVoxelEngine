import type {
 VoxelAOCalcData,
 VoxelData,
 VoxelInteface,
 VoxelLightCalcData,
 VoxelProcessData,
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
  return;
 }

 getAO(data: VoxelAOCalcData): void {
  //this.voxelHelper.calculateVoxelAO(data, this);
 }
 getLight(data: VoxelLightCalcData): void {
  //this.voxelHelper.calculateVoxelLight(data, this);
 }
 process(data: VoxelProcessData): void {
  const uv = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-top"
  );

  if (data.exposedFaces[0]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(uv);
  }
  this.voxelHelper.processVoxelLight(data, this);
 }
}

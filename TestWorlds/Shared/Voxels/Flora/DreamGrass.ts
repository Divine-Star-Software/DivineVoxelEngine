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
    return;
 }
 getLight(data: VoxelLightCalcData): void {
    return;
 }
 process(data: VoxelProcessData): void {
  const uv = this.voxelHelper.textureManager.getTextureUV(
   "flora",
   "dreamgrass"
  );

  data.uvTemplate.push(uv, uv);
  data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
  this.voxelHelper.calculateVoxelLight(data, this);
 }
}

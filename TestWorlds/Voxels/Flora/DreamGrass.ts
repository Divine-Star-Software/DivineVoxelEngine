import type {
    VoxelAOCalcData,
 VoxelData,
 VoxelInteface,
} from "../../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../../out/Meta/World/Voxels/VoxelHelper.interface";

export class DreamGrass implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Dream Grass ",
  shapeId: "FullBoxCross",
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
    data.aoTemplate.push(1,1,1,1,1,1,1,1);
 }
}

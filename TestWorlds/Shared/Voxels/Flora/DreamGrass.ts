import type {
 VoxelData,
 VoxelInteface,
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

 process(data: VoxelProcessData): void {
  const uv = this.voxelHelper.textureManager.getTextureUV(
   "flora",
   "dreamgrass"
  );

  data.shapeTemplate.push(this.trueShapeId);
  data.uvTemplate.push(uv, uv);
  data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
  this.voxelHelper.calculateVoxelLight(data, this);
 }
}

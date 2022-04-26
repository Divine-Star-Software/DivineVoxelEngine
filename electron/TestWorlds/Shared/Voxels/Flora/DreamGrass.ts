import type {
 VoxelData,
 VoxelInteface,
 VoxelProcessData,
 VoxelHelperInterface
} from "../../../../out/Meta/index.js";
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
  const uv = this.voxelHelper.DVEW.textureManager.getTextureUV(
   "flora",
   "dreamgrass"
  );
  data.shapeStateTemplate.push(0);
  data.shapeTemplate.push(this.trueShapeId);
  data.uvTemplate.push(uv, uv);
  data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
  this.voxelHelper.calculateVoxelLight(data, this);
 }
}

import type {
 VoxelData,
 VoxelInteface,
 VoxelProcessData,
 VoxelHelperInterface,
} from "../../../../../out/Meta/index.js";

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

 process(data: VoxelProcessData): void {
  const uv = this.voxelHelper.DVEW.textureManager.getTextureUV(
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

  data.shapeTemplate.push(this.trueShapeId);
  data.shapeStateTemplate.push(0);
  this.voxelHelper.processVoxelLight(data, this);
 }
}

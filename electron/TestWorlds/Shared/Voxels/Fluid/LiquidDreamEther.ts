import type {
 VoxelData,
 VoxelInteface,
 VoxelProcessData,
 VoxelHelperInterface,
} from "../../../../out/Meta/index.js";

export class LiquidDreamEther implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Liquid Dream Ether",
  shapeId: "FluidSourceBlock",
  id: "dve:liquiddreamether",
  substance: "fluid",
  defaultState: ["dve:liquiddreamether", 0],
 };
 hooks = {};
 trueShapeId = 0;

 process(data: VoxelProcessData): void {
  const uv = this.voxelHelper.DVEW.textureManager.getTextureUV(
   "fluid",
   "liquid-dream-ether",
   "still-1"
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
  data.shapeStateTemplate.push(0);
  data.shapeTemplate.push(this.trueShapeId);
  this.voxelHelper.calculateVoxelLight(data, this);
 }
}

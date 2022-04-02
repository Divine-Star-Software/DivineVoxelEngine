import type {
 VoxelData,
 VoxelInteface,
 VoxelProcessData,
 VoxelHelperInterface,
} from "../../../../out/Meta/index.js";

export class DebugBox implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Debug Box",
  shapeId: "Box",
  id: "dve:debugbox",
  substance: "solid",
  defaultState: ["dve:debugbox", 0],
  lightSource: true,
  lightValue: 0b1111_1111_1111_1111,
 };
 trueShapeId = 0;
 hooks = {};

 process(data: VoxelProcessData): void {
  let topUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "top"
  );
  let bottomUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "bottom"
  );
  let northUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "north"
  );
  let southUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "south"
  );
  let eastUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "east"
  );
  let westUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "debug",
   "west"
  );

  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topUV);
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(bottomUV);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(westUV);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(eastUV);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(northUV);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(southUV);
  }

  data.shapeTemplate.push(this.trueShapeId);
  data.shapeStateTemplate.push(0);
  this.voxelHelper.processVoxelLight(data, this);
 }
}

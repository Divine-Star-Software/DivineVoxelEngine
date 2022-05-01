import type { VoxelBuilderThreadObject } from "../../../../../out/Meta/index.js";
import { DreamGrassVoxelData } from "./DreamGrass.voxel.data.js";

export const DreamGrassVoxelBuilderThread: VoxelBuilderThreadObject = {
 data: DreamGrassVoxelData,
 trueShapeId: 1,
 hooks: {},
 process: function (data, DVEB) {
  const uv = DVEB.textureManager.getTextureUV(
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
  DVEB.voxelHelper.processVoxelLight(data, this.data);
 },
};

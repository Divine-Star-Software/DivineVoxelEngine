import type { VoxelBuilderThreadObject } from "../../../../../out/Meta/index.js";
import { DreamGrassBlockVoxelData } from "./DreamGrassBlock.voxel.data.js";

export const DreamGrassBlockVoxelBuilderThread: VoxelBuilderThreadObject = {
 data: DreamGrassBlockVoxelData,
 trueShapeId: 1,
 hooks: {},
 process: function (data, DVEB) {
  const uv = DVEB.textureManager.getTextureUV(
   "flora",
   "dreamgrassblock",
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
  DVEB.processor.processVoxelLight(data, this.data);
 },
};

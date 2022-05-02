import type { VoxelBuilderThreadObject } from "../../../../../out/Meta/index.js";
import { DreamGrassVoxelData } from "./DreamGrass.voxel.data.js";

export const DreamGrassVoxelBuilderThread: VoxelBuilderThreadObject = {
 data: DreamGrassVoxelData,
 trueShapeId: 1,
 hooks: {},
 process: function (data, DVEB) {
  const uv = DVEB.textureManager.getTextureUV("flora", "dreamgrass");
  data.shapeStateTemplate.push(0);
  data.shapeTemplate.push(this.trueShapeId);
  data.uvTemplate.push(uv, uv);
  data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
  DVEB.voxelHelper.calculateVoxelLight(data, this.data);
 },
};

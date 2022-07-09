import type { VoxelConstructorObject } from "../../../../../out/Meta/index.js";
import { DreamGrassVoxelData } from "./DreamGrass.voxel.data.js";

export const DreamGrassVoxelBuilderThread: VoxelConstructorObject = {
 data: DreamGrassVoxelData,
 trueShapeId: 1,
 hooks: {},
 process: function (data, DVEB) {
  const uv = DVEB.textureManager.getTextureUV("flora", "dreamgrass");
  data.shapeStateTemplate.push(0);
  data.shapeTemplate.push(this.trueShapeId);
  data.uvTemplate.push(uv, uv);
  data.overlayUVTemplate.push(0, 0, 0, 0);
  const lightValue = DVEB.processor.worldMatrix.getLight(
   data.x + data.chunkX,
   data.y + data.chunkY,
   data.z + data.chunkZ
  );
  data.aoTemplate.push(1, 1);
  data.lightTemplate.push(lightValue, lightValue);
  //data.lightTemplate.push(0xf, 0xf);
 },
};

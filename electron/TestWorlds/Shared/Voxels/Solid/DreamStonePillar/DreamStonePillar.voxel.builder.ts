import type { VoxelBuilderThreadObject } from "../../../../../out/Meta/index.js";
import { DreamStonePillarVoxelData } from "./DreamStonePillar.voxel.data.js";

export const DreamStonePillarVoxelBuilderThread: VoxelBuilderThreadObject = {
 data: DreamStonePillarVoxelData,
 trueShapeId: 1,
 hooks: {},
 process: function (data, DVEB) {
  let topBottomUV = DVEB.textureManager.getTextureUV(
   "solid",
   "dreamstone-pillar",
   "top"
  );
  let sideUV = DVEB.textureManager.getTextureUV("solid", "dreamstone-pillar");
  let sideTopUV = DVEB.textureManager.getTextureUV(
   "solid",
   "dreamstone-pillar",
   "side-top"
  );
  /*   let sideBottom = DVEB.textureManager.getTextureUV(
   "solid",
   "dreamstone-pillar",
   "side-bottom"
  );
 */

  if (
   //@ts-ignore
   !DVEB.processor.worldMatrix.sameVoxel(
    data.x + data.chunkX,
    data.y + data.chunkY,
    data.z + data.chunkZ,
    data.x + data.chunkX,
    data.y + data.chunkY + 1,
    data.z + data.chunkZ
   )
  ) {
   sideUV = sideTopUV;
  }
  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topBottomUV);
   sideUV = sideTopUV;
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(topBottomUV);
  }
  if (data.exposedFaces[0] && data.exposedFaces[1]) {
   sideUV = topBottomUV;
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(sideUV);
  }

  data.shapeTemplate.push(this.trueShapeId);
  data.shapeStateTemplate.push(0);
  DVEB.processor.processVoxelLight(data);
 },
};

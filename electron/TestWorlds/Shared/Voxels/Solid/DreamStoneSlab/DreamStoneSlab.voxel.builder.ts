import type { VoxelConstructorObject } from "../../../../../out/Meta/index.js";
import { DreamStoneSlabVoxelData } from "./DreamStoneSlab.voxel.data.js";

export const DreamStoneSlabVoxelBuilderThread: VoxelConstructorObject = {
 data: DreamStoneSlabVoxelData,
 trueShapeId: 1,
 hooks: {},
 process:function (data, DVEB)  {
  let topUV = DVEB.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-top"
  );
  let bottomUV = DVEB.textureManager.getTextureUV("solid", "dreamstone");
  let sideUV = DVEB.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-side"
  );

  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topUV);
   data.overlayUVTemplate.push(0);
  } else {
   sideUV = bottomUV;
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(bottomUV);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0,0,0,0);
  }


  
  DVEB.processor.processVoxelLight(data);
  return;
 },
};

import type { VoxelConstructorObject } from "../../../../../out/Meta/index.js";
import { DreamGrassBlockVoxelData } from "./DreamGrassBlock.voxel.data.js";

export const DreamGrassBlockVoxelBuilderThread: VoxelConstructorObject = {
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
   const ouv = DVEB.textureManager.getTextureUV(
    "flora",
    "dreamgrass-overlay",
    false,
    true
   );
 
   data.overlayUVTemplate.push(ouv);
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0,0,0,0);
  }
  data.shapeTemplate.push(this.trueShapeId);
  
  DVEB.processor.processVoxelLight(data);
 },
};

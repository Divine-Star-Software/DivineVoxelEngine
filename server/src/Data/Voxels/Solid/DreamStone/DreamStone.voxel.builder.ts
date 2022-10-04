import type { VoxelConstructorObject } from "dve/Meta/index.js";
const uvs: number[] = [];
export const DreamStoneVoxelBuilderThread: VoxelConstructorObject = {
 id: "dve:dreamstone",
 
 hooks: {
  texturesRegistered: (DVEB) => {
   uvs.push(
    DVEB.textureManager.getTextureUV("solid", "dreamstone", "grassy-top"),
    DVEB.textureManager.getTextureUV("solid", "dreamstone"),
    DVEB.textureManager.getTextureUV("solid", "dreamstone", "grassy-side")
   );
  },
 },
 process: function (data, DVEB) {
  let topUV = uvs[0];
  let bottomUV = uvs[1];
  let sideUV = uvs[2];
  if (data.voxelState == 1) {
   sideUV = bottomUV;
   topUV = bottomUV;
  }

  
  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topUV);
  } else {
   sideUV = bottomUV;
  }
  if (data.voxelState == 1) {
   sideUV = bottomUV;
  }
  
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(bottomUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }

  DVEB.processor.processVoxelLight(data);
  return;
 },
};

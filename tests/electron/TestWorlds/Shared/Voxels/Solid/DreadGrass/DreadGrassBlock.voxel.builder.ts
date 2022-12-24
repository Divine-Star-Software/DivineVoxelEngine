import type { VoxelConstructorObject } from "out/Meta/index.js";let uv = 0;
export const DreadGrassBlockVoxelBuilderThread: VoxelConstructorObject = {
 id: "dve_dreadgrassblock",
 
 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV(
    "flora",
    "dreamgrassblock",
    "grassy-top"
   );
  },
 },
 process: function (data, DVEB) {
  if (data.exposedFaces[0]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(uv);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }

  DVEB.processor.processVoxelLight(data);
 },
};

import type { VoxelConstructor } from "../../../../../out/Meta/Constructor/Voxel.types";
let uv = 0;
export const DreamVineVoxelBuilderThread: VoxelConstructor = {
 id: "dve_dreamvine",

 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV("flora", "dream-vine");
  },
 },
 process(templater) {
    templater
     .addUV(uv, 2)
     .addOverlayUVs([0], 2)
     .addCurrentLightValue(2)
     .addAOValue(1, 2);
   },
};

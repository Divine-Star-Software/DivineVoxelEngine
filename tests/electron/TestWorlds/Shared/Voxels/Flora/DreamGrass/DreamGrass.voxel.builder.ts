import type { VoxelConstructor } from "../../../../../out/Meta/Constructor/Voxel.types";
let uv = 0;
export const DreamGrassVoxelBuilderThread: VoxelConstructor = {
 id: "dve_dreamgrass",

 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV("flora", "dreamgrass");
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

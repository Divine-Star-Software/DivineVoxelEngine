import { VoxelConstructor } from "../../../../../out/Meta/Constructor/Voxel.types";
let uv = 0;
export const DreamLogVoxelBuilderThread: VoxelConstructor = {
 id: "dve_dream-log",

 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV("solid", "dream-log");
  },
 },
 process: function (templater) {
  if (templater.isFaceExpposed("top")) {
   templater.addUV(uv).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("bottom")) {
   templater.addUV(uv).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("east")) {
   templater.addUV(uv).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("west")) {
   templater.addUV(uv).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("south")) {
   templater.addUV(uv).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("north")) {
   templater.addUV(uv).addOverlayUVs([0]);
  }
  templater.processVoxelLight();
 },
};

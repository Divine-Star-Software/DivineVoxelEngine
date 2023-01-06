import { VoxelConstructor } from "../../../../../out/Meta/Constructor/Voxel.types";
const uvs: number[] = [];
export const DreadStoneVoxelBuilderThread: VoxelConstructor = {
 id: "dve_dreadstone",

 hooks: {
  texturesRegistered: (DVEB) => {
   uvs.push(
    DVEB.textureManager.getTextureUV("solid", "dreadstone", "grassy-top"),
    DVEB.textureManager.getTextureUV("solid", "dreadstone"),
    DVEB.textureManager.getTextureUV("solid", "dreadstone", "grassy-side")
   );
  },
 },
 process(templater) {
  let topUV = uvs[0];
  let bottomUV = uvs[1];
  let sideUV = uvs[2];

  if (templater.currentVoxel.getState() == 1) {
   sideUV = bottomUV;
   topUV = bottomUV;
  }
  //top
  if (templater.isFaceExpposed("top")) {
   templater.addUV(topUV).addOverlayUVs([0]);
  } else {
   sideUV = bottomUV;
  }

  if (templater.isFaceExpposed("bottom")) {
   templater.addUV(bottomUV).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("east")) {
   templater.addUV(sideUV).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("west")) {
   templater.addUV(sideUV).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("south")) {
   templater.addUV(sideUV).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("north")) {
   templater.addUV(sideUV).addOverlayUVs([0]);
  }
  templater.processVoxelLight();
 },
};

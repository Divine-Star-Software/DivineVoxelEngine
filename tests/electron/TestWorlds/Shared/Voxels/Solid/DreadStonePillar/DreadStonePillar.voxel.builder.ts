import type { VoxelConstructor } from "../../../../../out/Meta/Constructor/Voxel.types";
const uvs: number[] = [];
export const DreadStonePillarVoxelBuilderThread: VoxelConstructor = {
 id: "dve_dreadstonepillar",

 hooks: {
  texturesRegistered: (DVEB) => {
   uvs.push(
    DVEB.textureManager.getTextureUV("solid", "dreadstone-pillar", "top"),
    DVEB.textureManager.getTextureUV("solid", "dreadstone-pillar"),
    DVEB.textureManager.getTextureUV("solid", "dreadstone-pillar", "side-top")
   );
  },
 },
 process(templater) {
  let topBottomUV = uvs[0];
  let sideUV = uvs[1];
  let sideTopUV = uvs[2];
  if (
   !templater.currentVoxel.isSameVoxel(
    templater.currentVoxel.x,
    templater.currentVoxel.y + 1,
    templater.currentVoxel.z
   )
  ) {
   sideUV = sideTopUV;
  }

  let topExposed = false;
  let bottomExposed = false;
  if (templater.isFaceExpposed("top")) {
   templater.addUV(topBottomUV).addOverlayUVs([0]);
   sideUV = sideTopUV;
   topExposed = true;
  }
  if (templater.isFaceExpposed("bottom")) {
   templater.addUV(topBottomUV).addOverlayUVs([0]);
   bottomExposed = true;
  }
  if (topExposed && bottomExposed) {
   sideUV = topBottomUV;
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

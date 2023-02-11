import type { DivineVoxelEngineConstructor } from "../../../out/Constructor/DivineVoxelEngineConstructor";
export function GetMarkerBox(DVEC: DivineVoxelEngineConstructor) {
 const textures: number[] = [];
 DVEC.hooks.texturesRegistered.addToRun((textureMangager) => {
  for (let i = 0; i < 16; i++) {
   textures.push(
    textureMangager.getTextureUV(["#dve_solid", "light-debug", `light-level-${i}`])
   );
  }
 });

 return DVEC.voxelManager.registerVoxel({
  id: "dve_markerbox",
  process(templater) {
   const uv = textures[templater.currentVoxel.getState()];

   if (templater.isFaceExpposed("top")) {
    templater.addUV(textures[uv]).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("bottom")) {
    templater.addUV(textures[uv]).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("east")) {
    templater.addUV(textures[uv]).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("west")) {
    templater.addUV(textures[uv]).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("south")) {
    templater.addUV(textures[uv]).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("north")) {
    templater.addUV(textures[uv]).addOverlayUVs([0]);
   }
   templater.processVoxelLight();
  },
 });
}

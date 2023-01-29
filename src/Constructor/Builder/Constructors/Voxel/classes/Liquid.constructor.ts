import { ConstructorHooks } from "../../../../Hooks/ConstructorHooks.js";
import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types";

import { VoxelTemplater } from "../../../Tools/VoxelTemplater.js";
export class LiquidVoxelConstructor implements VoxelConstructor {
 textures: [still: number, flowing: number];
 ignoreAO = true;
 constructor(
  public id: string,
  textures: [ConstructorTextureData, ConstructorTextureData]
 ) {
  ConstructorHooks.texturesRegistered.addToRun((textureManager) => {
   this.textures = [
    textureManager.getTextureUV(textures[0]),
    textureManager.getTextureUV(textures[1]),
   ];
  });
 }
 process(templater: typeof VoxelTemplater) {
  const [still, flowing] = this.textures;
  if (templater.isFaceExpposed("top")) {
   templater.addUV(still).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("bottom")) {
   templater.addUV(still).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("east")) {
   templater.addUV(flowing).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("west")) {
   templater.addUV(flowing).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("south")) {
   templater.addUV(flowing).addOverlayUVs([0]);
  }
  if (templater.isFaceExpposed("north")) {
   templater.addUV(flowing).addOverlayUVs([0]);
  }
  templater.processVoxelLight(this.ignoreAO);
 }
}

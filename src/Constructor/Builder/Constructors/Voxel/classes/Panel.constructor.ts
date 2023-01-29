import { ConstructorHooks } from "../../../../Hooks/ConstructorHooks.js";
import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types";

import { VoxelTemplater } from "../../../Tools/VoxelTemplater.js";
export class PanelVoxelConstructor implements VoxelConstructor {
 texture = 0;
 constructor(public id: string, textures: ConstructorTextureData) {
  ConstructorHooks.texturesRegistered.addToRun((textureManager) => {
   this.texture = textureManager.getTextureUV(textures);
  });
 }
 process(templater: typeof VoxelTemplater) {
  templater
   .addUV(this.texture, 2)
   .addOverlayUVs([0], 2)
   .addCurrentLightValue(2)
   .addAOValue(1, 2);
 }
}

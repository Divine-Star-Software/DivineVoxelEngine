import type { Scene } from "@babylonjs/core";
import type { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender";
import { NodeManager } from "../../Render/Nodes/NodeManager.js";
import { TextureCreator } from "../Textures/TextureCreator.js";
import { TextureManager } from "../Textures/TextureManager.js";

export async function $INITFunction(
 DVER: DivineVoxelEngineRender,
 scene: Scene
) {
 DVER.render.$INIT(scene);
 await TextureCreator.setUpImageCreation();
 await TextureManager.$INIT();
 DVER.constructorCommManager.syncTextureData(TextureManager.generateTextureUVMap());

 DVER.render.solidMaterial.createMaterial();
 DVER.render.floraMaterial.createMaterial();
 DVER.render.liquidMaterial.createMaterial();
 NodeManager.$INIT();
 scene.registerBeforeRender(() => {
  DVER.render.solidMaterial.updateUniforms();
  DVER.render.floraMaterial.updateUniforms();
  DVER.render.liquidMaterial.updateUniforms();
  DVER.render.skyBoxMaterial.updateUniforms();
  NodeManager.materials.materials._map.forEach((_) => {
   _.updateUniforms();
  });
 });
 setInterval(() => {
  DVER.render.solidMaterial.runEffects();
  DVER.render.floraMaterial.runEffects();
  DVER.render.liquidMaterial.runEffects();
  DVER.render.skyBoxMaterial.runEffects();
  NodeManager.materials.materials._map.forEach((_) => {
   _.runEffects();
  });
 }, 20);
 TextureManager.$START_ANIMATIONS();
}

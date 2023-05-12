import type { Scene } from "@babylonjs/core";
import type { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender";
import { NodeManager } from "../../Render/Nodes/NodeManager.js";
import { TextureCreator } from "../Nodes/Textures/TextureCreator.js";
import { TextureManager } from "../Nodes/Textures/TextureManager.js";
import { RenderManager } from "../Scene/RenderManager.js";

export async function $INITFunction(
 DVER: DivineVoxelEngineRender,
 scene: Scene
) {
 DVER.render.$INIT(scene);
 await TextureCreator.setUpImageCreation();
 await TextureManager.$INIT();
 DVER.constructorCommManager.syncTextureData(
  TextureManager.generateTextureUVMap()
 );

 NodeManager.init();
 NodeManager.materials.materials._map.forEach((m)=>{
    m.getMaterial()!.setFloats("lightGradient",NodeManager.materials.unifrosm.lightGradient)    
 })
 scene.registerBeforeRender(() => {
  NodeManager.materials.materials._map.forEach((_) => {
   _.updateUniforms();
  });
 });
 setInterval(() => {
  NodeManager.materials.materials._map.forEach((_) => {
   _.runEffects();
  });
 }, 20);
 TextureManager.$START_ANIMATIONS();
}

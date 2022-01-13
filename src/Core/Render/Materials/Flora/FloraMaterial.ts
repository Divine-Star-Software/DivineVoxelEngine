import type { RenderManager } from "Core/Render/RenderManager";

export class FloraMaterial {
 material: BABYLON.ShaderMaterial;
 context: CanvasRenderingContext2D;

 constructor(private renderManager: RenderManager) {}

 getMaterial() {
  return this.material;
 }

 createMaterial(
  scene: BABYLON.Scene,
  texture: BABYLON.RawTexture2DArray
 ): BABYLON.ShaderMaterial {
  BABYLON.Effect.ShadersStore["aVertexShader"] =
   this.renderManager.shaderBuilder.getDefaultVertexShader("solid");
  BABYLON.Effect.ShadersStore["aFragmentShader"] =
   this.renderManager.shaderBuilder.getDefaultFragmentShader("solid");

  const shaderMaterial = new BABYLON.ShaderMaterial("a", scene, "a", {
   attributes: ["position", "normal", "myuvs", "colors"],
   uniforms: [
    "world",
    "view",
    "viewProjection",
    "worldView",
    "worldViewProjection",
    "vFogInfos",
    "vFogColor",
    "baseLightColor",
    "projection",
    "anim1Index",
    "arrayTex",
   ],

   needAlphaBlending: true,
   needAlphaTesting : false
  });
  shaderMaterial.fogEnabled = true;

  shaderMaterial.setTexture("arrayTex", texture);

  shaderMaterial.backFaceCulling = false;

  //shaderMaterial.disableDepthWrite = true;
 //shaderMaterial.needDepthPrePass = true;
  shaderMaterial.separateCullingPass = true;

  shaderMaterial.onBind = (mesh) => {
   var effect = shaderMaterial.getEffect();
   if (!effect) return;

   effect.setFloat4(
    "vFogInfos",
    scene.fogMode,
    scene.fogStart,
    scene.fogEnd,
    scene.fogDensity
   );
   effect.setColor3("vFogColor", scene.fogColor);
   effect.setColor4("baseLightColor", new BABYLON.Color3(0.5, 0.5, 0.5), 1);
  };

  this.material = shaderMaterial;
  return this.material;
 }

 runAnimations(num: number) {
  this.material.setFloat("anim1Index", num);
  this.material.setFloat("anim2Index", num - 3);
 }
}

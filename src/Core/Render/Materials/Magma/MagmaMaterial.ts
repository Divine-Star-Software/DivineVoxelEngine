import type { RenderManager } from "Core/Render/RenderManager";

export class MagmaMaterial {
 material: BABYLON.ShaderMaterial;
 context: CanvasRenderingContext2D;

 constructor(private renderManager: RenderManager) {}

 getMaterial() {
  return this.material;
 }

 createMaterial(
  scene: BABYLON.Scene,
  texture: BABYLON.RawTexture2DArray,
  animations: number[][],
  animationTimes: number[][]
 ): BABYLON.ShaderMaterial {
  const animData = this.renderManager.animationManager.registerAnimations(
   "magma",
   animations,
   animationTimes
  );

  BABYLON.Effect.ShadersStore["magmaVertexShader"] =
   this.renderManager.shaderBuilder.getDefaultVertexShader(
    "magma",
    animData.uniformRegisterCode,
    animData.animationFunctionCode
   );
  BABYLON.Effect.ShadersStore["magmaFragmentShader"] =
   this.renderManager.shaderBuilder.getDefaultFragmentShader("magma");

  const shaderMaterial = new BABYLON.ShaderMaterial("magma", scene, "magma", {
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
    ...animData.uniforms,
   ],
   needAlphaBlending: true,
   needAlphaTesting: false,
  });
  shaderMaterial.fogEnabled = true;

  shaderMaterial.setTexture("arrayTex", texture);

  shaderMaterial.needDepthPrePass = true;

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

  this.renderManager.animationManager.registerMaterial("magma",shaderMaterial);


  return this.material;
 }

 runAnimations(num: number) {
  this.material.setFloat("anim1Index", num);
  this.material.setFloat("anim2Index", num - 3);
 }
}

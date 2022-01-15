import type { RenderManager } from "Core/Render/RenderManager";

export class FluidMaterial {
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
   "fluid",
   animations,
   animationTimes
  );




  BABYLON.Effect.ShadersStore["fluidVertexShader"] =
   this.renderManager.shaderBuilder.getDefaultVertexShader(
    "fluid",
    animData.uniformRegisterCode,
    animData.animationFunctionCode
   );
  BABYLON.Effect.ShadersStore["fluidFragmentShader"] =
   this.renderManager.shaderBuilder.getDefaultFragmentShader("fluid");
  const shaderMaterial = new BABYLON.ShaderMaterial("fluid", scene, "fluid", {
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
    "arrayTex",
    "time",
    ...animData.uniforms,
   ],
   needAlphaBlending: true,
   needAlphaTesting: false,
  });
  shaderMaterial.fogEnabled = true;
  texture.hasAlpha = true;

  shaderMaterial.setTexture("arrayTex", texture);
  shaderMaterial.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
  shaderMaterial.backFaceCulling = false;
  // shaderMaterial.separateCullingPass = false;
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

  let time = 0;
  scene.registerBeforeRender(function () {
   time += 0.005;
   shaderMaterial.setFloat("time", time);
  });

  this.renderManager.animationManager.registerMaterial("fluid",shaderMaterial);

  return this.material;
 }

 runAnimations(num: number) {
  this.material.setFloat("anim1Index", num);
  this.material.setFloat("anim2Index", num - 3);
 }
}

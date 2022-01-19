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
  texture: BABYLON.RawTexture2DArray,
  animations: number[][],
  animationTimes: number[][]
 ): BABYLON.ShaderMaterial {
  const animData = this.renderManager.animationManager.registerAnimations(
   "flora",
   animations,
   animationTimes
  );

  BABYLON.Effect.ShadersStore["floraVertexShader"] =
   this.renderManager.shaderBuilder.getDefaultVertexShader(
    "flora",
    animData.uniformRegisterCode,
    animData.animationFunctionCode
   );
  BABYLON.Effect.ShadersStore["floraFragmentShader"] =
   this.renderManager.shaderBuilder.getDefaultFragmentShader("flora");

  const shaderMaterial = new BABYLON.ShaderMaterial("flora", scene, "flora", {
   attributes: ["position", "normal", "cuv3", "colors"],
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



  let time = 0;
  scene.registerBeforeRender(function () {
   time += 0.08;
   shaderMaterial.setFloat("time", time);
  });

  this.material = shaderMaterial;

  this.renderManager.animationManager.registerMaterial("magma",shaderMaterial);

  return this.material;
 }


}

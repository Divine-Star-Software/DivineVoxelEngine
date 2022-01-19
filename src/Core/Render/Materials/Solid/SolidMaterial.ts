import type { RenderManager } from "Core/Render/RenderManager";

export class SolidMaterial {
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
   "solid",
   animations,
   animationTimes
  );

  BABYLON.Effect.ShadersStore["solidVertexShader"] =
   this.renderManager.shaderBuilder.getDefaultVertexShader(
    "solid",
    animData.uniformRegisterCode,
    animData.animationFunctionCode
   );

  BABYLON.Effect.ShadersStore["solidFragmentShader"] =
   this.renderManager.shaderBuilder.getDefaultFragmentShader("solid");

  const shaderMaterial = new BABYLON.ShaderMaterial("solid", scene, "solid", {
   attributes: ["position", "normal", "cuv3", "linearcColors","colors","fullcolors"],
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

  this.renderManager.animationManager.registerMaterial("solid",shaderMaterial);

  return this.material;
 }


}
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
   attributes: [
    "position",
    "normal",
    "cuv3",
    "aoColors",
    "colors",
    "rgbLightColors",
    "sunLightColors",
   ],
   uniforms: [
    "world",
    "view",
    "viewProjection",
    "worldView",
    "worldViewProjection",
    "vFogInfos",
    "vFogColor",
    "sunLightLevel",
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
  };

  this.material = shaderMaterial;

  this.renderManager.animationManager.registerMaterial("solid", shaderMaterial);

  // effect.setColor4("sunLightLevel", new BABYLON.Color3(1, 1, 1), 1);
/*   let level = 0;
  let up = true;
  setInterval(() => {
   if (up) {
    level += 0.01;
   } else {
    level -= 0.01;
   }

   if (level >= 1) {
    up = false;
   }
   if (level <= 0) {
    up = true;
   }

   this.material.setFloat("sunLightLevel", level);
  }, 100); */

  this.material.setFloat("sunLightLevel", 1);
  return this.material;
 }
}

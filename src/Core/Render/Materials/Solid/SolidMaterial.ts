import type { RenderManager } from "Core/Render/RenderManager";
import { EngineSettingsData } from "Meta/Global/EngineSettings.types";

export class SolidMaterial {
 material: BABYLON.ShaderMaterial;
 context: CanvasRenderingContext2D;

 constructor(private renderManager: RenderManager) {}

 getMaterial() {
  return this.material;
 }

 setSunLightLevel(level: number) {
  if (!this.material) {
   throw new Error("Material must be created first before it can be updated.");
  }
  this.material.setFloat("sunLightLevel", level);
 }
 setBaseLevel(level: number) {
  if (!this.material) {
   throw new Error("Material must be created first before it can be updated.");
  }
  this.material.setFloat("baseLevel", level);
 }


 updateMaterialSettings(settings: EngineSettingsData) {
  if (!this.material) {
   throw new Error("Material must be created first before it can be updated.");
  }
  if (settings.lighting?.doAO) {
   this.material.setFloat("doAO", 1.0);
  } else {
   this.material.setFloat("doAO", 0.0);
  }
  if (settings.lighting?.doSunLight) {
   this.material.setFloat("doSun", 1.0);
  } else {
   this.material.setFloat("doSun", 0.0);
  }
  if (settings.lighting?.doRGBLight) {
   this.material.setFloat("doRGB", 1.0);
  } else {
   this.material.setFloat("doRGB", 0.0);
  }
  if (settings.voxels?.doColors) {
   this.material.setFloat("doColor", 1.0);
  } else {
   this.material.setFloat("doColor", 0.0);
  }
 }

 createMaterial(
  settings: EngineSettingsData,
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

  this.material = new BABYLON.ShaderMaterial("solid", scene, "solid", {
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
    "baseLevel",
    "projection",
    "arrayTex",
    "doAO",
    "doSun",
    "doRGB",
    "doColor",
    ...animData.uniforms,
   ],
   needAlphaBlending: true,
   needAlphaTesting: false,
  });
  this.material.fogEnabled = true;

  this.material.setTexture("arrayTex", texture);

  this.material.needDepthPrePass = true;

  this.material.setFloat("sunLightLevel", 1);
  this.material.setFloat("baseLevel", 0.1);
  this.material.onBind = (mesh) => {
   var effect = this.material.getEffect();
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

  this.updateMaterialSettings(settings);

  this.renderManager.animationManager.registerMaterial("solid", this.material);

  return this.material;
 }

 overrideMaterial(material: any) {
  this.material = material;
 }
}

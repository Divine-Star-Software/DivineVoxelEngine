import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
import { DVER } from "../../../DivineVoxelEngineRender.js";

export const SolidMaterial = {
 material: <BABYLON.ShaderMaterial | null>null,

 time: 0,

 getMaterial() {
  return this.material;
 },

 updateFogOptions(data: BABYLON.Vector4) {
  if (!this.material) return;
  this.material.setVector4("fogOptions", data);
 },

 setSunLightLevel(level: number) {
  if (!this.material) {
   throw new Error("Material must be created first before it can be updated.");
  }
  this.material.setFloat("sunLightLevel", level);
 },
 setBaseLevel(level: number) {
  if (!this.material) {
   throw new Error("Material must be created first before it can be updated.");
  }
  this.material.setFloat("baseLevel", level);
 },

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
 },

 createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial {
  const animData = DVER.renderManager.animationManager.registerAnimations(
   "solid",
   data.animations,
   data.animationTimes
  );
  const overlayAnimData =
   DVER.renderManager.animationManager.registerAnimations(
    "solid",
    data.overlayAnimations,
    data.overlayAnimationTimes,
    true
   );

  BABYLON.Effect.ShadersStore["solidVertexShader"] =
   DVER.renderManager.shaderBuilder.getDefaultVertexShader(
    "solid",
    animData.uniformRegisterCode,
    animData.animationFunctionCode,
    overlayAnimData.uniformRegisterCode,
    overlayAnimData.animationFunctionCode
   );

  BABYLON.Effect.ShadersStore["solidFragmentShader"] =
   DVER.renderManager.shaderBuilder.getDefaultFragmentShader("solid");

  const shaderMaterial = new BABYLON.ShaderMaterial(
   "solid",
   data.scene,
   "solid",
   {
    attributes: [
     "position",
     "normal",
     "faceData",
     "ocuv3",
     "cuv3",
     "aoColors",
     "colors",
     "rgbLightColors",
     "sunLightColors",
    ],
    uniforms: [
     "world",
     "view",
     "cameraPosition",
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
     "time",
     "fogOptions",
     ...animData.uniforms,
     ...overlayAnimData.uniforms,
    ],
    needAlphaBlending: false,
    needAlphaTesting: true,
   }
  );
  this.material = shaderMaterial;
  //this.material.forceDepthWrite = true;
  this.material.fogEnabled = true;
  data.texture.hasAlpha = true;
  this.material.setTexture("arrayTex", data.texture);

  this.material.setFloat("sunLightLevel", 1);
  this.material.setFloat("baseLevel", 0.1);
  this.material.onBind = (mesh) => {
   if (!this.material) return;
   const effect = this.material.getEffect();
   const scene = mesh.getScene();
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

  this.updateMaterialSettings(data.settings);

  DVER.renderManager.animationManager.registerMaterial("solid", this.material);

  return this.material;
 },
 overrideMaterial(material: any) {
  this.material = material;
 },

 runEffects() {
  if (DVER.renderManager.fogOptions.mode != "animated-volumetric") return;
  if (!this.material) return;
  this.time += 0.005;
  this.material.setFloat("time", this.time);
 },
};

import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { DVER } from "../../../DivineVoxelEngineRender.js";

export const MagmaMaterial = {
 material: <BABYLON.ShaderMaterial | null>null,
 context: <CanvasRenderingContext2D | null>null,

 getMaterial() {
  return this.material;
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

 createMaterial(
  scene: BABYLON.Scene,
  texture: BABYLON.RawTexture2DArray,
  animations: number[][],
  animationTimes: number[][]
 ): BABYLON.ShaderMaterial {
  const animData = DVER.renderManager.animationManager.registerAnimations(
   "magma",
   animations,
   animationTimes
  );

  BABYLON.Effect.ShadersStore["magmaVertexShader"] =
   DVER.renderManager.shaderBuilder.getDefaultVertexShader(
    "magma",
    animData.uniformRegisterCode,
    animData.animationFunctionCode
   );
  BABYLON.Effect.ShadersStore["magmaFragmentShader"] =
   DVER.renderManager.shaderBuilder.getDefaultFragmentShader("magma");

  const shaderMaterial = new BABYLON.ShaderMaterial("magma", scene, "magma", {
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

  DVER.renderManager.animationManager.registerMaterial("magma", shaderMaterial);

  return this.material;
 },
};

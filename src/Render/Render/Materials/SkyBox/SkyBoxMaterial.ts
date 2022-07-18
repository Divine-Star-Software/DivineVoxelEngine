import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
import { DVER } from "../../../DivineVoxelEngineRender.js";

export const SkyBoxMaterial = {
 material: <BABYLON.ShaderMaterial | null>null,
 context: <CanvasRenderingContext2D | null>null,

 getMaterial() {
  return this.material;
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

 createMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial {
  BABYLON.Effect.ShadersStore["skyboxVertexShader"] =
   DVER.renderManager.shaderBuilder.getSkyBoxVertexShader();
  BABYLON.Effect.ShadersStore["skyboxFragmentShader"] =
   DVER.renderManager.shaderBuilder.getSkyBoxFragmentShader();

  const shaderMaterial = new BABYLON.ShaderMaterial("skybox", scene, "skybox", {
   attributes: ["position", "normal"],
   uniforms: [
    "world",
    "view",
    "cameraPosition",
    "viewProjection",
    "worldView",
    "worldViewProjection",
    "vFogInfos",
    "vFogColor",
    "projection",
    "time",
   ],
   needAlphaBlending: false,
   needAlphaTesting: true,
  });
  shaderMaterial.backFaceCulling = false;
  this.material = shaderMaterial;
  //this.material.forceDepthWrite = true;
  this.material.fogEnabled = true;

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

  let time = 0;
  scene.registerBeforeRender(function () {
   time += 0.005;
   shaderMaterial.setFloat("time", time);
  });

  return this.material;
 },
 overrideMaterial(material: any) {
  this.material = material;
 },
};

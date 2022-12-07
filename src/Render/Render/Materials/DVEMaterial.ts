import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { VoxelTemplateSubstanceType } from "Meta/index.js";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
import { DVER } from "../../DivineVoxelEngineRender.js";

type DVEMaterialOptions = {
 alphaTesting: boolean;
 alphaBlending: boolean;
 doEffects?: boolean;
};

export class DVEMaterial {
 material: BABYLON.ShaderMaterial | null = null;

 time = 0;

 constructor(
  public type: VoxelTemplateSubstanceType | "Item" = "solid",
  public options: DVEMaterialOptions
 ) {}

 getMaterial() {
  return this.material;
 }

 updateFogOptions(data: BABYLON.Vector4) {
  if (!this.material) return;
  this.material.setVector4("fogOptions", data);
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
  if (
   DVER.renderManager.effectOptions.liquidEffects ||
   DVER.renderManager.effectOptions.floraEffects
  ) {
   this.material.setFloat("doEffects", 1);
  } else {
   this.material.setFloat("doEffects", 0);
  }
 }

 createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial {
  const animData = DVER.renderManager.animationManager.registerAnimations(
   this.type,
   data.animations,
   data.animationTimes
  );
  const overlayAnimData =
   DVER.renderManager.animationManager.registerAnimations(
    this.type,
    data.overlayAnimations,
    data.overlayAnimationTimes,
    true
   );

  BABYLON.Effect.ShadersStore[`${this.type}VertexShader`] =
   DVER.renderManager.shaderBuilder.getDefaultVertexShader(this.type, {
    uvs: animData,
    overlayUVs: overlayAnimData,
   });

  BABYLON.Effect.ShadersStore[`${this.type}FragmentShader`] =
   DVER.renderManager.shaderBuilder.getDefaultFragmentShader(this.type);

  const shaderMaterial = new BABYLON.ShaderMaterial(
   this.type,
   data.scene,
   this.type,
   {
    attributes: [
     "position",
     "normal",
     "ocuv3",
     "cuv3",
     "faceData",
     "colors",
     "aoColors",
     "lightColors",
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
     "doEffects",
     "fogOptions",
     ...animData.uniforms,
     ...overlayAnimData.uniforms,
    ],
    needAlphaBlending: this.options.alphaBlending,
    needAlphaTesting: this.options.alphaTesting,
   }
  );

  this.material = shaderMaterial;

  this.material.fogEnabled = true;

  if (this.options.alphaBlending) {
   shaderMaterial.separateCullingPass = true;
   shaderMaterial.backFaceCulling = false;
   shaderMaterial.forceDepthWrite = true;
  }

  shaderMaterial.setTextureArray("arrayTex", data.texture);

  shaderMaterial.setTextureArray("overlayTex", data.overlayTexture);

  shaderMaterial.setFloat("sunLightLevel", 1);
  shaderMaterial.setFloat("baseLevel", 0.1);

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

  DVER.renderManager.animationManager.registerMaterial(
   this.type,
   this.material
  );

  return this.material;
 }

 overrideMaterial(material: any) {
  this.material = material;
 }

 runEffects() {
  // if (DVER.renderManager.fogOptions.mode != "animated-volumetric") return;
  if (!this.material) return;
  this.time += 0.005;
  this.material.setFloat("time", this.time);
 }
}

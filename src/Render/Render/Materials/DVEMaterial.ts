import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import type { ShaderMaterial, Vector4 } from "babylonjs";

import { TextureManager } from "../../Textures/TextureManager.js";
import { DVER } from "../../DivineVoxelEngineRender.js";
import { EngineSettings } from "../../../Data/Settings/EngineSettings.js";
import { DVEBabylon } from "../../Babylon/DVEBabylon.js";

type DVEMaterialOptions = {
 alphaTesting: boolean;
 alphaBlending: boolean;
 doEffects?: boolean;
};

export class DVEMaterial {
 material: ShaderMaterial | null = null;

 time = 0;

 constructor(
  public id: string = "#dve_solid",
  public options: DVEMaterialOptions
 ) {}

 getMaterial() {
  return this.material;
 }

 updateFogOptions(data: Vector4) {
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
   DVER.render.effectOptions.liquidEffects ||
   DVER.render.effectOptions.floraEffects
  ) {
   this.material.setFloat("doEffects", 1);
  } else {
   this.material.setFloat("doEffects", 0);
  }
 }

 createMaterial(): ShaderMaterial {
  const type = TextureManager.getTextureType(this.id);
  if (!type) {
   throw new Error(`${this.id} is not a valid texture type`);
  }
  const scene = DVER.render.scene!;
  const shader = DVER.render.shaders.createVoxelShader(this.id);
  type.addToShader(shader);
  shader.setCodeBody("vertex", `@${this.id}_vertex`);
  shader.setCodeBody("frag", `@${this.id}_frag`);
  shader.compile();

  DVEBabylon.system.Effect.ShadersStore[`${this.id}VertexShader`] =
   shader.compiled.vertex;

  DVEBabylon.system.Effect.ShadersStore[`${this.id}FragmentShader`] =
   shader.compiled.fragment;
  const shaderMaterial = new DVEBabylon.system.ShaderMaterial(
   this.id,
   scene,
   this.id,
   {
    attributes: shader.getAttributeList(),
    uniforms: shader.getUniformList(),
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
   shaderMaterial.needDepthPrePass = true;
  }

  type.addToMaterial(this);

  shaderMaterial.setFloat("sunLightLevel", 1);
  shaderMaterial.setFloat("baseLevel", 0.1);
  shaderMaterial.setVector3("worldOrigin", DVEBabylon.system.Vector3.Zero());

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

  this.updateMaterialSettings(EngineSettings.getSettings());

  return this.material;
 }

 overrideMaterial(material: any) {
  this.material = material;
 }

 runEffects() {
  // if (DVER.render.fogOptions.mode != "animated-volumetric") return;
  if (!this.material) return;
  this.time += 0.005;
  this.material.setFloat("time", this.time);
  if (DVER.render.fo.activeNode) {
   this.material.setVector3("worldOrigin", DVER.render.fo.activeNode.position);
  }
 }
}

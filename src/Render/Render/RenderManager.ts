//types
import type { EngineSettingsData, RecursivePartial } from "Meta/index.js";
//built in
import { DVEMesh } from "./Meshes/DVEMesh.js";
import { DVEMaterial } from "./Materials/DVEMaterial.js";
//objects
import { AnimationManager } from "./Animations/AnimationManager.js";
import { ShaderBuilder } from "./Shaders/ShaderBuilder.js";
import { TextureCreator } from "./Textures/TextureCreator.js";

//materials
import { SkyBoxMaterial } from "./Materials/SkyBox/SkyBoxMaterial.js";
import { StandardSolidMaterial } from "./Materials/Standard/SolidMaterial.bjsmp.js";
import { StandardLiquidMaterial } from "./Materials/Standard/LiquidMaterial.bjsmp.js";
import {
 RenderFogOptions,
 RenderEffectsOptions,
} from "Meta/Render/Render/Render.options.types.js";

const solidMaterial = new DVEMaterial("solid", {
 alphaBlending: false,
 alphaTesting: true,
});
const solidMesh = new DVEMesh("solid", solidMaterial);
const floraMat = new DVEMaterial("flora", {
 alphaBlending: false,
 alphaTesting: true,
});
const floraMesh = new DVEMesh("flora", floraMat);
const magmaMat = new DVEMaterial("magma", {
 alphaBlending: false,
 alphaTesting: true,
});
const magmaMesh = new DVEMesh("magma", magmaMat);
const liquidMat = new DVEMaterial("liquid", {
 alphaBlending: true,
 alphaTesting: false,
});
const liquidMesh = new DVEMesh("liquid", liquidMat);
const itemMat = new DVEMaterial("Item", {
 alphaBlending: false,
 alphaTesting: true,
});
const itemMesh = new DVEMesh("Item", itemMat);

export const RenderManager = {
 fogOptions: <RenderFogOptions>{
  mode: "volumetric",
  density: 0.0002,
  color: new BABYLON.Color3(1, 1, 1),
  volumetricOptions: {
   heightFactor: 0.25,
  },
 },

 fogData: new BABYLON.Vector4(1, 0.1, 0.5, 0),

 effectOptions: <RenderEffectsOptions>{
  floraEffects: false,
  liquidEffects: false,
 },

 shaderBuilder: ShaderBuilder,
 textureCreator: TextureCreator,
 animationManager: AnimationManager,

 solidMaterial: solidMaterial,
 floraMaterial: floraMat,
 liquidMaterial: liquidMat,
 magmaMaterial: magmaMat,
 itemMaterial: itemMat,

 solidMesh: solidMesh,
 floraMesh: floraMesh,
 liquidMesh: liquidMesh,
 magmaMesh: magmaMesh,
 itemMesh: itemMesh,

 solidStandardMaterial: StandardSolidMaterial,
 liquidStandardMaterial: StandardLiquidMaterial,

 skyBoxMaterial: SkyBoxMaterial,

 scene: <BABYLON.Scene | null>null,

 reStart() {},

 setScene(scene: BABYLON.Scene) {
  this.scene = scene;
 },

 updateFogOptions(options: RecursivePartial<RenderFogOptions>) {
  for (const key of Object.keys(options)) {
   //@ts-ignore
   const data = options[key];
   if (typeof data == "object") {
    for (const key2 of Object.keys(data)) {
     const data2 = data[key2];
     (this as any).fogOptions[key][key2] = data2;
    }
   } else {
    (this as any).fogOptions[key] = data;
   }
  }

  if (options.color && this.scene) {
   //@ts-ignore
   this.scene.fogColor = options.color;
  }

  if (this.fogOptions.mode == "volumetric") {
   this.fogData.x = 1;
  }
  if (this.fogOptions.mode == "animated-volumetric") {
    this.fogData.x = 2;
  }
  this.fogData.y = this.fogOptions.density;
  this.fogData.z = this.fogOptions.volumetricOptions.heightFactor;
  this.fogData = this.fogData;
  this._setFogData();
 },

 _setFogData() {
  const fogData = this.fogData;
  this.solidMaterial.updateFogOptions(fogData);
  this.liquidMaterial.updateFogOptions(fogData);
  this.floraMaterial.updateFogOptions(fogData);
  this.magmaMaterial.updateFogOptions(fogData);
  this.itemMaterial.updateFogOptions(fogData);
  this.skyBoxMaterial.updateFogOptions(fogData);
 },

 $INIT() {
  this.updateFogOptions(this.fogOptions);
  this._setFogData();
 },

 updateShaderEffectOptions(options: RecursivePartial<RenderEffectsOptions>) {
  if (options.floraEffects !== undefined) {
   this.effectOptions.floraEffects = options.floraEffects;
  }
  if (options.liquidEffects !== undefined) {
   this.effectOptions.liquidEffects = options.liquidEffects;
  }
 },

 syncSettings(settings: EngineSettingsData) {
  this.solidMesh.syncSettings(settings);
  this.floraMesh.syncSettings(settings);
  this.liquidMesh.syncSettings(settings);
  this.magmaMesh.syncSettings(settings);
  this.itemMesh.syncSettings(settings);
  this.textureCreator.defineTextureDimensions(
   settings.textures.width,
   settings.textures.height
  );
 },

 getScene() {
  return this.scene;
 },

 createSkyBoxMaterial(scene?: BABYLON.Scene) {
  if (!this.scene && !scene) {
   throw new Error(`Must set a scene first.`);
  }
  if (!this.scene && scene) {
   this.skyBoxMaterial.createMaterial(scene);
  }
  if (this.scene && !scene) {
   this.skyBoxMaterial.createMaterial(this.scene);
  }
  return this.skyBoxMaterial.getMaterial();
 },

 setSunLevel(level: number) {
  this.solidMaterial.setSunLightLevel(level);
  this.liquidMaterial.setSunLightLevel(level);
  this.floraMaterial.setSunLightLevel(level);
  this.itemMaterial.setSunLightLevel(level);
 },
 setBaseLevel(level: number) {
  this.solidMaterial.setBaseLevel(level);
  this.liquidMaterial.setBaseLevel(level);
  this.floraMaterial.setBaseLevel(level);
  this.itemMaterial.setBaseLevel(level);
 },
};

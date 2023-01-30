import type { VoxelSubstanceType } from "Meta/index";
import type { MaterialCreateData } from "Meta/Render/Materials/Material.types";
import type { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender";
import type { DVEMaterial } from "Render/Render/Materials/DVEMaterial";

const setUpMaterial = async (
 DVER: DivineVoxelEngineRender,
 scene: BABYLON.Scene,
 substance: VoxelSubstanceType | "Item",
 material: DVEMaterial
) => {
 const textures = DVER.textures.processedTextureData.texturePaths[substance];
 const animations =
  DVER.textures.processedTextureData.textureAnimations[substance];
 const animationTimes =
  DVER.textures.processedTextureData.textureAnimationTimes[substance];
 const materialTextures =
  await DVER.render.textureCreator.createMaterialTexture(
   `${substance}-diffuse`,
   scene,
   textures
  );

 const overlayTextures =
  DVER.textures.overlayProcessedTextureData.texturePaths[substance];
 const overlayAimations =
  DVER.textures.overlayProcessedTextureData.textureAnimations[substance];
 const overlayAnimationTimes =
  DVER.textures.overlayProcessedTextureData.textureAnimationTimes[substance];
 const Overlay2dTextureArray =
  await DVER.render.textureCreator.createMaterialTexture(
   `${substance}-overlay`,
   scene,
   overlayTextures
  );
 /* 
 if (DVER.settings.getSettings().materials.mode == "standard") {
  if (substance == "solid") {
   DVER.render.solidStandardMaterial.$INIT(materialTextures, scene);
  }

  if (substance == "liquid") {
   DVER.render.liquidStandardMaterial.$INIT(materialTextures, scene);
  }
 } */

 const materialCreateData: MaterialCreateData = {
  settings: DVER.settings.getSettings(),
  scene: scene,
  texture: materialTextures,
  animations: animations,
  animationTimes: animationTimes,
  overlayTexture: Overlay2dTextureArray,
  overlayAnimations: overlayAimations,
  overlayAnimationTimes: overlayAnimationTimes,
 };
 material.createMaterial(materialCreateData);
};

export async function BuildInitalMeshes(
 DVER: DivineVoxelEngineRender,
 scene: BABYLON.Scene
) {
 if (!DVER.textures.processedTextureData) {
  throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
 }

 DVER.render.$INIT(scene);

 await DVER.render.textureCreator.setUpImageCreation();

 await setUpMaterial(DVER, scene, "solid", DVER.render.solidMaterial);
 await setUpMaterial(DVER, scene, "flora", DVER.render.floraMaterial);
 await setUpMaterial(DVER, scene, "liquid", DVER.render.liquidMaterial);
 await setUpMaterial(DVER, scene, "magma", DVER.render.magmaMaterial);

 DVER.render.animationManager.startAnimations();

 DVER.textures.releaseTextureData();

 scene.registerBeforeRender(() => {
  DVER.render.solidMaterial.runEffects();
  DVER.render.floraMaterial.runEffects();
  DVER.render.liquidMaterial.runEffects();
  DVER.render.magmaMaterial.runEffects();
  DVER.render.skyBoxMaterial.runEffects();
 });
}

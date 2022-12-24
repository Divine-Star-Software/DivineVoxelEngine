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
 const textures =
  DVER.textureManager.processedTextureData.texturePaths[substance];
 const animations =
  DVER.textureManager.processedTextureData.textureAnimations[substance];
 const animationTimes =
  DVER.textureManager.processedTextureData.textureAnimationTimes[substance];
 const materialTextures =
  await DVER.renderManager.textureCreator.createMaterialTexture(
   `${substance}-diffuse`,
   scene,
   textures
  );

 const overlayTextures =
  DVER.textureManager.overlayProcessedTextureData.texturePaths[substance];
 const overlayAimations =
  DVER.textureManager.overlayProcessedTextureData.textureAnimations[substance];
 const overlayAnimationTimes =
  DVER.textureManager.overlayProcessedTextureData.textureAnimationTimes[
   substance
  ];
 const Overlay2dTextureArray =
  await DVER.renderManager.textureCreator.createMaterialTexture(
   `${substance}-overlay`,
   scene,
   overlayTextures
  );
 /* 
 if (DVER.settings.getSettings().materials.mode == "standard") {
  if (substance == "solid") {
   DVER.renderManager.solidStandardMaterial.$INIT(materialTextures, scene);
  }

  if (substance == "liquid") {
   DVER.renderManager.liquidStandardMaterial.$INIT(materialTextures, scene);
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
 if (!DVER.textureManager.processedTextureData) {
  throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
 }

 DVER.renderManager.$INIT(scene);


 await DVER.renderManager.textureCreator.setUpImageCreation();


 await setUpMaterial(DVER, scene, "solid", DVER.renderManager.solidMaterial);
 await setUpMaterial(DVER, scene, "flora", DVER.renderManager.floraMaterial);
 await setUpMaterial(DVER, scene, "liquid", DVER.renderManager.liquidMaterial);
 await setUpMaterial(DVER, scene, "magma", DVER.renderManager.magmaMaterial);
 await setUpMaterial(DVER, scene, "Item", DVER.renderManager.itemMaterial);

 DVER.renderManager.animationManager.startAnimations();

 DVER.textureManager.releaseTextureData();

 scene.registerBeforeRender(() => {
  DVER.renderManager.solidMaterial.runEffects();
  DVER.renderManager.floraMaterial.runEffects();
  DVER.renderManager.liquidMaterial.runEffects();
  DVER.renderManager.magmaMaterial.runEffects();
  DVER.renderManager.itemMaterial.runEffects();
  DVER.renderManager.skyBoxMaterial.runEffects();
 });


}

import type { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender";

export async function BuildInitalMeshes(
 DVER: DivineVoxelEngineRender,
 scene: BABYLON.Scene
) {
 if (!DVER.textureManager.processedTextureData) {
  throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
 }

 await DVER.renderManager.textureCreator.setUpImageCreation();
 DVER.meshManager.setScene(scene);



 const solidTextures =
  DVER.textureManager.processedTextureData.texturePaths.solid;
 const solidAnimations =
  DVER.textureManager.processedTextureData.textureAnimations.solid;
 const soidAnimationTimes =
  DVER.textureManager.processedTextureData.textureAnimationTimes.solid;
 const combinedChunkTextures =
  await DVER.renderManager.textureCreator.createMaterialTexture(
   scene,
   solidTextures
  );
 DVER.renderManager.solidMaterial.createMaterial(
  DVER.engineSettings.settings,
  scene,
  combinedChunkTextures,
  solidAnimations,
  soidAnimationTimes
 );

 const floraTextures =
  DVER.textureManager.processedTextureData.texturePaths.flora;
 const floraAnimations =
  DVER.textureManager.processedTextureData.textureAnimations.flora;
 const floraAnimationTimes =
  DVER.textureManager.processedTextureData.textureAnimationTimes.flora;
 const combinedFloraTextures =
  await DVER.renderManager.textureCreator.createMaterialTexture(
   scene,
   floraTextures
  );
 DVER.renderManager.floraMaterial.createMaterial(
  scene,
  combinedFloraTextures,
  floraAnimations,
  floraAnimationTimes
 );

 const fluidTextures =
  DVER.textureManager.processedTextureData.texturePaths.fluid;
 const fluidAnimations =
  DVER.textureManager.processedTextureData.textureAnimations.fluid;
 const fluidAnimationTimes =
  DVER.textureManager.processedTextureData.textureAnimationTimes.fluid;
 const combinedFluidTextures =
  await DVER.renderManager.textureCreator.createMaterialTexture(
   scene,
   fluidTextures
  );
 DVER.renderManager.fluidMaterial.createMaterial(
  DVER.engineSettings.settings,
  scene,
  combinedFluidTextures,
  fluidAnimations,
  fluidAnimationTimes
 );

 const magmaTextures =
  DVER.textureManager.processedTextureData.texturePaths.magma;
 const magmaAnimations =
  DVER.textureManager.processedTextureData.textureAnimations.magma;
 const magmaAnimationTimes =
  DVER.textureManager.processedTextureData.textureAnimationTimes.magma;
 const combinedMagmaTextures =
  await DVER.renderManager.textureCreator.createMaterialTexture(
   scene,
   magmaTextures
  );
 DVER.renderManager.magmaMaterial.createMaterial(
  scene,
  combinedMagmaTextures,
  magmaAnimations,
  magmaAnimationTimes
 );

 DVER.renderManager.animationManager.startAnimations();
}

import type { DivineVoxelEngine } from "Core/DivineVoxelEngine";

export async function BuildInitalMeshes(
 DVE: DivineVoxelEngine,
 scene: BABYLON.Scene
) {
 if (!DVE.worldComm.baseWorldData) {
  throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
 }

 await DVE.renderManager.textureCreator.setUpImageCreation();
 DVE.meshManager.setScene(scene);

 // console.log(DVE.world.baseWorldData);

 const solidTextures = DVE.worldComm.baseWorldData?.texturePaths.solid;
 const solidAnimations = DVE.worldComm.baseWorldData.textureAnimations.solid;
 const soidAnimationTimes = DVE.worldComm.baseWorldData.textureAnimationTimes.solid;
 const combinedChunkTextures =
  await DVE.renderManager.textureCreator.createMaterialTexture(
   scene,
   solidTextures
  );
 DVE.renderManager.solidMaterial.createMaterial(
  DVE.engineSettings.settings,
  scene,
  combinedChunkTextures,
  solidAnimations,
  soidAnimationTimes
 );

 const floraTextures = DVE.worldComm.baseWorldData?.texturePaths.flora;
 const floraAnimations = DVE.worldComm.baseWorldData.textureAnimations.flora;
 const floraAnimationTimes =
  DVE.worldComm.baseWorldData.textureAnimationTimes.flora;
 const combinedFloraTextures =
  await DVE.renderManager.textureCreator.createMaterialTexture(
   scene,
   floraTextures
  );
 DVE.renderManager.floraMaterial.createMaterial(
  scene,
  combinedFloraTextures,
  floraAnimations,
  floraAnimationTimes
 );

 const fluidTextures = DVE.worldComm.baseWorldData?.texturePaths.fluid;
 const fluidAnimations = DVE.worldComm.baseWorldData.textureAnimations.fluid;
 const fluidAnimationTimes =
  DVE.worldComm.baseWorldData.textureAnimationTimes.fluid;
 const combinedFluidTextures =
  await DVE.renderManager.textureCreator.createMaterialTexture(
   scene,
   fluidTextures
  );
 DVE.renderManager.fluidMaterial.createMaterial(
  DVE.engineSettings.settings,
  scene,
  combinedFluidTextures,
  fluidAnimations,
  fluidAnimationTimes
 );

 const magmaTextures = DVE.worldComm.baseWorldData?.texturePaths.magma;
 const magmaAnimations = DVE.worldComm.baseWorldData.textureAnimations.magma;
 const magmaAnimationTimes =
  DVE.worldComm.baseWorldData.textureAnimationTimes.magma;
 const combinedMagmaTextures =
  await DVE.renderManager.textureCreator.createMaterialTexture(
   scene,
   magmaTextures
  );
 DVE.renderManager.magmaMaterial.createMaterial(
  scene,
  combinedMagmaTextures,
  magmaAnimations,
  magmaAnimationTimes
 );

 DVE.renderManager.animationManager.startAnimations();
}

export async function BuildInitalMeshes(DVE, scene) {
    if (!DVE.world.baseWorldData) {
        throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
    }
    await DVE.renderManager.textureCreator.setUpImageCreation();
    DVE.meshManager.setScene(scene);
    // console.log(DVE.world.baseWorldData);
    const solidTextures = DVE.world.baseWorldData?.texturePaths.solid;
    const solidAnimations = DVE.world.baseWorldData.textureAnimations.solid;
    const soidAnimationTimes = DVE.world.baseWorldData.textureAnimationTimes.solid;
    const combinedChunkTextures = await DVE.renderManager.textureCreator.createMaterialTexture(scene, solidTextures);
    DVE.renderManager.solidMaterial.createMaterial(DVE.engineSettings.settings, scene, combinedChunkTextures, solidAnimations, soidAnimationTimes);
    const floraTextures = DVE.world.baseWorldData?.texturePaths.flora;
    const floraAnimations = DVE.world.baseWorldData.textureAnimations.flora;
    const floraAnimationTimes = DVE.world.baseWorldData.textureAnimationTimes.flora;
    const combinedFloraTextures = await DVE.renderManager.textureCreator.createMaterialTexture(scene, floraTextures);
    DVE.renderManager.floraMaterial.createMaterial(scene, combinedFloraTextures, floraAnimations, floraAnimationTimes);
    const fluidTextures = DVE.world.baseWorldData?.texturePaths.fluid;
    const fluidAnimations = DVE.world.baseWorldData.textureAnimations.fluid;
    const fluidAnimationTimes = DVE.world.baseWorldData.textureAnimationTimes.fluid;
    const combinedFluidTextures = await DVE.renderManager.textureCreator.createMaterialTexture(scene, fluidTextures);
    DVE.renderManager.fluidMaterial.createMaterial(scene, combinedFluidTextures, fluidAnimations, fluidAnimationTimes);
    const magmaTextures = DVE.world.baseWorldData?.texturePaths.magma;
    const magmaAnimations = DVE.world.baseWorldData.textureAnimations.magma;
    const magmaAnimationTimes = DVE.world.baseWorldData.textureAnimationTimes.magma;
    const combinedMagmaTextures = await DVE.renderManager.textureCreator.createMaterialTexture(scene, magmaTextures);
    DVE.renderManager.magmaMaterial.createMaterial(scene, combinedMagmaTextures, magmaAnimations, magmaAnimationTimes);
    DVE.renderManager.animationManager.startAnimations();
}

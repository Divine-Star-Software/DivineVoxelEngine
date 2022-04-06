export async function BuildInitalMeshes(DVER, scene) {
    if (!DVER.worldComm.baseWorldData) {
        throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
    }
    await DVER.renderManager.textureCreator.setUpImageCreation();
    DVER.meshManager.setScene(scene);
    // console.log(DVER.world.baseWorldData);
    const solidTextures = DVER.worldComm.baseWorldData?.texturePaths.solid;
    const solidAnimations = DVER.worldComm.baseWorldData.textureAnimations.solid;
    const soidAnimationTimes = DVER.worldComm.baseWorldData.textureAnimationTimes.solid;
    const combinedChunkTextures = await DVER.renderManager.textureCreator.createMaterialTexture(scene, solidTextures);
    DVER.renderManager.solidMaterial.createMaterial(DVER.engineSettings.settings, scene, combinedChunkTextures, solidAnimations, soidAnimationTimes);
    const floraTextures = DVER.worldComm.baseWorldData?.texturePaths.flora;
    const floraAnimations = DVER.worldComm.baseWorldData.textureAnimations.flora;
    const floraAnimationTimes = DVER.worldComm.baseWorldData.textureAnimationTimes.flora;
    const combinedFloraTextures = await DVER.renderManager.textureCreator.createMaterialTexture(scene, floraTextures);
    DVER.renderManager.floraMaterial.createMaterial(scene, combinedFloraTextures, floraAnimations, floraAnimationTimes);
    const fluidTextures = DVER.worldComm.baseWorldData?.texturePaths.fluid;
    const fluidAnimations = DVER.worldComm.baseWorldData.textureAnimations.fluid;
    const fluidAnimationTimes = DVER.worldComm.baseWorldData.textureAnimationTimes.fluid;
    const combinedFluidTextures = await DVER.renderManager.textureCreator.createMaterialTexture(scene, fluidTextures);
    DVER.renderManager.fluidMaterial.createMaterial(DVER.engineSettings.settings, scene, combinedFluidTextures, fluidAnimations, fluidAnimationTimes);
    const magmaTextures = DVER.worldComm.baseWorldData?.texturePaths.magma;
    const magmaAnimations = DVER.worldComm.baseWorldData.textureAnimations.magma;
    const magmaAnimationTimes = DVER.worldComm.baseWorldData.textureAnimationTimes.magma;
    const combinedMagmaTextures = await DVER.renderManager.textureCreator.createMaterialTexture(scene, magmaTextures);
    DVER.renderManager.magmaMaterial.createMaterial(scene, combinedMagmaTextures, magmaAnimations, magmaAnimationTimes);
    DVER.renderManager.animationManager.startAnimations();
}

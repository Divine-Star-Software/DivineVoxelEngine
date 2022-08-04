const setUpMaterial = async (DVER, scene, substance, material) => {
    const textures = DVER.textureManager.processedTextureData.texturePaths[substance];
    const animations = DVER.textureManager.processedTextureData.textureAnimations[substance];
    const animationTimes = DVER.textureManager.processedTextureData.textureAnimationTimes[substance];
    const _2dTextureArray = await DVER.renderManager.textureCreator.createMaterialTexture(scene, textures);
    const overlayTextures = DVER.textureManager.overlayProcessedTextureData.texturePaths[substance];
    const overlayAimations = DVER.textureManager.overlayProcessedTextureData.textureAnimations[substance];
    const overlayAnimationTimes = DVER.textureManager.overlayProcessedTextureData.textureAnimationTimes[substance];
    const Overlay2dTextureArray = await DVER.renderManager.textureCreator.createMaterialTexture(scene, overlayTextures);
    const materialCreateData = {
        settings: DVER.settings.getSettings(),
        scene: scene,
        texture: _2dTextureArray,
        animations: animations,
        animationTimes: animationTimes,
        overlayTexture: Overlay2dTextureArray,
        overlayAnimations: overlayAimations,
        overlayAnimationTimes: overlayAnimationTimes,
    };
    material.createMaterial(materialCreateData);
};
export async function BuildInitalMeshes(DVER, scene) {
    if (!DVER.textureManager.processedTextureData) {
        throw new Error("World base data was not set. Call $INIT before $SCENEINIT");
    }
    DVER.renderManager.setScene(scene);
    DVER.meshManager.$INIT();
    await DVER.renderManager.textureCreator.setUpImageCreation();
    DVER.meshManager.setScene(scene);
    await setUpMaterial(DVER, scene, "solid", DVER.renderManager.solidMaterial);
    await setUpMaterial(DVER, scene, "flora", DVER.renderManager.floraMaterial);
    await setUpMaterial(DVER, scene, "fluid", DVER.renderManager.fluidMaterial);
    await setUpMaterial(DVER, scene, "magma", DVER.renderManager.magmaMaterial);
    await setUpMaterial(DVER, scene, "Item", DVER.renderManager.itemMaterial);
    DVER.renderManager.animationManager.startAnimations();
}

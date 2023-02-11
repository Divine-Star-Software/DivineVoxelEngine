import { TextureCreator } from "../Textures/TextureCreator.js";
import { TextureManager } from "../Textures/TextureManager.js";
export async function $INITFunction(DVER, scene) {
    DVER.render.$INIT(scene);
    await TextureCreator.setUpImageCreation();
    await TextureManager.$INIT();
    DVER.constructorCommManager.$INIT(TextureManager.getTextureUVMap());
    DVER.render.solidMaterial.createMaterial();
    DVER.render.floraMaterial.createMaterial();
    DVER.render.liquidMaterial.createMaterial();
    DVER.render.animationManager.startAnimations();
    scene.registerBeforeRender(() => {
        DVER.render.solidMaterial.runEffects();
        DVER.render.floraMaterial.runEffects();
        DVER.render.liquidMaterial.runEffects();
        DVER.render.skyBoxMaterial.runEffects();
    });
    TextureManager.$START_ANIMATIONS();
}

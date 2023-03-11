import { TextureCreator } from "../Textures/TextureCreator.js";
import { TextureManager } from "../Textures/TextureManager.js";
export async function $INITFunction(DVER, scene) {
    DVER.render.$INIT(scene);
    await TextureCreator.setUpImageCreation();
    await TextureManager.$INIT();
    DVER.constructorCommManager.syncTextureData(TextureManager.getTextureUVMap());
    DVER.render.solidMaterial.createMaterial();
    DVER.render.floraMaterial.createMaterial();
    DVER.render.liquidMaterial.createMaterial();
    scene.registerBeforeRender(() => {
        DVER.render.solidMaterial.updateUniforms();
        DVER.render.floraMaterial.updateUniforms();
        DVER.render.liquidMaterial.updateUniforms();
        DVER.render.skyBoxMaterial.updateUniforms();
    });
    setInterval(() => {
        DVER.render.solidMaterial.runEffects();
        DVER.render.floraMaterial.runEffects();
        DVER.render.liquidMaterial.runEffects();
        DVER.render.skyBoxMaterial.runEffects();
    }, 20);
    TextureManager.$START_ANIMATIONS();
}

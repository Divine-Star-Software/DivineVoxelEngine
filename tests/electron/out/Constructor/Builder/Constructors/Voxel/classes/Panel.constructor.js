import { ConstructorHooks } from "../../../../Hooks/ConstructorHooks.js";
export class PanelVoxelConstructor {
    id;
    texture = 0;
    constructor(id, textures) {
        this.id = id;
        ConstructorHooks.texturesRegistered.addToRun((textureManager) => {
            this.texture = textureManager.getTextureUV(textures);
        });
    }
    process(templater) {
        templater
            .addUV(this.texture, 2)
            .addOverlayUVs([0], 2)
            .addCurrentLightValue(2)
            .addAOValue(1, 2);
    }
}

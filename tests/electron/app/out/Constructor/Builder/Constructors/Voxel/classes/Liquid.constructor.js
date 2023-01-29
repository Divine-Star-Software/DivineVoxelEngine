import { ConstructorHooks } from "../../../../Hooks/ConstructorHooks.js";
export class LiquidVoxelConstructor {
    id;
    textures;
    ignoreAO = true;
    constructor(id, textures) {
        this.id = id;
        ConstructorHooks.texturesRegistered.addToRun((textureManager) => {
            this.textures = [
                textureManager.getTextureUV(textures[0]),
                textureManager.getTextureUV(textures[1]),
            ];
        });
    }
    process(templater) {
        const [still, flowing] = this.textures;
        if (templater.isFaceExpposed("top")) {
            templater.addUV(still).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("bottom")) {
            templater.addUV(still).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("east")) {
            templater.addUV(flowing).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("west")) {
            templater.addUV(flowing).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("south")) {
            templater.addUV(flowing).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("north")) {
            templater.addUV(flowing).addOverlayUVs([0]);
        }
        templater.processVoxelLight(this.ignoreAO);
    }
}

import { DivineShader } from "../../Libs/Shaders/Classes/DivineShader.js";
class TextureRecord {
    parentID;
    id;
    mode;
    attributeID;
    textures = [];
    textureMap = {};
    animationsMap = [];
    animationTimes = [];
    animations = [];
    varyingID = "";
    animationUniforID = "";
    animationUniform = new Float32Array();
    paths = [];
    texture = [];
    textureID = "";
    constructor(parentID, id, mode, attributeID) {
        this.parentID = parentID;
        this.id = id;
        this.mode = mode;
        this.attributeID = attributeID;
        this.textureID = `${parentID}_${id}`.replace("#", "");
    }
}
export class TextureType {
    id;
    extension = "png";
    textureSegments;
    materials = new Map();
    shader;
    constructor(id) {
        this.id = id;
        const main = new TextureRecord(id, "main", "sampler", "cuv3");
        const overlay = new TextureRecord(id, "overlay", "overlay", "ocuv3");
        this.textureSegments = new Map([
            ["main", main],
            ["overlay", overlay],
        ]);
        this.shader = new DivineShader(id);
        this.shader.addTextures([
            [main.textureID, { arrayLength: 4, isArray: true, type: "sampler2DArray" }],
            [
                overlay.textureID,
                { arrayLength: 4, isArray: true, type: "sampler2DArray" },
            ],
        ]);
    }
    addTexture(data) {
        const segment = this.textureSegments.get(data.segment ? data.segment : "main");
        if (!segment)
            return false;
        segment.textures.push(data);
    }
    addToShader(shader) {
        const main = this.textureSegments.get("main");
        const overlay = this.textureSegments.get("overlay");
        shader.setArgumentOverride("function", "getBaseColor", {
            textureID: main.textureID,
            overlayTextureID: overlay.textureID,
            mainVarying: main.varyingID,
            overlayVarying: overlay.varyingID,
        });
        return this.shader.merge(shader, false);
    }
    addToMaterial(material) {
        const shaderMaterial = material.material;
        for (const [key, segment] of this.textureSegments) {
            shaderMaterial.setTextureArray(segment.textureID, segment.texture);
            shaderMaterial.setFloats(segment.animationUniforID, segment.animationUniform);
        }
        this.materials.set(material.id, material);
    }
    runAnimations() {
        for (const [key, segment] of this.textureSegments) {
            for (let i = 0; i < segment.animations.length; i++) {
                const anim = segment.animations[i];
                if (anim.currentCount <= anim.keyCounts[anim.currentFrame]) {
                    anim.currentCount++;
                    continue;
                }
                anim.currentCount = 0;
                if (anim.currentFrame < anim.keys.length - 1) {
                    anim.currentFrame++;
                }
                else {
                    anim.currentFrame = 0;
                }
                segment.animationUniform[anim.uniformIndex] = anim.keys[anim.currentFrame];
                for (const [key, material] of this.materials) {
                    material.material.setFloats(segment.animationUniforID, segment.animationUniform);
                }
            }
        }
    }
    getTextureUVMap() {
        const segmentMap = {};
        for (const [key, segment] of this.textureSegments) {
            segmentMap[key] ??= {};
            segmentMap[key] = segment.textureMap;
        }
        return segmentMap;
    }
}

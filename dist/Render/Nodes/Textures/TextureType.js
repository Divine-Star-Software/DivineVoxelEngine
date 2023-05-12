import { DivineShader } from "divine-shaders";
import { TextureManager } from "./TextureManager.js";
import { TextureAnimationCreator } from "./TextureAnimations.js";
import { TextureCreator } from "./TextureCreator.js";
class TextureSegment {
    parentID;
    id;
    mode;
    attributeID;
    totalTextures = 0;
    textures = [];
    textureIndex = {};
    animationsMap = [];
    animationTimes = [];
    animations = [];
    varyingID = "";
    animationUniforID = "";
    animationUniform = new Float32Array();
    paths = new Map();
    shaderTexture = [];
    textureID = "";
    constructor(parentID, id, mode, attributeID) {
        this.parentID = parentID;
        this.id = id;
        this.mode = mode;
        this.attributeID = attributeID;
        this.textureID = `${parentID}_${id}`.replace("#", "");
    }
    clearData() {
        this.paths.clear();
        this.textures = [];
        this.textureIndex = {};
        this.shaderTexture = [];
        this.animationsMap = [];
        this.animationTimes = [];
    }
    flush() {
        this.clearData();
        this.shaderTexture.forEach((t) => t.dispose());
        this.animations = [];
        this.animationTimes = [];
        this.animationsMap = [];
        this.textureIndex = {};
        this.totalTextures = 0;
    }
}
export class TextureType {
    id;
    extension = "png";
    segments;
    materials = new Map();
    shader;
    constructor(id) {
        this.id = id;
        const main = new TextureSegment(id, "main", "sampler", "cuv3");
        const overlay = new TextureSegment(id, "overlay", "overlay", "ocuv3");
        this.segments = new Map([
            ["main", main],
            ["overlay", overlay],
        ]);
    }
    flushAll() {
        this.segments.forEach((_, key) => _.flush());
        this.materials.clear();
    }
    async build() {
        this.buildTextureIndex();
        this.shader = new DivineShader(this.id);
        for (const [id, segment] of this.segments) {
            segment.shaderTexture = await TextureCreator.createMaterialTexture(id, segment.paths);
            this.shader.addTextures([
                [
                    segment.textureID,
                    { arrayLength: 4, isArray: true, type: "sampler2DArray" },
                ],
            ]);
        }
        TextureAnimationCreator.createAnimations(this);
    }
    getTextureIndex(textureId, varation = "", segment = "main") {
        const textureSegment = this.segments.get(segment);
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        let uv = -1;
        uv = textureSegment.textureIndex[id];
        if (uv == -1) {
            throw new Error(`Texture with id: ${id} does not exists.typeId : ${this.id}  segment : ${segment}`);
        }
        return uv;
    }
    clearSegmentData() {
        this.segments.forEach((_) => _.clearData());
    }
    removeSegment(id) {
        const segment = this.segments.get(id);
        if (!segment)
            return false;
        if (this.shader)
            this.shader.data.textures.delete(segment.textureID);
        this.segments.delete(id);
    }
    addTexture(data) {
        const segment = this.segments.get(data.segment ? data.segment : "main");
        if (!segment)
            return false;
        segment.textures.push(data);
    }
    addToShader(shader) {
        const main = this.segments.get("main");
        const overlay = this.segments.get("overlay");
        if (overlay) {
            shader.setArgumentOverride("function", "getBaseColor", {
                textureID: main.textureID,
                overlayTextureID: overlay.textureID,
                mainVarying: main.varyingID,
                overlayVarying: overlay.varyingID,
            });
        }
        shader.setArgumentOverride("function", "getMainColor", {
            textureID: main.textureID,
            mainVarying: main.varyingID,
        });
        return this.shader.merge(shader, false);
    }
    addToMaterial(material) {
        const shaderMaterial = material.material;
        for (const [key, segment] of this.segments) {
            shaderMaterial.setTextureArray(segment.textureID, segment.shaderTexture);
            shaderMaterial.setFloats(segment.animationUniforID, segment.animationUniform);
        }
        this.materials.set(material.id, material);
    }
    runAnimations() {
        for (const [key, segment] of this.segments) {
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
    getTextureIndexMap() {
        const segmentMap = {};
        for (const [key, segment] of this.segments) {
            segmentMap[key] ??= {};
            segmentMap[key] = segment.textureIndex;
        }
        return segmentMap;
    }
    _processVariations(textureData, paths, map, animations, textureAnimatioTimes, extension, count) {
        if (!textureData.variations)
            return count;
        for (const varation of Object.keys(textureData.variations)) {
            const data = textureData.variations[varation];
            if (data.frames == 0) {
                map[`${textureData.id}:${varation}`] = count;
                const assetPath = this._getPath(textureData, varation, extension);
                let raw = false;
                if (data.rawData && !Array.isArray(raw)) {
                    raw = data.rawData;
                }
                paths.set(assetPath, raw);
                count++;
            }
            else {
                if (!data.animKeys)
                    throw new Error("Texture Varation must have supplied animKeys if frames are greater than 0.");
                const rawData = data.rawData;
                for (let i = 1; i <= data.frames; i++) {
                    map[`${textureData.id}:${varation}-${i}`] = count;
                    const assetPath = this._getPath(textureData, `${varation}-${i}`, extension);
                    let raw = false;
                    if (rawData) {
                        raw = rawData[i - 1];
                    }
                    paths.set(assetPath, raw);
                    count++;
                }
                const trueKeys = [];
                for (let i = 0; i < data.animKeys.length; i++) {
                    trueKeys.push(map[`${textureData.id}:${varation}-${data.animKeys[i]}`]);
                }
                if (data.animKeyFrameTimes) {
                    textureAnimatioTimes.push(data.animKeyFrameTimes);
                }
                if (data.globalFrameTime) {
                    textureAnimatioTimes.push([data.globalFrameTime]);
                }
                animations.push(trueKeys);
            }
        }
        return count;
    }
    _getPath(textureData, varation = "default", extension) {
        return `${textureData.path ? textureData.path : TextureManager.defaultTexturePath}/${textureData.id}/${varation}.${extension}`;
    }
    buildTextureIndex() {
        const texture = this;
        if (!texture)
            return false;
        const extension = texture.extension;
        for (const [key, segment] of texture.segments) {
            let count = 1;
            const map = segment.textureIndex;
            const paths = segment.paths;
            const animationTimes = segment.animationTimes;
            const animations = segment.animationsMap;
            for (const textureData of segment.textures) {
                if (textureData.frames == 0) {
                    segment.textureIndex[`${textureData.id}`] = count;
                    const assetPath = this._getPath(textureData, "default", extension);
                    let raw = false;
                    if (textureData.rawData && !Array.isArray(raw)) {
                        raw = textureData.rawData;
                    }
                    paths.set(assetPath, raw);
                    count++;
                    count = this._processVariations(textureData, paths, map, animations, animationTimes, extension, count);
                }
                else {
                    if (!textureData.animKeys)
                        throw new Error("Texture must have supplied animKeys if frames are greater than 0.");
                    const rawData = textureData.rawData;
                    for (let i = 1; i <= textureData.frames; i++) {
                        const assetPath = this._getPath(textureData, `default-${i}`, extension);
                        let raw = false;
                        if (rawData) {
                            raw = rawData[i - 1];
                        }
                        paths.set(assetPath, raw);
                        count++;
                    }
                    const trueKeys = [];
                    for (let i = 0; i < textureData.animKeys.length; i++) {
                        trueKeys.push(map[`${textureData.id}:default-${textureData.animKeys[i]}`]);
                    }
                    if (textureData.animKeyFrameTimes) {
                        animationTimes.push(textureData.animKeyFrameTimes);
                    }
                    if (textureData.globalFrameTime) {
                        animationTimes.push([textureData.globalFrameTime]);
                    }
                    animations.push(trueKeys);
                    count = this._processVariations(textureData, paths, map, animations, animationTimes, extension, count);
                }
            }
            segment.totalTextures = count;
        }
    }
}

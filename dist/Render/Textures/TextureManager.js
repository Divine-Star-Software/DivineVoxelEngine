import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { TextureCreator } from "./TextureCreator.js";
import { TextureType } from "./TextureType.js";
import { TextureAnimationCreator } from "./TextureAnimations.js";
export const TextureManager = {
    defaultTexturePath: "",
    textureTypes: new Map(),
    _processVariations(textureData, paths, map, animations, textureAnimatioTimes, extension, count) {
        if (!textureData.variations)
            return count;
        for (const varation of Object.keys(textureData.variations)) {
            const data = textureData.variations[varation];
            if (data.frames == 0) {
                map[`${textureData.id}:${varation}`] = count;
                const assetPath = this._getPath(textureData, varation, extension);
                let raw = false;
                if (data.rawData) {
                    raw = data.rawData;
                }
                paths.set(assetPath, raw);
                count++;
            }
            else {
                if (!data.animKeys)
                    throw new Error("Texture Varation must have supplied animKeys if frames are greater than 0.");
                for (let i = 1; i <= data.frames; i++) {
                    map[`${textureData.id}:${varation}-${i}`] = count;
                    const assetPath = this._getPath(textureData, `${varation}-${i}`, extension);
                    let raw = false;
                    if (data.rawData) {
                        raw = data.rawData;
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
    },
    _getPath(textureData, varation = "default", extension) {
        return `${textureData.path ? textureData.path : this.defaultTexturePath}/${textureData.id}/${varation}.${extension}`;
    },
    generateTexturesData(id) {
        const texture = this.textureTypes.get(id);
        if (!texture)
            return false;
        const extension = texture.extension;
        for (const [key, segment] of texture.textureSegments) {
            let count = 1;
            const map = segment.textureMap;
            const paths = segment.paths;
            const animationTimes = segment.animationTimes;
            const animations = segment.animationsMap;
            for (const textureData of segment.textures) {
                if (textureData.frames == 0) {
                    segment.textureMap[`${textureData.id}`] = count;
                    const assetPath = this._getPath(textureData, "default", extension);
                    let raw = false;
                    if (textureData.rawData) {
                        raw = textureData.rawData;
                    }
                    paths.set(assetPath, raw);
                    count + count++;
                    count = this._processVariations(textureData, paths, map, animations, animationTimes, extension, count);
                }
                else {
                    if (!textureData.animKeys)
                        throw new Error("Texture must have supplied animKeys if frames are greater than 0.");
                    map[`${texture.id}`] = count;
                    for (let i = 1; i < textureData.frames; i++) {
                        const assetPath = this._getPath(textureData, `default-${i}`, extension);
                        let raw = false;
                        if (textureData.rawData) {
                            raw = textureData.rawData;
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
        }
    },
    _ready: false,
    isReady() {
        return this._ready;
    },
    async $INIT() {
        TextureCreator.defineTextureDimensions(EngineSettings.settings.textures.textureSize, EngineSettings.settings.textures.mipMapSizes);
        for (const [key, type] of this.textureTypes) {
            this.generateTexturesData(key);
            for (const [skey, segment] of type.textureSegments) {
                segment.texture = await TextureCreator.createMaterialTexture(skey, segment.paths);
            }
            TextureAnimationCreator.createAnimations(type);
        }
        this._ready = true;
    },
    $START_ANIMATIONS() {
        setInterval(() => {
            for (const [key, type] of this.textureTypes) {
                type.runAnimations();
            }
        }, 50);
    },
    getTextureUVMap() {
        const uvMap = {};
        for (const [key, type] of this.textureTypes) {
            uvMap[key] = type.getTextureUVMap();
        }
        return uvMap;
    },
    defineDefaultTexturePath(path) {
        this.defaultTexturePath = path;
    },
    getTextureType(id) {
        const texture = this.textureTypes.get(id);
        if (!texture)
            return false;
        return texture;
    },
    addTextureType(id) {
        this.textureTypes.set(id, new TextureType(id));
    },
    registerTexture(textureData) {
        if (Array.isArray(textureData)) {
            for (const texture of textureData) {
                const type = this.getTextureType(texture.type);
                if (!type)
                    continue;
                type.addTexture(texture);
                continue;
            }
            return;
        }
        const type = this.getTextureType(textureData.type);
        if (!type)
            return;
        type.addTexture(textureData);
    },
    async createRawDataMap() {
        const map = new Map();
        for (const [typeKey, type] of this.textureTypes) {
            for (const [segKey, segment] of type.textureSegments) {
                for (const data of segment.textures) {
                    if (!data.includeInRawDataMap)
                        continue;
                    if (!data.path && !data.rawData)
                        continue;
                    const key = `${type.id}|${data.id}|default`;
                    const rawData = await TextureCreator.loadImage(data.rawData
                        ? data.rawData
                        : this._getPath(data, "default", type.extension));
                    map.set(key, rawData);
                    if (data.variations) {
                        for (const varId in data.variations) {
                            const varation = data.variations[varId];
                            if (!varation.includeInRawDataMap)
                                continue;
                            const key = `${type.id}|${data.id}|${varId}`;
                            const rawData = await TextureCreator.loadImage(data.rawData ? data.rawData : this._getPath(data, varId, type.extension));
                            map.set(key, rawData);
                        }
                    }
                }
            }
        }
        return map;
    },
};
TextureManager.addTextureType("#dve_solid");
TextureManager.addTextureType("#dve_flora");
TextureManager.addTextureType("#dve_liquid");

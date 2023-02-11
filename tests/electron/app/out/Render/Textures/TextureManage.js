import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { TextureCreator } from "./TextureCreator.js";
import { TextureType } from "./TextureType.js";
import { TextureAnimationCreator } from "./TextureAnimations.js";
export const TextureManager = {
    defaultTexturePath: "",
    textureTypes: new Map(),
    _processVariations(texture, texturePaths, map, animations, textureAnimatioTimes, extension, count, path) {
        if (!texture.variations)
            return count;
        for (const varation of Object.keys(texture.variations)) {
            const data = texture.variations[varation];
            if (data.frames == 0) {
                map[`${texture.id}:${varation}`] = count;
                texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
                count++;
            }
            else {
                if (!data.animKeys)
                    throw new Error("Texture Varation must have supplied animKeys if frames are greater than 0.");
                for (let i = 1; i <= data.frames; i++) {
                    map[`${texture.id}:${varation}-${i}`] = count;
                    texturePaths.push(`${path}/${texture.id}/${varation}-${i}.${extension}`);
                    count++;
                }
                const trueKeys = [];
                for (let i = 0; i < data.animKeys.length; i++) {
                    trueKeys.push(map[`${texture.id}:${varation}-${data.animKeys[i]}`]);
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
    generateTexturesData(id) {
        const texture = this.textureTypes.get(id);
        if (!texture)
            return false;
        let count = 1;
        const extension = texture.extension;
        for (const [key, segment] of texture.textureSegments) {
            const map = segment.textureMap;
            const paths = segment.paths;
            const animationTimes = segment.animationTimes;
            const animations = segment.animationsMap;
            for (const textureData of segment.textures) {
                let path = textureData.path
                    ? textureData.path
                    : this.defaultTexturePath;
                if (textureData.frames == 0) {
                    segment.textureMap[`${textureData.id}`] = count;
                    paths.push(`${path}/${textureData.id}/default.${extension}`);
                    count++;
                    count = this._processVariations(textureData, paths, map, animations, animationTimes, extension, count, path);
                }
                else {
                    if (!textureData.animKeys)
                        throw new Error("Texture must have supplied animKeys if frames are greater than 0.");
                    map[`${texture.id}`] = count;
                    for (let i = 1; i < textureData.frames; i++) {
                        paths.push(`${path}/${textureData.id}/default-${i}.${extension}`);
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
                    count = this._processVariations(textureData, paths, map, animations, animationTimes, extension, count, path);
                }
            }
        }
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
    },
    $START_ANIMATIONS() {
        setInterval(() => {
            for (const [key, type] of this.textureTypes) {
                type.runAnimations();
            }
        }, 50);
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
};
TextureManager.addTextureType("#dve_solid");
TextureManager.addTextureType("#dve_flora");
TextureManager.addTextureType("#dve_liquid");

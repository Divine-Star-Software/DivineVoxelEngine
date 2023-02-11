export const TextureManager = {
    defaultTexturePath: "",
    processedTextureData: {},
    overlayProcessedTextureData: {},
    textureData: {},
    textureExtension: {
        solid: "png",
        "#dve_transparent": "png",
        liquid: "png",
        magma: "png",
        flora: "png",
        Item: "png",
    },
    textures: {
        solid: [],
        "#dve_transparent": [],
        liquid: [],
        magma: [],
        flora: [],
        Item: [],
    },
    uvTextureMap: {
        solid: {},
        "#dve_transparent": {},
        liquid: {},
        magma: {},
        flora: {},
        Item: {},
    },
    overylayTextures: {
        solid: [],
        "#dve_transparent": [],
        liquid: [],
        magma: [],
        flora: [],
        Item: [],
    },
    overlayUVTextureMap: {
        solid: {},
        "#dve_transparent": {},
        liquid: {},
        magma: {},
        flora: {},
        Item: {},
    },
    normalMapTextures: {
        solid: [],
        "#dve_transparent": [],
        liquid: [],
        magma: [],
        flora: [],
        Item: [],
    },
    noramlMapUVTexturesMap: {
        solid: {},
        "#dve_transparent": {},
        liquid: {},
        magma: {},
        flora: {},
        Item: {},
    },
    textureTypes: [
        ""#dve_transparent"",
        "#dve_liquid",
        "#dve_solid",
        "#dve_magma",
        "#dve_flora",
        "Item",
    ],
    _processVariations(texture, texturePaths, animations, textureAnimatioTimes, extension, count, path, textureType, overlay = false, normalMap = false) {
        let map = this.uvTextureMap;
        if (overlay) {
            map = this.overlayUVTextureMap;
        }
        if (normalMap) {
            map = this.overlayUVTextureMap;
        }
        if (!texture.variations)
            return count;
        for (const varation of Object.keys(texture.variations)) {
            const data = texture.variations[varation];
            if (data.frames == 0) {
                map[textureType][`${texture.id}:${varation}`] = count;
                texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
                count++;
            }
            else {
                if (!data.animKeys)
                    throw new Error("Texture Varation must have supplied animKeys if frames are greater than 0.");
                for (let i = 1; i <= data.frames; i++) {
                    map[textureType][`${texture.id}:${varation}-${i}`] = count;
                    texturePaths.push(`${path}/${texture.id}/${varation}-${i}.${extension}`);
                    count++;
                }
                const trueKeys = [];
                for (let i = 0; i < data.animKeys.length; i++) {
                    trueKeys.push(map[textureType][`${texture.id}:${varation}-${data.animKeys[i]}`]);
                }
                if (data.animKeyFrameTimes) {
                    textureAnimatioTimes[textureType].push(data.animKeyFrameTimes);
                }
                if (data.globalFrameTime) {
                    textureAnimatioTimes[textureType].push([data.globalFrameTime]);
                }
                animations[textureType].push(trueKeys);
            }
        }
        return count;
    },
    generateTexturesData(overlay = false, normalMap = false) {
        const returnTexturePaths = {
            solid: [],
            "#dve_transparent": [],
            magma: [],
            liquid: [],
            flora: [],
            Item: [],
        };
        const textureAnimatioTimes = {
            solid: [],
            "#dve_transparent": [],
            magma: [],
            liquid: [],
            flora: [],
            Item: [],
        };
        const animations = {
            solid: [],
            "#dve_transparent": [],
            magma: [],
            liquid: [],
            flora: [],
            Item: [],
        };
        let textures = this.textures;
        if (overlay) {
            textures = this.overylayTextures;
        }
        if (normalMap) {
            textures = this.normalMapTextures;
        }
        let map = this.uvTextureMap;
        if (overlay) {
            map = this.overlayUVTextureMap;
        }
        if (normalMap) {
            map = this.noramlMapUVTexturesMap;
        }
        for (const textureType of this.textureTypes) {
            let texturePaths = [];
            let count = 1;
            const extension = this.textureExtension[textureType];
            for (const texture of textures[textureType]) {
                let path = texture.path ? texture.path : this.defaultTexturePath;
                if (texture.frames == 0) {
                    map[textureType][`${texture.id}`] = count;
                    texturePaths.push(`${path}/${texture.id}/default.${extension}`);
                    count++;
                    count = this._processVariations(texture, texturePaths, animations, textureAnimatioTimes, extension, count, path, textureType, overlay);
                }
                else {
                    if (!texture.animKeys)
                        throw new Error("Texture must have supplied animKeys if frames are greater than 0.");
                    map[textureType][`${texture.id}`] = count;
                    for (let i = 1; i < texture.frames; i++) {
                        texturePaths.push(`${path}/${texture.id}/default-${i}.${extension}`);
                        count++;
                    }
                    const trueKeys = [];
                    for (let i = 0; i < texture.animKeys.length; i++) {
                        trueKeys.push(map[textureType][`${texture.id}:default-${texture.animKeys[i]}`]);
                    }
                    if (texture.animKeyFrameTimes) {
                        textureAnimatioTimes[textureType].push(texture.animKeyFrameTimes);
                    }
                    if (texture.globalFrameTime) {
                        textureAnimatioTimes[textureType].push([texture.globalFrameTime]);
                    }
                    animations[textureType].push(trueKeys);
                    count = this._processVariations(texture, texturePaths, animations, textureAnimatioTimes, extension, count, path, textureType);
                }
            }
            returnTexturePaths[textureType] = texturePaths;
        }
        if (!overlay) {
            this.processedTextureData = {
                textureAnimationTimes: textureAnimatioTimes,
                textureAnimations: animations,
                texturePaths: returnTexturePaths,
            };
        }
        else {
            this.overlayProcessedTextureData = {
                textureAnimationTimes: textureAnimatioTimes,
                textureAnimations: animations,
                texturePaths: returnTexturePaths,
            };
        }
    },
    defineDefaultTexturePath(path) {
        this.defaultTexturePath = path;
    },
    defineDefaultTextureExtension(textureType, ext) {
        this.textureExtension[textureType] = ext;
    },
    getTextureUV(textureType, textureId, varation) {
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        return this.uvTextureMap[textureType][id];
    },
    registerTexture(textureData) {
        if (Array.isArray(textureData)) {
            for (const texture of textureData) {
                if (texture.overlay) {
                    this.overylayTextures[texture.type].push(texture);
                    continue;
                }
                this.textures[texture.type].push(texture);
            }
            return;
        }
        if (textureData.overlay) {
            this.overylayTextures[textureData.type].push(textureData);
            return;
        }
        this.textures[textureData.type].push(textureData);
    },
    releaseTextureData() {
        this.overlayUVTextureMap = null;
        this.uvTextureMap = null;
        delete this.overlayUVTextureMap;
        delete this.uvTextureMap;
    },
};

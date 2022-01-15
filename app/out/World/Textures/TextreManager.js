export class TextureManager {
    defaultTexturePath = "";
    textureExtension = {
        solid: "png",
        transparent: "png",
        fluid: "png",
        magma: "png",
        flora: "png",
    };
    textures = {
        solid: [],
        transparent: [],
        fluid: [],
        magma: [],
        flora: [],
    };
    uvTextureMap = {
        solid: {},
        transparent: {},
        fluid: {},
        magma: {},
        flora: {},
    };
    generateTexturesData() {
        const returnStrings = {
            solid: [],
            transparent: [],
            magma: [],
            fluid: [],
            flora: [],
        };
        const animations = {
            solid: [],
            transparent: [],
            magma: [],
            fluid: [],
            flora: [],
        };
        const substances = [
            "transparent",
            "fluid",
            "solid",
            "magma",
            "flora",
        ];
        for (const substance of substances) {
            let texturePaths = [];
            let count = 1;
            const extension = this.textureExtension[substance];
            for (const texture of this.textures[substance]) {
                let path = texture.path ? texture.path : this.defaultTexturePath;
                if (texture.frames == 0) {
                    this.uvTextureMap[substance][`${texture.id}`] = count;
                    texturePaths.push(`${path}/${texture.id}/default.${extension}`);
                    count++;
                    if (texture.varations) {
                        for (const varation of Object.keys(texture.varations)) {
                            const data = texture.varations[varation];
                            if (data.frames == 0) {
                                this.uvTextureMap[substance][`${texture.id}:${varation}`] = count;
                                texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
                                count++;
                            }
                            else {
                                if (!data.animKeys)
                                    continue;
                                for (let i = 1; i <= data.frames; i++) {
                                    this.uvTextureMap[substance][`${texture.id}:${varation}-${i}`] = count;
                                    texturePaths.push(`${path}/${texture.id}/${varation}-${i}.${extension}`);
                                    count++;
                                }
                                const trueKeys = [];
                                for (let i = 0; i < data.animKeys.length; i++) {
                                    trueKeys.push(this.uvTextureMap[substance][`${texture.id}:${varation}-${data.animKeys[i]}`]);
                                }
                                animations[substance].push(trueKeys);
                            }
                        }
                    }
                }
                else {
                    this.uvTextureMap[substance][`${texture.id}`] = count;
                    for (let i = 1; i < texture.frames; i++) {
                        texturePaths.push(`${path}/${texture.id}/default-${i}.${extension}`);
                        count++;
                        if (texture.varations) {
                            for (const varation of Object.keys(texture.varations)) {
                                this.uvTextureMap[substance][`${texture.id}:${varation}-${i}.${extension}`] = count;
                                for (let i = 1; i < texture.frames; i++) {
                                    texturePaths.push(`${path}/${texture.id}/${varation}-${i}.${extension}`);
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
            returnStrings[substance] = texturePaths;
        }
        console.log(animations);
        return returnStrings;
    }
    defineDefaultTexturePath(path) {
        this.defaultTexturePath = path;
    }
    defineDefaultTextureExtension(voxelSubstanceType, ext) {
        this.textureExtension[voxelSubstanceType] = ext;
    }
    getTextureUV(voxelSubstanceType, textureId, varation) {
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        return this.uvTextureMap[voxelSubstanceType][id];
    }
    registerTexture(voxelSubstanceType, textureData) {
        this.textures[voxelSubstanceType].push(textureData);
    }
}

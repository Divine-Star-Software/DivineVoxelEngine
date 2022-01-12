export class TextureManager {
    defaultTexturePath = "";
    textureExtension = {
        solid: "png",
        transparent: "png",
        fluid: "png",
        magma: "png",
    };
    textures = {
        solid: [],
        transparent: [],
        fluid: [],
        magma: [],
    };
    uvTextureMap = {
        solid: {},
        transparent: {},
        fluid: {},
        magma: {},
    };
    generateTexturesData() {
        let texturePaths = [];
        const substances = [
            "transparent",
            "fluid",
            "solid",
            "magma",
        ];
        let count = 1;
        for (const substance of substances) {
            const extension = this.textureExtension[substance];
            for (const texture of this.textures[substance]) {
                let path = texture.path ? texture.path : this.defaultTexturePath;
                if (texture.frames == 0) {
                    this.uvTextureMap[substance][`${texture.id}`] = count;
                    texturePaths.push(`${path}/${texture.id}/default.${extension}`);
                    count++;
                    if (texture.varations) {
                        for (const varation of Object.keys(texture.varations)) {
                            this.uvTextureMap[substance][`${texture.id}:${varation}`] = count;
                            texturePaths.push(`${path}/${texture.id}/${varation}.${extension}`);
                            count++;
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
        }
        return texturePaths;
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

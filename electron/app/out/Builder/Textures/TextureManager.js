export const TextureManager = {
    textureDataHasBeenSet: false,
    uvTextureMap: {},
    getTextureUV(voxelSubstanceType, textureId, varation) {
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        return this.uvTextureMap[voxelSubstanceType][id];
    },
    isReady() {
        return this.textureDataHasBeenSet;
    },
    setUVTextureMap(data) {
        this.textureDataHasBeenSet = true;
        this.uvTextureMap = data;
    },
};

export const TextureManager = {
    textureDataHasBeenSet: false,
    uvTextureMap: {},
    overlayUVTextureMap: {},
    getTextureUV(textureType, textureId, varation = false, overlay = false) {
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        let uv = -1;
        if (!overlay) {
            uv = this.uvTextureMap[textureType][id];
        }
        else {
            uv = this.overlayUVTextureMap[textureType][id];
        }
        if (uv == -1) {
            throw new Error(`Texture with id: ${id} does not exists. Overlay : ${overlay}`);
        }
        return uv;
    },
    setUVTextureMap(data) {
        this.textureDataHasBeenSet = true;
        this.uvTextureMap = data;
    },
    setOverlayUVTextureMap(data) {
        this.textureDataHasBeenSet = true;
        this.overlayUVTextureMap = data;
    },
    isReady() {
        return this.textureDataHasBeenSet;
    },
};

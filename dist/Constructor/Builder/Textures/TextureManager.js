export const TextureManager = {
    textureDataHasBeenSet: false,
    data: {},
    getTextureUV(data, overlay = false) {
        const [textureType, textureId, varation] = data;
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        let uv = -1;
        if (!overlay) {
            uv = this.data[textureType]["main"][id];
        }
        else {
            uv = this.data[textureType]["overlay"][id];
        }
        if (uv == -1) {
            throw new Error(`Texture with id: ${id} does not exists. Overlay : ${overlay}`);
        }
        return uv;
    },
    setUVTextureMap(data) {
        this.textureDataHasBeenSet = true;
        this.data = data;
    },
    releaseTextureData() {
        this.data = null;
        delete this["data"];
    },
    isReady() {
        return this.textureDataHasBeenSet;
    },
};

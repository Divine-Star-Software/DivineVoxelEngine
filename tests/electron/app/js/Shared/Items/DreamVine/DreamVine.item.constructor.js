let uv = 0;
export const DreamVineItemConstructorObject = {
    id: "dve_dreamvine-item",
    shapeId: "vine",
    hooks: {
        texturesRegistered: (DVEB) => {
            uv = DVEB.textureManager.getTextureUV("Item", "dream-vine");
        },
    },
    process(data, DVEB) {
        data.uvs.push(uv);
    },
};

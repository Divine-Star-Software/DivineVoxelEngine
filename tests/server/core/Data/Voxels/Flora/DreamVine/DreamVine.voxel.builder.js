let uv = 0;
export const DreamVineVoxelBuilderThread = {
    id: "dve_dreamvine",
    hooks: {
        texturesRegistered: (DVEB) => {
            uv = DVEB.textureManager.getTextureUV("#dve_flora", "dream-vine");
        },
    },
    process: function (data, DVEB) {
        data.uvTemplate.push(uv, uv);
        data.overlayUVTemplate.push(0, 0, 0, 0);
        const lightValue = DVEB.processor.worldMatrix.getLight(data.x, data.y, data.z);
        data.aoTemplate.push(1);
        data.lightTemplate.push(lightValue);
    },
};

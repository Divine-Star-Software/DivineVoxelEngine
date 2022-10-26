let uv = 0;
export const DreamVineVoxelBuilderThread = {
    id: "dve:dreamvine",
    hooks: {
        texturesRegistered: (DVEB) => {
            uv = DVEB.textureManager.getTextureUV("flora", "dream-vine");
        },
    },
    process: function (data, DVEB) {
        data.uvTemplate.push(uv, uv);
        data.overlayUVTemplate.push(0, 0, 0, 0);
        DVEB.processor.nDataTool.loadIn(data.x, data.y, data.z);
        const lightValue = DVEB.processor.nDataTool.getLight();
        data.aoTemplate.push(1);
        data.lightTemplate.push(lightValue);
    },
};

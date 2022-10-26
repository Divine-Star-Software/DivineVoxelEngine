let uv = 0;
export const DreadGrassVoxelBuilderThread = {
    id: "dve:dreadgrass",
    hooks: {
        texturesRegistered: (DVEB) => {
            uv = DVEB.textureManager.getTextureUV("flora", "dreadgrass");
        },
    },
    process: function (data, DVEB) {
        data.uvTemplate.push(uv, uv);
        data.overlayUVTemplate.push(0, 0, 0, 0);
        DVEB.processor.nDataTool.loadIn(data.x, data.y, data.z);
        const lightValue = DVEB.processor.nDataTool.getLight();
        data.aoTemplate.push(1, 1);
        data.lightTemplate.push(lightValue, lightValue);
    },
};

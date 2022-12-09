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
        data.overlayUVTemplate.push(0, 0, 0, 0);
        data.aoTemplate.push(1, 1);
        const lightValue = DVEB.processor.mDataTool.getLight();
        data.lightTemplate.push(lightValue, lightValue);
    },
};

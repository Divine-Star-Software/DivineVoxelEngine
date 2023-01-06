let uv = 0;
export const DreadGrassVoxelBuilderThread = {
    id: "dve_dreadgrass",
    hooks: {
        texturesRegistered: (DVEB) => {
            uv = DVEB.textureManager.getTextureUV("flora", "dreadgrass");
        },
    },
    process(templater) {
        templater
            .addUV(uv, 2)
            .addOverlayUVs([0], 2)
            .addCurrentLightValue(2)
            .addAOValue(1, 2);
    },
};

let lightDebugBoxTextures = {};
export const LightDebugBoxVoxelBuilderThread = {
    id: "dve_lightdebug",
    hooks: {
        texturesRegistered: (DVEB) => {
            lightDebugBoxTextures = {
                0: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-0"),
                1: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-1"),
                2: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-2"),
                3: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-3"),
                4: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-4"),
                5: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-5"),
                6: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-6"),
                7: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-7"),
                8: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-8"),
                9: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-9"),
                10: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-10"),
                11: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-11"),
                12: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-12"),
                13: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-13"),
                14: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-14"),
                15: DVEB.textureManager.getTextureUV("solid", "light-debug", "light-level-15"),
            };
        },
    },
    process: function (templater) {
        const [dimension, x, y, z] = templater.currentVoxel.getLocation();
        const dt = templater.utilDataTool;
        if (templater.isFaceExpposed("top")) {
            templater
                .addUV(lightDebugBoxTextures[getData(dt, x, y + 1, z) || 0])
                .addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("bottom")) {
            templater
                .addUV(lightDebugBoxTextures[getData(dt, x, y - 1, z) || 0])
                .addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("east")) {
            templater
                .addUV(lightDebugBoxTextures[getData(dt, x + 1, y, z) || 0])
                .addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("west")) {
            templater
                .addUV(lightDebugBoxTextures[getData(dt, x - 1, y, z) || 0])
                .addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("south")) {
            templater
                .addUV(lightDebugBoxTextures[getData(dt, x, y, z - 1) || 0])
                .addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("north")) {
            templater
                .addUV(lightDebugBoxTextures[getData(dt, x, y, z + 1) || 0])
                .addOverlayUVs([0]);
        }
        templater.processVoxelLight();
    },
};
const getData = (dataTool, x, y, z) => {
    let data = 0;
    if (dataTool.loadInAt(x, y, z)) {
        data = dataTool.getLight();
    }
    return data;
};

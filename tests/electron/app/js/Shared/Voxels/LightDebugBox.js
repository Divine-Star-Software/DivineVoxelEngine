const getData = (dataTool, x, y, z) => {
    let data = 0;
    if (dataTool.loadInAt(x, y, z)) {
        data = dataTool.getLight();
    }
    return data;
};
export function GetLightDebugBox(DVEC) {
    const textures = [];
    DVEC.hooks.texturesRegistered.addToRun((textureMangager) => {
        for (let i = 0; i < 16; i++) {
            textures.push(textureMangager.getTextureUV(["#dve_solid", "light-debug", `light-level-${i}`]));
        }
    });
    return DVEC.voxelManager.registerVoxel({
        id: "dve_lightdebug",
        process(templater) {
            const [dimension, x, y, z] = templater.currentVoxel.getLocation();
            const dt = templater.utilDataTool;
            if (templater.isFaceExpposed("top")) {
                templater.addUV(textures[getData(dt, x, y + 1, z) || 0]).addOverlayUVs([0]);
            }
            if (templater.isFaceExpposed("bottom")) {
                templater.addUV(textures[getData(dt, x, y - 1, z) || 0]).addOverlayUVs([0]);
            }
            if (templater.isFaceExpposed("east")) {
                templater.addUV(textures[getData(dt, x + 1, y, z) || 0]).addOverlayUVs([0]);
            }
            if (templater.isFaceExpposed("west")) {
                templater.addUV(textures[getData(dt, x - 1, y, z) || 0]).addOverlayUVs([0]);
            }
            if (templater.isFaceExpposed("south")) {
                templater.addUV(textures[getData(dt, x, y, z - 1) || 0]).addOverlayUVs([0]);
            }
            if (templater.isFaceExpposed("north")) {
                templater.addUV(textures[getData(dt, x, y, z + 1) || 0]).addOverlayUVs([0]);
            }
            templater.processVoxelLight();
        },
    });
}

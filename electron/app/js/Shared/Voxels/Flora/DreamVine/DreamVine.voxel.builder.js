import { DreamVineVoxelData } from "./DreamVine.voxel.data.js";
export const DreamVineVoxelBuilderThread = {
    data: DreamVineVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("flora", "dream-vine");
        data.uvTemplate.push(uv, uv);
        data.overlayUVTemplate.push(0, 0, 0, 0);
        const lightValue = DVEB.processor.worldMatrix.getLight(data.x, data.y, data.z);
        data.aoTemplate.push(1, 1);
        data.lightTemplate.push(lightValue, lightValue);
        //data.lightTemplate.push(0xf, 0xf);
    },
};

import { DreamGrassVoxelData } from "./DreamGrass.voxel.data.js";
export const DreamGrassVoxelBuilderThread = {
    data: DreamGrassVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("flora", "dreamgrass");
        data.shapeStateTemplate.push(0);
        data.shapeTemplate.push(this.trueShapeId);
        data.uvTemplate.push(uv, uv);
        data.aoTemplate.push(1, 1, 1, 1, 1, 1, 1, 1);
        DVEB.voxelHelper.calculateVoxelLight(data, this.data);
    },
};

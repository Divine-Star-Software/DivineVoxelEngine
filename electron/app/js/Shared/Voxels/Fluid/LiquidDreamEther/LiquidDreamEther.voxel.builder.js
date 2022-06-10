import { LiquidDreamEtherVoxelData } from "./LiquidDreamEther.voxel.data.js";
export const LiquidDreamEtherVoxelBuilderThread = {
    data: LiquidDreamEtherVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("fluid", "liquid-dream-ether", "still-1");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(uv);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(uv);
        }
        data.shapeStateTemplate.push(0);
        data.shapeTemplate.push(this.trueShapeId);
        DVEB.processor.calculateVoxelLight(data, this.data);
    },
};

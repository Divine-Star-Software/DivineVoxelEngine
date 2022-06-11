import { DebugBoxVoxelData } from "./DebugBox.voxel.data.js";
export const DebugBoxVoxelBuilderThread = {
    data: DebugBoxVoxelData,
    trueShapeId: 1,
    hooks: {},
    process(data, DVEB) {
        let topUV = DVEB.textureManager.getTextureUV("solid", "debug", "top");
        let bottomUV = DVEB.textureManager.getTextureUV("solid", "debug", "bottom");
        let northUV = DVEB.textureManager.getTextureUV("solid", "debug", "north");
        let southUV = DVEB.textureManager.getTextureUV("solid", "debug", "south");
        let eastUV = DVEB.textureManager.getTextureUV("solid", "debug", "east");
        let westUV = DVEB.textureManager.getTextureUV("solid", "debug", "west");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(topUV);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(bottomUV);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(westUV);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(eastUV);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(northUV);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(southUV);
        }
        data.shapeTemplate.push(this.trueShapeId);
        data.shapeStateTemplate.push(0);
        DVEB.processor.processVoxelLight(data);
    },
};

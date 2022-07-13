import { DreamStoneVoxelData } from "./DreamStone.voxel.data.js";
export const DreamStoneVoxelBuilderThread = {
    data: DreamStoneVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        let topUV = DVEB.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        let bottomUV = DVEB.textureManager.getTextureUV("solid", "dreamstone");
        let sideUV = DVEB.textureManager.getTextureUV("solid", "dreamstone", "grassy-side");
        if (data.voxelState == "no-grass") {
            sideUV = bottomUV;
            topUV = bottomUV;
        }
        //top
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(topUV);
        }
        else {
            sideUV = bottomUV;
        }
        if (data.voxelState == "no-grass") {
            sideUV = bottomUV;
        }
        //bottom
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(bottomUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //east
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //west
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //south face
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //north face
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        data.shapeTemplate.push(this.trueShapeId);
        DVEB.processor.processVoxelLight(data);
        return;
    },
};

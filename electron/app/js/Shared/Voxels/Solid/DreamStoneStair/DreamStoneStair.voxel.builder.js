import { DreamStoneStairVoxelData } from "./DreamStoneStair.voxel.data.js";
export const DreamStoneStairVoxelBuilderThread = {
    data: DreamStoneStairVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        // let uv = DVEB.textureManager.getTextureUV("solid", "debug", "top");
        let uv = DVEB.textureManager.getTextureUV("solid", "dreamstone");
        //top
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //bottom
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //east
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //west
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //south face
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //north face
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        DVEB.processor.processVoxelLight(data);
        return;
    },
};

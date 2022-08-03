import { DataHolderVoxelData } from "./DataHolder.voxel.data.js";
export const DataHolderVoxelBuilderThread = {
    data: DataHolderVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        let frontUV = DVEB.textureManager.getTextureUV("solid", "data-holder", "front");
        let sideUV = DVEB.textureManager.getTextureUV("solid", "data-holder");
        console.log(frontUV);
        //top
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(sideUV);
        }
        //bottom
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(sideUV);
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
            data.uvTemplate.push(frontUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        //north face
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        DVEB.processor.processVoxelLight(data);
        return;
    },
};

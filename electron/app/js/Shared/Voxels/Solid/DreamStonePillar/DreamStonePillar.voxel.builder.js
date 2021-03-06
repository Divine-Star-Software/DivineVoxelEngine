import { DreamStonePillarVoxelData } from "./DreamStonePillar.voxel.data.js";
export const DreamStonePillarVoxelBuilderThread = {
    data: DreamStonePillarVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        let topBottomUV = DVEB.textureManager.getTextureUV("solid", "dreamstone-pillar", "top");
        let sideUV = DVEB.textureManager.getTextureUV("solid", "dreamstone-pillar");
        let sideTopUV = DVEB.textureManager.getTextureUV("solid", "dreamstone-pillar", "side-top");
        /*   let sideBottom = DVEB.textureManager.getTextureUV(
         "solid",
         "dreamstone-pillar",
         "side-bottom"
        );
       */
        if (!DVEB.processor.worldMatrix.sameVoxel(data.x, data.y, data.z, data.x, data.y + 1, data.z)) {
            sideUV = sideTopUV;
        }
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(topBottomUV);
            sideUV = sideTopUV;
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(topBottomUV);
            data.overlayUVTemplate.push(0);
        }
        if (data.exposedFaces[0] && data.exposedFaces[1]) {
            sideUV = topBottomUV;
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        DVEB.processor.processVoxelLight(data);
    },
};

const uvs = [];
export const DreadStonePillarVoxelBuilderThread = {
    id: "dve:dreadstonepillar",
    hooks: {
        texturesRegistered: (DVEB) => {
            uvs.push(DVEB.textureManager.getTextureUV("solid", "dreadstone-pillar", "top"), DVEB.textureManager.getTextureUV("solid", "dreadstone-pillar"), DVEB.textureManager.getTextureUV("solid", "dreadstone-pillar", "side-top"));
        },
    },
    process: function (data, DVEB) {
        let topBottomUV = uvs[0];
        let sideUV = uvs[1];
        let sideTopUV = uvs[2];
        if (!DVEB.processor.mDataTool.isSameVoxel(data.x, data.y + 1, data.z)) {
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

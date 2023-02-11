const uvs = [];
export const DreamStoneVoxelBuilderThread = {
    id: "dve_dreamstone",
    hooks: {
        texturesRegistered: (DVEB) => {
            uvs.push(DVEB.textureManager.getTextureUV("#dve_solid", "dreamstone", "grassy-top"), DVEB.textureManager.getTextureUV("#dve_solid", "dreamstone"), DVEB.textureManager.getTextureUV("#dve_solid", "dreamstone", "grassy-side"));
        },
    },
    process: function (data, DVEB) {
        let topUV = uvs[0];
        let bottomUV = uvs[1];
        let sideUV = uvs[2];
        if (data.voxelState == 1) {
            sideUV = bottomUV;
            topUV = bottomUV;
        }
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(topUV);
        }
        else {
            sideUV = bottomUV;
        }
        if (data.voxelState == 1) {
            sideUV = bottomUV;
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(bottomUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
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
        return;
    },
};

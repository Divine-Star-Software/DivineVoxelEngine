let frontUV = 0;
let sideUV = 0;
export const DataHolderVoxelBuilderThread = {
    id: "dve_dataholder",
    hooks: {
        texturesRegistered: (DVEB) => {
            frontUV = DVEB.textureManager.getTextureUV("#dve_solid", "data-holder", "front");
            sideUV = DVEB.textureManager.getTextureUV("#dve_solid", "data-holder");
        },
    },
    process: function (data, DVEB) {
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(sideUV);
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
            data.uvTemplate.push(frontUV);
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

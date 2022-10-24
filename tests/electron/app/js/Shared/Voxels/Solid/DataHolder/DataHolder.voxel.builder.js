let frontUV = 0;
let sideUV = 0;
export const DataHolderVoxelBuilderThread = {
    id: "dve:dataholder",
    hooks: {
        texturesRegistered: (DVEB) => {
            frontUV = DVEB.textureManager.getTextureUV("solid", "data-holder", "front");
            sideUV = DVEB.textureManager.getTextureUV("solid", "data-holder");
        },
    },
    process: function (data, DVEB) {
        //top
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(sideUV);
            data.overlayUVTemplate.push(0, 0, 0, 0);
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

let uv = 0;
export const LiquidDreadEtherVoxelBuilderThread = {
    id: "dve:liquiddreadether",
    hooks: {
        texturesRegistered: (DVEB) => {
            uv = DVEB.textureManager.getTextureUV("fluid", "liquid-dread-ether", "still-1");
        },
    },
    process: function (data, DVEB) {
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        DVEB.processor.processVoxelLight(data, true);
    },
};

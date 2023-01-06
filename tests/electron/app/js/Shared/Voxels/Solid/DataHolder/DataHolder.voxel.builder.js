let frontUV = 0;
let sideUV = 0;
export const DataHolderVoxelBuilderThread = {
    id: "dve_dataholder",
    hooks: {
        texturesRegistered: (DVEB) => {
            frontUV = DVEB.textureManager.getTextureUV("solid", "data-holder", "front");
            sideUV = DVEB.textureManager.getTextureUV("solid", "data-holder");
        },
    },
    process(templater) {
        if (templater.isFaceExpposed("top")) {
            templater.addUV(sideUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("bottom")) {
            templater.addUV(sideUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("east")) {
            templater.addUV(sideUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("west")) {
            templater.addUV(sideUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("south")) {
            templater.addUV(frontUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("north")) {
            templater.addUV(sideUV).addOverlayUVs([0]);
        }
        templater.processVoxelLight();
    },
};

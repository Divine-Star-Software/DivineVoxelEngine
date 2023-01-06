let topUV = 0;
let bottomUV = 0;
let northUV = 0;
let southUV = 0;
let eastUV = 0;
let westUV = 0;
export const DebugBoxVoxelBuilderThread = {
    id: "dve_debugbox",
    hooks: {
        texturesRegistered: (DVEB) => {
            topUV = DVEB.textureManager.getTextureUV("solid", "debug", "top");
            bottomUV = DVEB.textureManager.getTextureUV("solid", "debug", "bottom");
            northUV = DVEB.textureManager.getTextureUV("solid", "debug", "north");
            southUV = DVEB.textureManager.getTextureUV("solid", "debug", "south");
            eastUV = DVEB.textureManager.getTextureUV("solid", "debug", "east");
            westUV = DVEB.textureManager.getTextureUV("solid", "debug", "west");
        },
    },
    process(templater) {
        if (templater.isFaceExpposed("top")) {
            templater.addUV(topUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("bottom")) {
            templater.addUV(bottomUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("east")) {
            templater.addUV(eastUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("west")) {
            templater.addUV(westUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("south")) {
            templater.addUV(southUV).addOverlayUVs([0]);
        }
        if (templater.isFaceExpposed("north")) {
            templater.addUV(northUV).addOverlayUVs([0]);
        }
        templater.processVoxelLight();
    },
};

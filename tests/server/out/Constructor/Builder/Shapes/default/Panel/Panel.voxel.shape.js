import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
let animationState = 0;
const shapeStates = {
    0: (mesher) => {
        mesher.templateData.loadIn("top");
        mesher.quad
            .setDirection("south")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 0.05)
            .create();
        mesher.templateData.loadIn("bottom");
        mesher.quad
            .setDirection("north")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 0.05)
            .create();
    },
    1: (mesher) => {
        mesher.templateData.loadIn("top");
        mesher.quad
            .setDirection("north")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 0.95)
            .create();
        mesher.templateData.loadIn("bottom");
        mesher.quad
            .setDirection("south")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 0.95)
            .create();
    },
    2: (mesher) => {
        mesher.templateData.loadIn("top");
        mesher.quad
            .setDirection("east")
            .addData(1, animationState)
            .updatePosition(0.95, 0.5, 0.5)
            .create();
        mesher.templateData.loadIn("bottom");
        mesher.quad
            .setDirection("west")
            .addData(1, animationState)
            .updatePosition(0.95, 0.5, 0.5)
            .create();
    },
    3: (mesher) => {
        mesher.templateData.loadIn("top");
        mesher.quad
            .setDirection("west")
            .addData(1, animationState)
            .updatePosition(0.05, 0.5, 0.5)
            .create();
        mesher.templateData.loadIn("bottom");
        mesher.quad
            .setDirection("east")
            .addData(1, animationState)
            .updatePosition(0.05, 0.5, 0.5)
            .create();
    },
    4: (mesher) => {
        mesher.templateData.loadIn("top");
        mesher.quad
            .setDirection("top")
            .addData(1, animationState)
            .updatePosition(0.5, 0.05, 0.5)
            .create();
        mesher.templateData.loadIn("bottom");
        mesher.quad
            .setDirection("bottom")
            .addData(1, animationState)
            .updatePosition(0.5, 0.05, 0.5)
            .create();
    },
    5: (mesher) => {
        mesher.templateData.loadIn("top");
        mesher.quad
            .setDirection("bottom")
            .addData(1, animationState)
            .updatePosition(0.5, 0.95, 0.5)
            .create();
        mesher.templateData.loadIn("bottom");
        mesher.quad
            .setDirection("top")
            .addData(1, animationState)
            .updatePosition(0.5, 0.95, 0.5)
            .create();
    },
};
export const PanelVoxelShape = {
    id: "#dve_panel",
    build(mesher) {
        animationState = 0;
        if (mesher.data.getSubstance() == "#dve_flora") {
            animationState = 2;
        }
        mesher.quad.setDimensions(1, 1);
        const shapeState = mesher.data.getShapeState();
        shapeStates[shapeState](mesher);
    },
};
OverrideManager.registerOverride("CullFace", "Panel", "Any", (data) => {
    if (data.currentVoxel.getSubstance() == "#dve_flora") {
        return false;
    }
    return data.default;
});

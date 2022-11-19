import { OverrideManager } from "../../../Overrides/OverridesManager.js";
export const HalfBoxVoxelShape = {
    id: "HalfBox",
    build(mesher) {
        mesher.quad.setDimensions(1, 1);
        let animationState = 0;
        if (mesher.data.getSubstance() == "flora") {
            animationState = 3;
        }
        const shapeState = mesher.data.getShapeState();
        let yAdd = 0;
        if (shapeState == 1) {
            yAdd = 0.5;
        }
        if (mesher.templateData.loadIn("top").isExposed()) {
            mesher.quad
                .setDirection("top")
                .updatePosition(0.5, 0.5 + yAdd, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("bottom").isExposed()) {
            mesher.quad
                .setDirection("bottom")
                .updatePosition(0.5, 0 + yAdd, 0.5)
                .addData(4, animationState)
                .create();
        }
        mesher.quad.setDimensions(1, 0.5).uvs.setWidth(0, 1).setHeight(0, 0.5);
        if (mesher.templateData.loadIn("east").isExposed()) {
            mesher.quad
                .setDirection("east")
                .updatePosition(1, 0.25 + yAdd, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("west").isExposed()) {
            mesher.quad
                .setDirection("west")
                .updatePosition(0, 0.25 + yAdd, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("south").isExposed()) {
            mesher.quad
                .setDirection("south")
                .updatePosition(0.5, 0.25 + yAdd, 0)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("north").isExposed()) {
            mesher.quad
                .setDirection("north")
                .updatePosition(0.5, 0.25 + yAdd, 1)
                .addData(4, animationState)
                .create();
        }
    },
};
//cullface
OverrideManager.registerOverride("CullFace", "HalfBox", "Panel", (data) => {
    return false;
});
OverrideManager.registerOverride("CullFace", "HalfBox", "Box", (data) => {
    if (data.face == "bottom") {
        if (data.currentVoxel.getShapeState() == 0) {
            return false;
        }
    }
    if (data.face == "top") {
        if (data.currentVoxel.getShapeState() == 1) {
            return false;
        }
    }
    return true;
});
OverrideManager.registerOverride("CullFace", "HalfBox", "Stair", (data) => {
    return data.default;
});
//AO
OverrideManager.registerOverride("AO", "HalfBox", "Panel", (data) => {
    return false;
});
OverrideManager.registerOverride("AO", "HalfBox", "Box", (data) => {
    const shapeState = data.currentVoxel.getShapeState();
    if (shapeState == 1) {
        if (data.face == "top") {
            if (data.neighborVoxel.position.y > data.currentVoxel.position.y) {
                return true;
            }
        }
        if (data.neighborVoxel.position.y == data.currentVoxel.position.y) {
            return true;
        }
        return false;
    }
    return data.default;
});

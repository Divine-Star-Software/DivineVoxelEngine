import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
export const BoxVoxelShape = {
    id: "#dve_box",
    build(mesher) {
        mesher.quad.setDimensions(1, 1);
        let animationState = 0;
        if (mesher.data.getSubstance() == "#dve_flora") {
            animationState = 3;
        }
        if (mesher.templateData.loadIn("top").isExposed()) {
            mesher.quad
                .setDirection("top")
                .updatePosition(0.5, 1, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("bottom").isExposed()) {
            mesher.quad
                .setDirection("bottom")
                .updatePosition(0.5, 0, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("east").isExposed()) {
            mesher.quad
                .setDirection("east")
                .updatePosition(1, 0.5, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("west").isExposed()) {
            mesher.quad
                .setDirection("west")
                .updatePosition(0, 0.5, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("south").isExposed()) {
            mesher.quad
                .setDirection("south")
                .updatePosition(0.5, 0.5, 0)
                .addData(4, animationState)
                .create();
        }
        if (mesher.templateData.loadIn("north").isExposed()) {
            mesher.quad
                .setDirection("north")
                .updatePosition(0.5, 0.5, 1)
                .addData(4, animationState)
                .create();
        }
    },
};
//cull leaf faces
const BoxCullFunctions = {
    top: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] + 1, data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] + 2, data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    bottom: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] - 1, data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] - 2, data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    east: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] + 1, data.currentVoxel.location[2], data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] + 2, data.currentVoxel.location[2], data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    west: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] - 1, data.currentVoxel.location[2], data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] - 2, data.currentVoxel.location[2], data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    north: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] + 1) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] + 2)) {
            return false;
        }
        return data.default;
    },
    south: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] - 1) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] - 2)) {
            return false;
        }
        return data.default;
    },
};
//cullface
OverrideManager.registerOverride("CullFace", "#dve_box", "#dve_box", (data) => {
    return BoxCullFunctions[data.face](data);
});
OverrideManager.registerOverride("CullFace", "#dve_box", "Panel", (data) => {
    return true;
});
OverrideManager.registerOverride("CullFace", "#dve_box", "#dve_halfbox", (data) => {
    if (data.face == "top") {
        if (data.neighborVoxel.getShapeState() == 0) {
            return true;
        }
        return false;
    }
    return true;
});
OverrideManager.registerOverride("CullFace", "#dve_box", "#dve_stair", (data) => {
    StairCullFunctions[data.face](data);
    return true;
});
//ao
OverrideManager.registerOverride("AO", "#dve_box", "Panel", (data) => {
    return false;
});
OverrideManager.registerOverride("AO", "#dve_box", "#dve_half_box", (data) => {
    if (data.face == "top") {
        if (data.neighborVoxel.getShapeState() == 0) {
            return true;
        }
        return false;
    }
    return true;
});
const StairCullFunctions = {
    top: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if ((neighborVoxelShapeState >= 0 && neighborVoxelShapeState <= 3) ||
            (neighborVoxelShapeState >= 8 && neighborVoxelShapeState <= 11)) {
            return false;
        }
        return true;
    },
    bottom: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if ((neighborVoxelShapeState >= 4 && neighborVoxelShapeState <= 7) ||
            (neighborVoxelShapeState >= 12 && neighborVoxelShapeState <= 15)) {
            return false;
        }
        return true;
    },
    east: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 1 || neighborVoxelShapeState == 5)
            return false;
        return true;
    },
    west: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 3 || neighborVoxelShapeState == 7)
            return false;
        return true;
    },
    north: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 0 || neighborVoxelShapeState == 4)
            return false;
        return true;
    },
    south: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 2 || neighborVoxelShapeState == 6)
            return false;
        return true;
    },
};

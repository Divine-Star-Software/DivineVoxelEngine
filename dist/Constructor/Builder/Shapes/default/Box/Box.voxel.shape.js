import { VoxelMesher } from "../../../Tools/VoxelMesher.js";
export const BoxVoxelShape = {
    id: "Box",
    cullFaceOverrideFunctions: {},
    aoAddOverrideFunctions: {},
    aoFlipOverrideFunctions: {},
    registerShapeForCullFaceOverride(shapeId, func) {
        this.cullFaceOverrideFunctions[shapeId] = func;
    },
    registerShapeAOAddOverride(shapeId, func) {
        this.aoAddOverrideFunctions[shapeId] = func;
    },
    cullFaceOverride(data) {
        if (this.cullFaceOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
            return this.cullFaceOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](data);
        }
        const neighborShape = data.neighborVoxel.getVoxelShapeObj();
        if (neighborShape.id == "HalfBox") {
            if (data.neighborVoxel.getShapeState() == 0 && data.face == "top") {
                return false;
            }
        }
        if (neighborShape.id == "Stair") {
            return stairCull(data);
        }
        return data.default;
    },
    aoAddOverride(data) {
        if (this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
            return this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](data);
        }
        const neighborShape = data.neighborVoxel.getVoxelShapeObj();
        if (neighborShape.id == "HalfBox") {
            if (data.face == "top") {
                if (data.neighborVoxel.getShapeState() == 0) {
                    return true;
                }
                return false;
            }
        }
        if (neighborShape.id == "Box") {
            return true;
        }
        if (neighborShape.id == "Panel") {
            return false;
        }
        return data.default;
    },
    registerShapeAOFlipOverride(shapeId, func) {
        this.aoAddOverrideFunctions[shapeId] = func;
    },
    aoFlipOverride(data) {
        return false;
    },
    addToChunkMesh() {
        VoxelMesher.quad.setDimensions(1, 1);
        let animationState = 0;
        if (VoxelMesher.data.getSubstance() == "flora") {
            animationState = 3;
        }
        if (VoxelMesher.templateData.loadIn("top").isExposed()) {
            VoxelMesher.quad
                .setDirection("top")
                .updatePosition(0.5, 1, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (VoxelMesher.templateData.loadIn("bottom").isExposed()) {
            VoxelMesher.quad
                .setDirection("bottom")
                .updatePosition(0.5, 0, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (VoxelMesher.templateData.loadIn("east").isExposed()) {
            VoxelMesher.quad
                .setDirection("east")
                .updatePosition(1, 0.5, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (VoxelMesher.templateData.loadIn("west").isExposed()) {
            VoxelMesher.quad
                .setDirection("west")
                .updatePosition(0, 0.5, 0.5)
                .addData(4, animationState)
                .create();
        }
        if (VoxelMesher.templateData.loadIn("south").isExposed()) {
            VoxelMesher.quad
                .setDirection("south")
                .updatePosition(0.5, 0.5, 0)
                .addData(4, animationState)
                .create();
        }
        if (VoxelMesher.templateData.loadIn("north").isExposed()) {
            VoxelMesher.quad
                .setDirection("north")
                .updatePosition(0.5, 0.5, 1)
                .addData(4, animationState)
                .create();
        }
    },
};
const stairCullFunctions = {
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
const stairCull = (data) => {
    return stairCullFunctions[data.face](data);
};

import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import { buildStair, stairCachedPosition } from "./StairBuilder.js";
import { StairData } from "./StairData.js";
import { StairAOBoxOverrides } from "./StairAO.overrides.js";
import { StairCullFace } from "./Stair.cullface.js";
export const StairVoxelShape = {
    id: "Stair",
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
        if (this.cullFaceOverrideFunctions[data.neighborVoxelShape.id]) {
            return this.cullFaceOverrideFunctions[data.neighborVoxelShape.id](data);
        }
        return StairCullFace(data);
    },
    aoAddOverride(data) {
        if (this.aoAddOverrideFunctions[data.neighborVoxelShape.id]) {
            return this.aoAddOverrideFunctions[data.neighborVoxelShape.id](data);
        }
        return data.substanceResult;
    },
    registerShapeAOFlipOverride(shapeId, func) {
        this.aoAddOverrideFunctions[shapeId] = func;
    },
    aoFlipOverride(data) {
        if (data.face == "top" || data.face == "bottom")
            return true;
        return false;
    },
    addToChunkMesh(data) {
        stairCachedPosition.x = data.position.x;
        stairCachedPosition.y = data.position.y;
        stairCachedPosition.z = data.position.z;
        if (StairData[data.shapeState] !== undefined) {
            buildStair(data, StairData[data.shapeState]);
        }
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
StairVoxelShape.registerShapeAOAddOverride("Box", (data) => {
    return data.substanceResult;
    if (StairAOBoxOverrides[data.shapeState]) {
        return StairAOBoxOverrides[data.shapeState](data);
    }
    return false;
});

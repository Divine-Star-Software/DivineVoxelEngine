import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import { buildStair, stairCachedPosition } from "./StairBuilder.js";
import { exposedChecks, StairData } from "./StairData.js";
import { StairAOBoxOverrides } from "./StairAO.overrides.js";
export const StairVoxelShape = {
    id: "Stair",
    cullFaceFunctions: {},
    aoOverRideFunctions: {},
    registerShapeForCullFaceOverRide(shapeId, func) {
        this.cullFaceFunctions[shapeId] = func;
    },
    registerShapeAOAddOverRide(shapeId, func) {
        this.aoOverRideFunctions[shapeId] = func;
    },
    cullFace(data) {
        if (this.cullFaceFunctions[data.neighborVoxelShape.id]) {
            return this.cullFaceFunctions[data.neighborVoxelShape.id](data);
        }
        if (exposedChecks[data.shapeState]) {
            return exposedChecks[data.shapeState](data);
        }
        return true;
    },
    aoOverRide(data) {
        if (this.aoOverRideFunctions[data.neighborVoxelShape.id]) {
            return this.aoOverRideFunctions[data.neighborVoxelShape.id](data);
        }
        return data.substanceResult;
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
StairVoxelShape.registerShapeAOAddOverRide("Box", (data) => {
    return data.substanceResult;
    if (StairAOBoxOverrides[data.shapeState]) {
        return StairAOBoxOverrides[data.shapeState](data);
    }
    return false;
});

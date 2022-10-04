import { VoxelSubstanceMap, VoxelSubstanceRecord } from "../../Constants/Voxels/VoxelData.js";
import { DVEW } from "../DivineVoxelEngineWorld.js";
export const MatrixMap = {
    shapeMap: {},
    substanceMap: VoxelSubstanceMap,
    substanceRecord: VoxelSubstanceRecord,
    __shapeMapSet: false,
    isReady() {
        if (DVEW.environment == "node") {
            return true;
        }
        else {
            return this.__shapeMapSet;
        }
    },
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        this.__shapeMapSet = true;
    },
    flush() {
        this.shapeMap = null;
    },
};

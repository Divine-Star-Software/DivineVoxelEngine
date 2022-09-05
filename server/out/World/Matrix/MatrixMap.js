import { DVEW } from "../DivineVoxelEngineWorld.js";
export const MatrixMap = {
    shapeMap: {},
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

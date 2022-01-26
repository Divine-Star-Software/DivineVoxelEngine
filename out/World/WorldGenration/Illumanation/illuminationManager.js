import { RGBFloodFillCheckNeighbors, RGBFloodFill, RGBFloodFillSetAirLightVoxels, RGBFloodFillUpdateAirLightVoxel, } from "./Functions/RGBFloodFill.js";
import { RGBFloodFill2, RunRGBLightUpdate } from "./Functions/RGBFloodFill2.js";
import { RGBFloodRemove, RGBFloodRemoveCheckNeighors, RGBFloodRemoveSetAirLightVoxel, RGBFloodRemoveUpdateAirLightVoxel, } from "./Functions/RGBFloodRemove.js";
export class IlluminationManager {
    DVEW;
    lightByte;
    air = [-1, 0, 0];
    airSeed = [-1, 0, 0];
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.lightByte = this.DVEW.UTIL.getLightByte();
    }
    RGBFloodFillCheckNeighbors = RGBFloodFillCheckNeighbors;
    RGBFloodFillSetAirLightVoxel = RGBFloodFillSetAirLightVoxels;
    RGBFloodFillUpdateAirLightVoxel = RGBFloodFillUpdateAirLightVoxel;
    RGBFloodFill = RGBFloodFill;
    RGBFloodFill2 = RGBFloodFill2;
    runRGBLightUpdate = RunRGBLightUpdate;
    lightUpdateQue = [];
    lightRemovalQue = [];
    RGBFloodRemoveCheckNeighbors = RGBFloodRemoveCheckNeighors;
    RGBFloodRemoveSetAirVoxel = RGBFloodRemoveSetAirLightVoxel;
    RGBFloodRemoveUpdateAirVoxel = RGBFloodRemoveUpdateAirLightVoxel;
    RGBFloodRemove = RGBFloodRemove;
}

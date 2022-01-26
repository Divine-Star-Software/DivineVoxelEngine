import type { LightByte } from "Global/Util/LightByte";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { RGBFloodFillCheckNeighbors, RGBFloodFill, RGBFloodFillSetAirLightVoxels, RGBFloodFillUpdateAirLightVoxel } from "./Functions/RGBFloodFill.js";
import { RGBFloodFill2, RunRGBLightUpdate } from "./Functions/RGBFloodFill2.js";
import { RGBFloodRemove, RGBFloodRemoveCheckNeighors, RGBFloodRemoveSetAirLightVoxel, RGBFloodRemoveUpdateAirLightVoxel } from "./Functions/RGBFloodRemove.js";
export declare class IlluminationManager {
    DVEW: DivineVoxelEngineWorld;
    lightByte: LightByte;
    air: number[];
    airSeed: number[];
    constructor(DVEW: DivineVoxelEngineWorld);
    RGBFloodFillCheckNeighbors: typeof RGBFloodFillCheckNeighbors;
    RGBFloodFillSetAirLightVoxel: typeof RGBFloodFillSetAirLightVoxels;
    RGBFloodFillUpdateAirLightVoxel: typeof RGBFloodFillUpdateAirLightVoxel;
    RGBFloodFill: typeof RGBFloodFill;
    RGBFloodFill2: typeof RGBFloodFill2;
    runRGBLightUpdate: typeof RunRGBLightUpdate;
    lightUpdateQue: number[][];
    lightRemovalQue: number[][];
    RGBFloodRemoveCheckNeighbors: typeof RGBFloodRemoveCheckNeighors;
    RGBFloodRemoveSetAirVoxel: typeof RGBFloodRemoveSetAirLightVoxel;
    RGBFloodRemoveUpdateAirVoxel: typeof RGBFloodRemoveUpdateAirLightVoxel;
    RGBFloodRemove: typeof RGBFloodRemove;
}

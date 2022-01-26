import type { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { RGBFloodFill, RGBFloodRemove, RunRGBLightUpdate } from "./Functions/RGBFloodLight.js";
import { sunLightUpdate } from "./Functions/SunLight.js";
export declare class IlluminationManager {
    DVEW: DivineVoxelEngineWorld;
    lightByte: LightByte;
    air: number[];
    sunLightUpdate: typeof sunLightUpdate;
    RGBFloodFill: typeof RGBFloodFill;
    RGBFloodRemove: typeof RGBFloodRemove;
    runRGBLightUpdate: typeof RunRGBLightUpdate;
    _RGBlightUpdateQue: number[][];
    _RGBlightRemovalQue: number[][];
    _sunLightUpdateQue: number[][];
    constructor(DVEW: DivineVoxelEngineWorld);
    populateChunkAirWithInitlSunLight(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
}

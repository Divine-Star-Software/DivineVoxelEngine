import type { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { RGBFloodFill, RGBFloodRemove, runRGBLightUpdate } from "./Functions/RGBFloodLight.js";
import { runSunLightRemove, sunLightUpdate } from "./Functions/SunLight.js";
export declare class IlluminationManager {
    DVEW: DivineVoxelEngineWorld;
    lightByte: LightByte;
    air: number[];
    sunLightUpdate: typeof sunLightUpdate;
    runSunLightRemove: typeof runSunLightRemove;
    RGBFloodFill: typeof RGBFloodFill;
    RGBFloodRemove: typeof RGBFloodRemove;
    runRGBLightUpdate: typeof runRGBLightUpdate;
    _RGBlightUpdateQue: number[][];
    _RGBlightRemovalQue: number[][];
    _sunLightUpdateQue: number[][];
    _sunLightRemoveQue: number[][];
    constructor(DVEW: DivineVoxelEngineWorld);
    addChunkToSunLightUpdate(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
    populateChunkAirWithInitlSunLight(chunk: ChunkData): void;
}

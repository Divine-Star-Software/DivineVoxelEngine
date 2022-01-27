import type { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { runRGBFloodFillAt, runRGBFloodRemove, runRGBFloodRemoveAt, runRGBFloodFill } from "./Functions/RGBFloodLight.js";
import { runSunLightRemove, runSunLightRemoveAt, runSunLightUpdate, runSunLightUpdateAt } from "./Functions/SunLight.js";
export declare class IlluminationManager {
    DVEW: DivineVoxelEngineWorld;
    lightByte: LightByte;
    air: number[];
    runSunLightUpdateAt: typeof runSunLightUpdateAt;
    runSunLightUpdate: typeof runSunLightUpdate;
    runSunLightRemove: typeof runSunLightRemove;
    runSunLightRemoveAt: typeof runSunLightRemoveAt;
    runRGBFloodFillAt: typeof runRGBFloodFillAt;
    runRGBFloodFill: typeof runRGBFloodFill;
    runRGBFloodRemoveAt: typeof runRGBFloodRemoveAt;
    runRGBFloodRemove: typeof runRGBFloodRemove;
    _RGBlightUpdateQue: number[][];
    _RGBlightRemovalQue: number[][];
    _sunLightUpdateQue: number[][];
    _sunLightRemoveQue: number[][];
    constructor(DVEW: DivineVoxelEngineWorld);
    addChunkToSunLightUpdate(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
    populateChunkAirWithInitlSunLight(chunk: ChunkData): void;
}

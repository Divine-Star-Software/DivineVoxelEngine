import type { ChunkVoxels, ChunkData } from "Meta/Chunks/Chunk.types";
import { GetRelativeVoxelData, GetVoxelData } from "./Functions/GetVoxelData.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
import { InfoByte } from "Global/Util/InfoByte.js";
import { LightByte } from "Global/Util/LightByte.js";
export declare class WorldData {
    DVEW: DivineVoxelEngineWorld;
    renderDistance: number;
    private chunkProccesor;
    chunks: Record<string, ChunkData>;
    getVoxelData: typeof GetVoxelData;
    getRelativeVoxelData: typeof GetRelativeVoxelData;
    calculdateVoxelLight: typeof CalculateVoxelLight;
    voxelLightMixCalc: typeof VoxelLightMixCalc;
    infoByte: InfoByte;
    lightByte: LightByte;
    constructor(DVEW: DivineVoxelEngineWorld);
    getCurrentWorldDataSize(): number;
    getCurrentWorldDataString(): string;
    getChunk(chunkX: number, chunkY: number, chunkZ: number): ChunkData | false;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    setChunk(chunkX: number, chunkY: number, chunkZ: number, chunk: ChunkData): void;
    getChunkPosition(x: number, y: number, z: number): number[];
    requestVoxelAdd(chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number, voxelPalletId?: number): false | ChunkVoxels;
    _checkNearbyChunksToRebuild(chunkX: number, chunkY: number, chunkZ: number, relativeX: number, relativeZ: number): void;
    _getRelativeChunkPosition(chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): number[];
    requestVoxelBeRemove(chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number, blockId?: number): false | ChunkVoxels;
}

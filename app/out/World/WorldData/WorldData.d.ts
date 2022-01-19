import type { ChunkVoxels, ChunkData } from "Meta/WorldData/World.types.js";
import { GetRealtiveVoxelData } from "./Functions/GetVoxelData.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
import { InfoByte } from "Global/Util/InfoByte.js";
export declare class WorldData {
    DVEW: DivineVoxelEngineWorld;
    renderDistance: number;
    private chunkProccesor;
    chunks: Record<number, Record<number, ChunkData>>;
    getRealtiveVoxelData: typeof GetRealtiveVoxelData;
    calculdateVoxelLight: typeof CalculateVoxelLight;
    voxelLightMixCalc: typeof VoxelLightMixCalc;
    infoByte: InfoByte;
    constructor(DVEW: DivineVoxelEngineWorld);
    getCurrentWorldDataSize(): number;
    getCurrentWorldDataString(): string;
    getChunk(chunkX: number, chunkZ: number): ChunkData | false;
    removeChunk(chunkX: number, chunkZ: number): void;
    setChunk(chunkX: number, chunkZ: number, chunk: ChunkData): void;
    requestVoxelAdd(chunkX: number, chunkZ: number, x: number, y: number, z: number, voxelPalletId?: number): false | ChunkVoxels;
    _checkNearbyChunksToRebuild(chunkX: number, chunkZ: number, relativeX: number, relativeZ: number): void;
    _getRelativeChunkPosition(chunkX: number, chunkZ: number, x: number, y: number, z: number): number[];
    requestBlockRemove(chunkX: number, chunkZ: number, x: number, y: number, z: number, blockId?: number): false | ChunkVoxels;
}

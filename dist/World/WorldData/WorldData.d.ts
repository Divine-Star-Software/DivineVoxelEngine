import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { VoxelData, VoxelSubstanceType } from "Meta/Voxels/Voxel.types.js";
import type { WorldRegion } from "Meta/World/WorldData/World.types.js";
/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export declare const WorldData: {
    regions: Record<string, WorldRegion>;
    chunks: Record<string, ChunkData>;
    _RGBLightRemoveQue: number[][];
    _RGBLightUpdateQue: number[][];
    _chunkRebuildQue: number[][];
    _chunkRebuildQueMap: Record<string, Record<VoxelSubstanceType | "all", boolean>>;
    infoByte: {
        maxBit: number;
        minBit: number;
        maxDec: number;
        minDec: number;
        byteValue: number;
        getNumberValue(): number;
        setNumberValue(newValue: number): void;
        getBit(index: number): 0 | 1;
        getBitsArray(bitIndex: number, byteLength: number): (0 | 1)[];
        getHalfByteDec(bitIndex: number): number;
        setHalfByteBits(index: number, value: number): void;
        setBit(index: number, value: 0 | 1): void;
        toArray(): (0 | 1)[];
        toString(delimiter?: string): string;
    };
    lightByte: {
        _lightValues: number[];
        getS(value: number): number;
        getR(value: number): number;
        getG(value: number): number;
        getB(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        setLightValues(values: number[]): number;
        getLightValues(value: number): number[];
        isLessThanForRGBRemove(n1: number, n2: number): boolean;
        isLessThanForRGBAdd(n1: number, n2: number): boolean;
        isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
        getMinusOneForRGB(sl: number): number;
        removeRGBLight(sl: number): number;
        getFullSunLight(sl: number): number;
        isLessThanForSunAdd(n1: number, n2: number): boolean;
        isLessThanForSunAddDown(n1: number, n2: number): boolean;
        getSunLightForUnderVoxel(currentVoxel: number): number;
        getMinusOneForSun(sl: number): number;
        isLessThanForSunRemove(n1: number, sl: number): boolean;
        isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
        sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
        removeSunLight(sl: number): number;
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    _3dArray: {
        bounds: {
            x: number;
            y: number;
            z: number;
        };
        _position: {
            x: number;
            y: number;
            z: number;
        };
        setBounds(x: number, y: number, z: number): void;
        getValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
        getValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
        setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
        setValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
        deleteUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
    };
    worldBounds: {
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __chunkPosition: {
            x: number;
            y: number;
            z: number;
        };
        __voxelPosition: {
            x: number;
            y: number;
            z: number;
        };
        syncBoundsWithFlat3DArray(flat3dArray: {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            getValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            deleteUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
        }): void;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("../../Meta/Util.types.js").PositionMatrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../../Meta/Util.types.js").PositionMatrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../../Meta/Util.types.js").PositionMatrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
    };
    getRGBLightUpdateQue(): number[][];
    clearRGBLightUpdateQue(): void;
    getRGBLightRemoveQue(): number[][];
    clearRGBLightRemoveQue(): void;
    getChunkRebuildQue(): number[][];
    getSubstanceNeededToRebuild(chunkX: number, chunkY: number, chunkZ: number): Record<VoxelSubstanceType | "all", boolean>;
    clearChunkRebuildQue(): void;
    runRebuildCheck(x: number, y: number, z: number): void;
    addToRebuildQue(x: number, y: number, z: number, substance: "all" | VoxelSubstanceType): void;
    getCurrentWorldDataSize(): number;
    getCurrentWorldDataString(): string;
    setAir(x: number, y: number, z: number, lightValue: number): void;
    setLight(x: number, y: number, z: number, lightValue: number): void;
    getLight(x: number, y: number, z: number): number;
    removeData(x: number, y: number, z: number): false | undefined;
    getData(x: number, y: number, z: number): number | false;
    setData(x: number, y: number, z: number, data: number): void | -1;
    getVoxel(x: number, y: number, z: number): [VoxelData | number, string | number, number] | false;
    addRegion(x: number, y: number, z: number): WorldRegion;
    getRegion(x: number, y: number, z: number): false | WorldRegion;
    addChunk(x: number, y: number, z: number): ChunkData;
    paintVoxel(voxelId: string, voxelStateId: string, x: number, y: number, z: number): void;
    insertData(x: number, y: number, z: number, data: number): void;
    getChunk(x: number, y: number, z: number): ChunkData | false;
    removeChunk(x: number, y: number, z: number): false | undefined;
    setChunk(x: number, y: number, z: number, chunk: ChunkData, doNotSyncInThreads?: boolean): void;
    requestVoxelAdd(voxelId: string, voxelStateId: string, x: number, y: number, z: number): void;
    requestVoxelBeRemoved(x: number, y: number, z: number): void;
};

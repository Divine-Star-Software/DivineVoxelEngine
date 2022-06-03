import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { VoxelData, VoxelTemplateSubstanceType } from "Meta/Voxels/Voxel.types.js";
import type { WorldRegion } from "Meta/World/WorldData/World.types.js";
import { PositionMatrix } from "Meta/Util.types.js";
/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export declare const WorldData: {
    regions: Record<string, WorldRegion>;
    heightByte: {
        heightMapArray: {
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
            getValueUseObj(position: PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            setValueUseObj(position: PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            deleteUseObj(position: PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): PositionMatrix;
        };
        positionByte: {
            _poisiton: {
                x: number;
                y: number;
                z: number;
            };
            getY(byteData: number): number;
            getPosition(byteData: number): {
                x: number;
                y: number;
                z: number;
            };
            setPosition(x: number, y: number, z: number): number;
            setPositionUseObj(positionObj: PositionMatrix): number;
        };
        _getHeightMapData: Record<VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        updateChunkMinMax(voxelPOS: PositionMatrix, minMax: Uint32Array): void;
        calculateHeightRemoveDataForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        isSubstanceExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
        markSubstanceAsExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        markSubstanceAsNotExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        setMinYForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMinYForSubstance(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        setMaxYForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMaxYForSubstance(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
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
        getValueUseObj(position: PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
        setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
        setValueUseObj(position: PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
        deleteUseObj(position: PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): PositionMatrix;
    };
    worldBounds: {
        __maxChunkYSize: number;
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
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
        syncBoundsWithArrays(): void;
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
        getChunkKey(chunkPOS: PositionMatrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: PositionMatrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: PositionMatrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: PositionMatrix): string;
        getWorldColumnKey(x: number, z: number): string;
    };
    runRebuildCheck(x: number, y: number, z: number): void;
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
    __handleHeightMapUpdateForVoxelAdd(voxelPOS: PositionMatrix, voxelData: VoxelData, chunk: ChunkData): void;
    __handleHeightMapUpdateForVoxelRemove(voxelPOS: PositionMatrix, voxelData: VoxelData, chunk: ChunkData): void;
    getChunk(x: number, y: number, z: number): ChunkData | false;
    removeChunk(x: number, y: number, z: number): false | undefined;
    setChunk(x: number, y: number, z: number, chunk: ChunkData, doNotSyncInThreads?: boolean): void;
    requestVoxelAdd(voxelId: string, voxelStateId: string, x: number, y: number, z: number): Promise<void>;
    requestVoxelBeRemoved(x: number, y: number, z: number): Promise<void>;
};

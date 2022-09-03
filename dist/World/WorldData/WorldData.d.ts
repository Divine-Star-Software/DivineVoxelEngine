import type { ChunkData } from "Meta/World/WorldData/Chunk.types";
import type { VoxelData } from "Meta/Voxels/Voxel.types.js";
import type { WorldRegion } from "Meta/World/WorldData/World.types.js";
import { Position3Matrix } from "Meta/Util.types.js";
/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export declare const WorldData: {
    regions: Record<string, WorldRegion>;
    heightByte: {
        _getHeightMapData: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        initalizeChunk(chunkData: DataView): void;
        updateChunkMinMax(voxelPOS: Position3Matrix, chunkData: DataView): void;
        getChunkMin(chunkData: DataView): number;
        getChunkMax(chunkData: DataView): number;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
        getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
        isSubstanceExposed(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
        markSubstanceAsExposed(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        markSubstanceAsNotExposed(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        setMinYForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMinYForSubstance(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
        setMaxYForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMaxYForSubstance(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
    };
    chunkReader: {
        chunkByteSize: number;
        indexSizes: {
            header: number;
            states: number;
            position: number;
            minMax: number;
            heightMap: number;
            voxelData: number; /**# World Data
             * ---
             * Handles all the game worlds data.
             * Also handles getting and setting data.
             */
            voxelStateData: number;
        };
        indexes: {
            header: number;
            states: number;
            position: number;
            minMax: number;
            heightMap: number;
            voxelData: number;
            voxelStateData: number;
        };
        byteLengths: {
            heightMapData: number;
            voxelData: number;
            voxelStateData: number;
        };
        syncSettings(): void;
        _getVoxelDataIndex(x: number, y: number, z: number): number;
        _getVoxelStateDataIndex(x: number, y: number, z: number): number;
        _chunkPositon: {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(chunk: DataView): {
            x: number;
            y: number;
            z: number;
        };
        setChunkPosition(chunk: DataView, position: Position3Matrix): void;
        getVoxelChunkDataIndex(x: number, y: number, z: number, secondary?: boolean): number;
        hmBounds: {
            x: number;
            y: number;
            z: number;
        };
        _getHeightMapIndex(x: number, y: number, z: number): number;
        getHeightMapIndex(x: number, y: number, z: number): number;
        getVoxelData(chunkData: DataView, x: number, y: number, z: number, secondary?: boolean): number;
        setVoxelData(chunkData: DataView, x: number, y: number, z: number, data: number, secondary?: boolean): void;
        getVoxelDataUseObj(chunkData: DataView, position: Position3Matrix, secondary?: boolean): number;
        setVoxelDataUseObj(chunkData: DataView, position: Position3Matrix, data: number, secondary?: boolean): void;
        getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
        setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
        getChunkMinData(chunkData: DataView): number;
        setChunkMinData(chunkData: DataView, data: number): void;
        getChunkMaxData(chunkData: DataView): number;
        setChunkMaxData(chunkData: DataView, data: number): void;
    };
    lightByte: {
        SRS: number;
        _lightValues: number[];
        getS(value: number): number;
        getR(value: number): number;
        getG(value: number): number;
        getB(value: number): number;
        setS(value: number, sl: number): number;
        setR(value: number, sl: number): number;
        setG(value: number, sl: number): number;
        setB(value: number, sl: number): number;
        removeS(sl: number): number;
        hasRGBLight(sl: number): boolean;
        getRGB(sl: number): number;
        setRGB(value: number, sl: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        setLightValues(values: number[]): number;
        getLightValues(value: number): number[];
        isLessThanForRGBRemove(n1: number, n2: number): boolean;
        isLessThanForRGBAdd(n1: number, n2: number): boolean;
        isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
        getMinusOneForRGB(sl: number, nl: number): number;
        removeRGBLight(sl: number): number;
        getFullSunLight(sl: number): number;
        isLessThanForSunAdd(n1: number, n2: number): boolean;
        isLessThanForSunAddDown(n1: number, n2: number): boolean;
        isLessThanForSunAddUp(n1: number, n2: number): boolean;
        getSunLightForUnderVoxel(sl: number, nl: number): number;
        getMinusOneForSun(sl: number, nl: number): number;
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
        decodeLevelFromVoxelData(stateData: number): number;
        encodeLevelIntoVoxelData(stateData: number, level: number): number;
        decodeLevelStateFromVoxelData(stateData: number): number;
        encodeLevelStateIntoVoxelData(stateData: number, levelState: number): number;
        getShapeState(voxelData: number): number;
        setShapeState(voxelData: number, shapeState: number): number;
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
        getValue(x: number, y: number, z: number, array: Uint32Array): number;
        getValueUseObj(position: Position3Matrix, array: Uint32Array): number;
        getValueUseObjSafe(position: Position3Matrix, array: Uint32Array): number;
        setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
        setValueUseObj(position: Position3Matrix, array: Uint32Array, value: number): void;
        setValueUseObjSafe(position: Position3Matrix, array: Uint32Array, value: number): void;
        deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
        deleteUseObj(position: Position3Matrix, array: Uint32Array): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): Position3Matrix;
    };
    worldBounds: {
        __maxChunkYSize: number;
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
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
        __worldColumnPosition: {
            x: number;
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
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
        isPositonInBounds(x: number, y: number, z: number): boolean;
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
        getChunkKey(chunkPOS: Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: Position3Matrix): {
            x: number;
            y: number;
            z: number;
        };
        getRichPositionKey(x: number, y: number, z: number): string;
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
            z: number;
        };
    };
    runRebuildCheck(x: number, y: number, z: number): void;
    __lightQueCheck(remove: boolean | undefined, x: number, y: number, z: number): void;
    runLightUpdateCheck(x: number, y: number, z: number, remove?: boolean): void;
    setAir(x: number, y: number, z: number, lightValue: number): void;
    setLight(x: number, y: number, z: number, lightValue: number): void;
    getLight(x: number, y: number, z: number): number;
    removeData(x: number, y: number, z: number): false | undefined;
    getLevelState(x: number, y: number, z: number): number;
    setLevelState(state: number, x: number, y: number, z: number): void;
    getData(x: number, y: number, z: number, state?: boolean): number | false;
    setData(x: number, y: number, z: number, data: number, state?: boolean): boolean;
    getVoxelPaletteId(voxelId: string, voxelStateId: number): number;
    getVoxel(x: number, y: number, z: number, secondary?: boolean): [VoxelData | number, string | number, number] | false;
    addRegion(x: number, y: number, z: number): WorldRegion;
    getRegion(x: number, y: number, z: number): false | WorldRegion;
    addChunk(x: number, y: number, z: number): ChunkData;
    paintVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): void;
    addOrGetChunk(x: number, y: number, z: number): ChunkData;
    _getStartingLevel(voxelData: VoxelData, stateData: number): number;
    paintDualVoxel(voxelId: string, voxelStateId: number, shapeState: number, secondVoxelId: string, secondVoxelStateId: number, x: number, y: number, z: number): void;
    __handleHeightMapUpdateForVoxelAdd(voxelPOS: Position3Matrix, voxelData: VoxelData, chunk: ChunkData): void;
    __handleHeightMapUpdateForVoxelRemove(voxelPOS: Position3Matrix, voxelData: VoxelData, chunk: ChunkData): void;
    getChunk(x: number, y: number, z: number): ChunkData | false;
    removeChunk(x: number, y: number, z: number): false | undefined;
    setChunk(x: number, y: number, z: number, chunk: ChunkData, doNotSyncInThreads?: boolean): void;
    __runLightRemoveAndUpdates(remove?: boolean, update?: boolean): Promise<void>;
    requestVoxelAdd(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): Promise<void>;
    requestVoxelBeRemoved(x: number, y: number, z: number): Promise<void>;
    getWorldColumn(x: number, z: number): false | Record<string, ChunkData> | undefined;
    getRelativeMaxWorldColumnHeight(x: number, z: number): number;
    getAbsoluteHeightOfWorldColumn(x: number, z: number): number;
    fillWorldCollumnWithChunks(x: number, z: number): void;
};

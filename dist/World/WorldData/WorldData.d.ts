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
        positionByte: {
            _poisiton: {
                x: number;
                y: number;
                z: number;
            };
            _positionMasks: {
                x: number;
                z: number;
                y: number;
            };
            getY(byteData: number): number;
            getPosition(byteData: number): {
                x: number;
                y: number;
                z: number;
            };
            setPosition(x: number, y: number, z: number): number;
            setPositionUseObj(positionObj: Position3Matrix): number;
        };
        _getHeightMapData: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        updateChunkMinMax(voxelPOS: Position3Matrix, minMax: Uint32Array): void;
        getChunkMin(minMax: Uint32Array): number;
        getChunkMax(minMax: Uint32Array): number;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        isSubstanceExposed(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
        markSubstanceAsExposed(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        markSubstanceAsNotExposed(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        setMinYForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMinYForSubstance(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        setMaxYForSubstance(height: number, substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMaxYForSubstance(substance: import("Meta/Voxels/Voxel.types.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
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
    setData(x: number, y: number, z: number, data: number, state?: boolean): void | -1;
    getVoxelPaletteId(voxelId: string, voxelStateId: string): number;
    getVoxel(x: number, y: number, z: number, secondary?: boolean): [VoxelData | number, string | number, number] | false;
    addRegion(x: number, y: number, z: number): WorldRegion;
    getRegion(x: number, y: number, z: number): false | WorldRegion;
    addChunk(x: number, y: number, z: number): ChunkData;
    paintVoxel(voxelId: string, voxelStateId: string, shapeState: number, x: number, y: number, z: number): void;
    addOrGetChunk(x: number, y: number, z: number): ChunkData;
    _getStartingLevel(voxelData: VoxelData, stateData: number): number;
    paintDualVoxel(voxelId: string, voxelStateId: string, shapeState: number, secondVoxelId: string, secondVoxelStateId: string, x: number, y: number, z: number): void;
    __handleHeightMapUpdateForVoxelAdd(voxelPOS: Position3Matrix, voxelData: VoxelData, chunk: ChunkData): void;
    __handleHeightMapUpdateForVoxelRemove(voxelPOS: Position3Matrix, voxelData: VoxelData, chunk: ChunkData): void;
    getChunk(x: number, y: number, z: number): ChunkData | false;
    removeChunk(x: number, y: number, z: number): false | undefined;
    setChunk(x: number, y: number, z: number, chunk: ChunkData, doNotSyncInThreads?: boolean): void;
    __runLightRemoveAndUpdates(remove?: boolean, update?: boolean): Promise<void>;
    requestVoxelAdd(voxelId: string, voxelStateId: string, shapeState: number, x: number, y: number, z: number): Promise<void>;
    requestVoxelBeRemoved(x: number, y: number, z: number): Promise<void>;
    getWorldColumn(x: number, z: number): false | Record<string, ChunkData> | undefined;
    getRelativeMaxWorldColumnHeight(x: number, z: number): number;
    getAbsoluteHeightOfWorldColumn(x: number, z: number): number;
    fillWorldCollumnWithChunks(x: number, z: number): void;
};

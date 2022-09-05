import type { MatrixLoadedChunk, MatrixLoadedRegion } from "../Meta/Matrix/Matrix.types";
import { VoxelManagerInterface } from "Meta/Voxels/VoxelManager.types";
import { Position3Matrix, VoxelData, VoxelSubstanceType } from "Meta/index";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export declare const WorldMatrix: {
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
    heightByte: {
        _getHeightMapData: Record<import("Meta/index").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("Meta/index").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("Meta/index").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("Meta/index").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("Meta/index").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        initalizeChunk(chunkData: DataView): void;
        updateChunkMinMax(voxelPOS: Position3Matrix, chunkData: DataView): void;
        getChunkMin(chunkData: DataView): number;
        getChunkMax(chunkData: DataView): number;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
        getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
        isSubstanceExposed(substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
        markSubstanceAsExposed(substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        markSubstanceAsNotExposed(substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        setMinYForSubstance(height: number, substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMinYForSubstance(substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
        setMaxYForSubstance(height: number, substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMaxYForSubstance(substance: import("Meta/index").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
    };
    chunkReader: {
        chunkByteSize: number;
        indexSizes: {
            header: number;
            states: number;
            position: number;
            minMax: number;
            heightMap: number;
            voxelData: number;
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
    voxelMatrix: {
        byteLength: {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
            totalLength: number;
        };
        indexes: {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        matrixMap: {
            substanceMap: Record<VoxelSubstanceType, number>;
            substanceRecord: Record<number, VoxelSubstanceType>;
        };
        voxelData: {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            /**# World Matrix
             * ---
             * Hanldes the getting and setting of data that are loaded in the matrix.
             */
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        voxelDataView: DataView;
        voxelMap: Uint16Array;
        syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
        getVoxelData(id: number): {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            /**# World Matrix
             * ---
             * Hanldes the getting and setting of data that are loaded in the matrix.
             */
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        getSubstance(id: number): number;
        getTrueSubstance(id: number): VoxelSubstanceType;
        getShapeId(id: number): number;
        getHardness(id: number): number;
        getCheckCollisions(id: number): number;
        getColliderId(id: number): number;
        isLightSource(id: number): boolean;
        getLightValue(id: number): number;
    };
    _air: [string, number];
    _barrier: [string, number];
    updateDieTime: number;
    loadDieTime: number;
    regions: MatrixLoadedRegion;
    chunks: Record<string, Uint32Array>;
    chunkStates: Record<string, Uint8Array>;
    paletteMode: number;
    voxelPalette: Record<number, string>;
    voxelPaletteMap: Record<string, number>;
    voxelManager: VoxelManagerInterface | null;
    lightValueFunctions: {
        r: (value: number) => number;
        g: (value: number) => number;
        b: (value: number) => number;
        s: (value: number) => number;
    };
    threadName: string;
    setVoxelManager(voxelManager: VoxelManagerInterface): void;
    syncChunkBounds(): void;
    getVoxelPaletteNumericId(voxelId: string, voxelState: number): number;
    /**# Await Chunk Load
     * ---
     * Wait for a chunk to loaded into the matrix  for use.
     */
    awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<boolean>;
    __setGlobalVoxelPalette(palette: Record<number, string>, map: Record<string, number>): void;
    getVoxel(x: number, y: number, z: number, secondary?: boolean): [string, number] | false;
    getVoxelShapeState(x: number, y: number, z: number): number;
    getLevel(x: number, y: number, z: number): number;
    setLevel(level: number, x: number, y: number, z: number): void;
    getLevelState(x: number, y: number, z: number): number;
    setLevelState(state: number, x: number, y: number, z: number): void;
    setVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): false | undefined;
    __handleHeightMapUpdateForVoxelAdd(voxelPOS: Position3Matrix, voxelSubstance: VoxelSubstanceType, chunk: MatrixLoadedChunk): void;
    getVoxelPaletteIdForWorldGen(voxelId: string, voxelStateId: number): number;
    getVoxelData(x: number, y: number, z: number, secondary?: boolean): VoxelData | false;
    _createRegion(x: number, y: number, z: number): {
        chunks: {};
    };
    /**# Set Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __setChunk(x: number, y: number, z: number, chunkData: SharedArrayBuffer, chunkStates: SharedArrayBuffer): void;
    getVoxelSubstance(x: number, y: number, z: number, secondary?: boolean): VoxelSubstanceType;
    getVoxelShapeId(x: number, y: number, z: number, secondary?: boolean): number;
    isVoxelALightSource(x: number, y: number, z: number, secondary?: boolean): boolean;
    getLightSourceValue(x: number, y: number, z: number, secondary?: boolean): number;
    isAir(x: number, y: number, z: number): boolean;
    getRegion(x: number, y: number, z: number): false | {
        palette?: import("../Meta/World/WorldData/World.types").WorldRegionPalette | undefined;
        chunks: Record<string, Record<string, MatrixLoadedChunk>>;
    };
    /**# Remove Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __removeChunk(x: number, y: number, z: number): false | undefined;
    getChunk(x: number, y: number, z: number): false | MatrixLoadedChunk;
    getWorldColumn(x: number, z: number): false | Record<string, MatrixLoadedChunk>;
    isChunkLocked(x: number, y: number, z: number): boolean;
    lockChunk(x: number, y: number, z: number): boolean;
    unLockChunk(x: number, y: number, z: number): boolean;
    updateChunkData(x: number, y: number, z: number, run: (chunk: MatrixLoadedChunk) => {}): false | Promise<boolean>;
    setData(x: number, y: number, z: number, data: number, state?: boolean): boolean;
    getData(x: number, y: number, z: number, state?: boolean): number;
    getVoxelNumberID(x: number, y: number, z: number, secondary?: boolean): number | false;
    getLight(x: number, y: number, z: number): number;
    setAir(x: number, y: number, z: number, lightValue: number): void;
    setFullSun(x: number, y: number, z: number): void;
    setLight(x: number, y: number, z: number, lightValue: number): void;
    getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
    sameVoxel(x: number, y: number, z: number, cx: number, cy: number, cz: number): boolean;
};

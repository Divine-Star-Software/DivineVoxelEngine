import type { FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
import type { MatrixLoadedChunk } from "Meta/Matrix/Matrix.types.js";
import type { EngineSettingsData, VoxelData, VoxelProcessData } from "Meta/index.js";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare const Processor: {
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
            getValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels): number;
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): any;
            setValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
            setPositionUseObj(positionObj: import("Meta/index.js").Position3Matrix): number;
        };
        _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, minMax: Uint32Array): void;
        getChunkMin(minMax: Uint32Array): number;
        getChunkMax(minMax: Uint32Array): number;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
        markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    faceByte: {
        _setFaceTextureState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceTextureState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
        _setFaceRotateState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceRotateState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
        _markExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
        _checkExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => boolean>;
        markFaceAsExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
        isFaceExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): boolean;
        setFaceRotateState(direction: import("Meta/index.js").DirectionNames, state: number, rawData: number): number;
        getFaceRotateState(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
        setFaceTextureState(direction: import("Meta/index.js").DirectionNames, state: number, rawData: number): number;
        getFaceTextureState(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
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
        getValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels): number;
        getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): number;
        getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): any;
        setValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels, value: number): void;
        setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels, value: number): void;
        setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels): void;
        deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("Meta/index.js").Position3Matrix;
    };
    lightByte: {
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
    worldMatrix: {
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
            getValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels): number;
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): any;
            setValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: import("Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
            getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
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
        };
        lightByte: {
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
        updateDieTime: number;
        loadDieTime: number;
        regions: import("Meta/Matrix/Matrix.types.js").MatrixLoadedRegion;
        chunks: Record<string, Uint32Array>;
        chunkStates: Record<string, Uint8Array>;
        paletteMode: number;
        globalVoxelPalette: Record<number, string>;
        globalVoxelPaletteRecord: Record<string, string[]>;
        voxelManager: import("../../../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface | null;
        lightValueFunctions: {
            r: (value: number) => number;
            g: (value: number) => number;
            b: (value: number) => number;
            s: (value: number) => number;
        };
        threadName: string;
        setVoxelManager(voxelManager: import("../../../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface): void;
        syncChunkBounds(): void;
        awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<boolean>;
        __setGlobalVoxelPalette(palette: Record<number, string>, record: Record<string, string[]>): void;
        getVoxel(x: number, y: number, z: number): false | string[];
        getVoxelData(x: number, y: number, z: number): false | VoxelData;
        _createRegion(x: number, y: number, z: number): {
            chunks: {};
        };
        __setChunk(x: number, y: number, z: number, voxelsSAB: SharedArrayBuffer, voxelStatesSAB: SharedArrayBuffer, heightMapSAB: SharedArrayBuffer, minMaxMapSAB: SharedArrayBuffer, chunkStateSAB: SharedArrayBuffer): void;
        getRegion(x: number, y: number, z: number): false | {
            palette?: import("../../../Meta/World/WorldData/World.types.js").WorldRegionPalette | undefined;
            chunks: Record<string, Record<string, MatrixLoadedChunk>>;
        };
        __removeChunk(x: number, y: number, z: number): false | undefined;
        getChunk(x: number, y: number, z: number): false | MatrixLoadedChunk;
        getWorldColumn(x: number, z: number): false | Record<string, MatrixLoadedChunk>;
        isChunkLocked(x: number, y: number, z: number): boolean;
        lockChunk(x: number, y: number, z: number): boolean;
        unLockChunk(x: number, y: number, z: number): boolean;
        updateChunkData(x: number, y: number, z: number, run: (chunk: {
            voxels: Uint32Array;
            chunkStates: Uint8Array;
        }) => {}): false | Promise<boolean>;
        setData(x: number, y: number, z: number, data: number): false | undefined;
        getData(x: number, y: number, z: number): any;
        getVoxelNumberID(x: number, y: number, z: number): number | false;
        getLight(x: number, y: number, z: number): number;
        setAir(x: number, y: number, z: number, lightValue: number): void;
        setFullSun(x: number, y: number, z: number): void;
        setLight(x: number, y: number, z: number, lightValue: number): void;
        getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
        sameVoxel(x: number, y: number, z: number, cx: number, cy: number, cz: number): boolean;
    };
    voxellightMixCalc: typeof VoxelLightMixCalc;
    doVoxelLight: typeof CalculateVoxelLight;
    chunkTemplates: Record<number, Record<number, number[][]>>;
    exposedFaces: number[];
    faceStates: number[];
    voxelProcessData: VoxelProcessData;
    settings: {
        doAO: boolean;
        doSun: boolean;
        doRGB: boolean;
    };
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplates(chunk: MatrixLoadedChunk, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
    processVoxelLight(data: VoxelProcessData, ignoreAO?: boolean): void;
    calculateVoxelLight(data: VoxelProcessData, voxel: VoxelData): void;
    syncSettings(settings: EngineSettingsData): void;
};

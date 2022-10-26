import type { DirectionNames, EngineSettingsData, VoxelSubstanceType } from "Meta/index.js";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
import { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
import { VoxelProcessData } from "Meta/Constructor/Voxel.types.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";
import { CalculateFlow } from "./Functions/CalculateFlow.js";
import { ChunkData } from "Meta/Data/WorldData.types.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare const Processor: {
    LOD: number;
    mDataTool: DataTool;
    nDataTool: DataTool;
    heightByte: {
        _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        initalizeChunk(chunkData: DataView): void;
        updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
        getChunkMin(chunkData: DataView): number;
        getChunkMax(chunkData: DataView): number;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
        getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
        isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
        markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
        setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
    };
    faceByte: {
        _rotationMap: Record<Rotations, number>;
        _rotationReverseMap: Record<number, Rotations>;
        _setFaceTextureState: Record<DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceTextureState: Record<DirectionNames, (faceBit: number) => number>;
        _setFaceRotateState: Record<DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceRotateState: Record<DirectionNames, (faceBit: number) => number>;
        _markExposedFace: Record<DirectionNames, (faceBit: number) => number>;
        _checkExposedFace: Record<DirectionNames, (faceBit: number) => boolean>;
        markFaceAsExposed(direction: DirectionNames, rawData: number): number;
        isFaceExposed(direction: DirectionNames, rawData: number): boolean;
        setFaceRotateState(direction: DirectionNames, state: number, rawData: number): number;
        getFaceRotateState(direction: DirectionNames, rawData: number): number;
        setFaceTextureState(direction: DirectionNames, rotation: Rotations, rawData: number): number;
        getFaceTextureState(direction: DirectionNames, rawData: number): Rotations;
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
        minusOneForAll(sl: number): number;
    };
    worldData: {
        _currentionDimension: string;
        util: {
            isSameVoxel(dimensionId: string | number, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
        };
        paint: {
            _dt: DataTool;
            voxel(data: import("Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
            voxelAsync(data: import("Meta/Data/WorldData.types.js").AddVoxelData): Promise<void>;
            __paint(dimension: number, data: import("Meta/Data/WorldData.types.js").AddVoxelData, chunk: ChunkData, update?: boolean): false | undefined;
            erease(dimensionId: string | number, x: number, y: number, z: number): void;
        };
    };
    calculatFlow: typeof CalculateFlow;
    voxellightMixCalc: typeof VoxelLightMixCalc;
    doVoxelLight: typeof CalculateVoxelLight;
    chunkTemplates: Record<number, Record<number, number[][]>>;
    exposedFaces: number[];
    faceStates: number[];
    textureRotation: Rotations[];
    settings: {
        doAO: boolean;
        doSun: boolean;
        doRGB: boolean;
        ignoreSun: boolean;
        entity: boolean;
        composedEntity: number;
    };
    voxelProcesseData: VoxelProcessData;
    cullFaceOverrideData: any;
    aoOverRideData: any;
    template: FullChunkTemplate;
    faceIndexMap: Record<DirectionNames, number>;
    dimension: number;
    $INIT(): void;
    cullCheck(face: DirectionNames, voxelId: string, voxelShapeId: number, voxelSubstance: VoxelSubstanceType, shapeState: number, x: number, y: number, z: number, faceBit: number): number;
    faceStateCheck(face: DirectionNames, faceBit: number): number;
    _process(template: FullChunkTemplate, x: number, y: number, z: number, doSecondCheck?: boolean): void;
    constructEntity(composed?: number): FullChunkTemplate;
    makeAllChunkTemplates(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number, LOD?: number): FullChunkTemplate;
    processVoxelLight(data: VoxelProcessData, ignoreAO?: boolean): void;
    syncSettings(settings: EngineSettingsData): void;
    flush(): void;
};

import type { DirectionNames, EngineSettingsData, VoxelShape, VoxelSubstanceType } from "Meta/index.js";
import type { VoxelTemplate } from "Meta/Constructor/VoxelTemplate.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types.js";
import type { FaceDataOverride } from "Meta/Constructor/OverRide.types";
import type { TextureRotations } from "Meta/Constructor/Geometry/Geometry.types.js";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
import { CalculateFlow } from "./Functions/CalculateFlow.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare const Processor: {
    LOD: number;
    mDataTool: import("../../../Meta/Constructor/Constructor.types.js").ConstructorDataTool;
    nDataTool: import("../../../Meta/Constructor/Constructor.types.js").ConstructorDataTool;
    faceByte: {
        _rotationMap: Record<TextureRotations, number>;
        _rotationReverseMap: Record<number, TextureRotations>;
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
        setFaceTextureState(direction: DirectionNames, rotation: TextureRotations, rawData: number): number;
        getFaceTextureState(direction: DirectionNames, rawData: number): TextureRotations;
    };
    lightData: {
        SRS: number;
        _lightValues: [s: number, r: number, g: number, b: number];
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
        hasSunLight(sl: number): boolean;
        mixLight(l1: number, l2: number): number;
        getRGB(sl: number): number;
        setRGB(value: number, sl: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        setLightValues(values: number[]): number;
        getLightValues(value: number): [s: number, r: number, g: number, b: number];
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
    calculatFlow: typeof CalculateFlow;
    voxellightMixCalc: typeof VoxelLightMixCalc;
    doVoxelLight: typeof CalculateVoxelLight;
    nLocation: LocationData;
    exposedFaces: number[];
    faceStates: number[];
    textureRotation: TextureRotations[];
    settings: {
        doAO: boolean;
        doSun: boolean;
        doRGB: boolean;
        ignoreSun: boolean;
        entity: boolean;
        composedEntity: number;
    };
    faceDataOverride: FaceDataOverride;
    template: Record<string, VoxelTemplate>;
    getVoxelTemplate(): VoxelTemplate;
    $INIT(): void;
    cullCheck(face: DirectionNames, voxelObject: VoxelConstructor, voxelShape: VoxelShape, voxelSubstance: VoxelSubstanceType, faceBit: number): number;
    faceStateCheck(face: DirectionNames, faceBit: number): number;
    _process(doSecondCheck?: boolean): void;
    makeAllChunkTemplates(location: LocationData, LOD?: number): Record<string, VoxelTemplate>;
    syncSettings(settings: EngineSettingsData): void;
    flush(): void;
};

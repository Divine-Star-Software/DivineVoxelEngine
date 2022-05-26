import type { DirectionNames } from "Meta/Util.types.js";
import type { VoxelShapeAddData, VoxelShapeAddReturnData } from "Meta/index";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export declare const ShapeHelper: {
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
    faceByte: {
        _setFaceTextureState: Record<DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceTextureState: Record<DirectionNames, (faceBit: number) => number>;
        _setFaceRotateState: Record<DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceRotateState: Record<DirectionNames, (faceBit: number) => number>;
        markExposedFace: Record<DirectionNames, (faceBit: number) => number>;
        checkExposedFace: Record<DirectionNames, (faceBit: number) => boolean>;
        markFaceAsExposed(direction: DirectionNames, rawData: number): number;
        isFaceExposed(direction: DirectionNames, rawData: number): boolean;
        setFaceRotateState(direction: DirectionNames, state: number, rawData: number): number;
        getFaceRotateState(direction: DirectionNames, rawData: number): number;
        setFaceTextureState(direction: DirectionNames, state: number, rawData: number): number;
        getFaceTextureState(direction: DirectionNames, rawData: number): number;
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
    lightMap: number[];
    exposedFaceRecord: Record<DirectionNames, number>;
    shouldFaceFlip(faceBit: number, faceDirection: DirectionNames): boolean;
    isFaceExposexd(faceBit: number, faceDirection: DirectionNames): boolean;
    produceShapeReturnData(shapeData: VoxelShapeAddData): VoxelShapeAddReturnData;
    toLinearSpace(r: number, g: number, b: number, a: number): number[];
    calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: number[], startIndex: number): void;
    calculateSunightColor(sunLight: number[], sunLightTemplate: number[], sunLightIndex: number): void;
    calculateAOColor(colors: number[], chunkAmbientOcculusion: number[], startIndex: number): void;
};

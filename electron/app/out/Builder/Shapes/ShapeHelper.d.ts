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
    lightByte: {
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
    isFaceExposexd(voxelExposedFaceEncodedBit: number, faceDirection: DirectionNames): boolean;
    processReturnData(shapeData: VoxelShapeAddData, returnData: VoxelShapeAddReturnData): void;
    produceShapeReturnData(shapeData: VoxelShapeAddData): {
        newIndicieIndex: number;
        newUVTemplateIndex: number;
        newColorIndex: number;
        newlightIndex: number;
        newAOIndex: number;
    };
    toLinearSpace(r: number, g: number, b: number, a: number): number[];
    calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: Float32Array, startIndex: number): void;
    calculateSunightColor(sunLight: number[], sunLightTemplate: Int32Array, sunLightIndex: number): void;
    calculateAOColor(colors: number[], chunkAmbientOcculusion: Float32Array, startIndex: number): void;
};

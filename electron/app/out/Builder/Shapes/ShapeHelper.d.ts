import type { Util } from "Global/Util.helper";
import type { DirectionNames } from "Meta/Util.types.js";
import type { VoxelShapeAddData, VoxelShapeAddReturnData } from "Meta/index";
import type { InfoByte } from "Global/Util/InfoByte";
import type { LightByte } from "Global/Util/LightByte";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export declare class ShapeHelper {
    util: Util;
    infoByte: typeof InfoByte;
    lightByte: typeof LightByte;
    lightMap: number[];
    constructor(util: Util);
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
}

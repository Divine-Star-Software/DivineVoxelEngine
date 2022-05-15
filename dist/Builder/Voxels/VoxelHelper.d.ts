import type { VoxelProcessData } from "Meta/Voxels/Voxel.types";
import type { VoxelBuilderThreadObject, VoxelData } from "../../Meta/index";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
export declare const VoxelHelper: {
    voxellightMixCalc: typeof VoxelLightMixCalc;
    calculdateVoxelLight: typeof CalculateVoxelLight;
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
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
    substanceRules: Record<string, boolean>;
    lightValueFunctions: {
        r: (value: number) => number;
        g: (value: number) => number;
        b: (value: number) => number;
        s: (value: number) => number;
    };
    getTrueShapeId(id: string): number;
    getTrueFluidShapeId(id: string): number;
    voxelFaceCheck(voxel: VoxelBuilderThreadObject, voxelData: number, x: number, y: number, z: number): boolean;
    /**# Get Light
     * ---
     * Returns the raw light value for a voxel.
     */
    getLight(x: number, y: number, z: number): number;
    getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
    processVoxelLight(data: VoxelProcessData, voxel: VoxelData): void;
    calculateVoxelLight(data: VoxelProcessData, voxel: VoxelData): void;
    calculateVoxelAO(data: VoxelProcessData, voxel: VoxelData): void;
};

import type { VoxelShapeAddData } from "Meta/Constructor/VoxelShape.types";
import type { DirectionNames } from "Meta/Util.types.js";
export declare type sideTypes = "normal" | "stair-top" | "stair-side" | "side";
export declare type stairBuildData = {
    type: sideTypes;
    _2dDimensionType?: boolean;
    reverse?: boolean;
    transform1?: {
        x: number;
        y: number;
        z: number;
    };
    transform2?: {
        x: number;
        y: number;
        z: number;
    };
};
export declare const stairCachedPosition: {
    x: number;
    y: number;
    z: number;
};
export declare const buildStair: (data: VoxelShapeAddData, stairData: Record<DirectionNames, stairBuildData>) => void;

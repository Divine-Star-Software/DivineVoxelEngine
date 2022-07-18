import type { VoxelShapeAddData } from "Meta/Constructor/VoxelShape.types";
import type { DirectionNames } from "Meta/Util.types.js";
declare type sideTypes = "normal" | "stair-top" | "stair-side" | "side";
declare type stairData = {
    type: sideTypes;
    transform1: {
        x: 0;
        y: 0;
        z: 0;
    };
    transform2: {
        x: 0;
        y: 0;
        z: 0;
    };
};
export declare const buildStar: (data: VoxelShapeAddData, stairData: Record<DirectionNames, stairData>) => void;
export {};

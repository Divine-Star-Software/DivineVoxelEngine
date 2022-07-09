import { VoxelShapeAddData } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";
declare type UVFunctionData = {
    uvs: number[];
    uv: number;
    startPercent: number;
    endPerfect: number;
    flipped: boolean;
    rotoate: number;
};
export declare const UVHelper: {
    uvFunctions: Record<DirectionNames, (data: UVFunctionData) => void>;
    addUVs(face: DirectionNames, data: UVFunctionData): void;
    processOverlayUVs(data: VoxelShapeAddData): void;
};
export {};

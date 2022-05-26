import type { VoxelShapeAddData } from "Meta/index";
import type { DirectionNames, PositionMatrix } from "Meta/Util.types";
declare type DimenionsMatrix = {
    width: number;
    height: number;
    depth: number;
};
export declare const ShapeBuilder: {
    faceFunctions: Record<DirectionNames, (origion: PositionMatrix, dimensions: DimenionsMatrix, data: VoxelShapeAddData, flip?: boolean | undefined) => void>;
    addFace(direction: DirectionNames, origion: PositionMatrix, dimensions: DimenionsMatrix, data: VoxelShapeAddData, flip?: boolean): void;
};
export {};

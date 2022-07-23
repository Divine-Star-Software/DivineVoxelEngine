import type { VoxelShapeAddData } from "Meta/index";
import type { DirectionNames, Position3Matrix } from "Meta/Util.types";
declare type DimenionsMatrix = {
    width: number;
    height: number;
    depth: number;
};
export declare const ShapeBuilder: {
    faceFunctions: Record<DirectionNames, (origin: Position3Matrix, dimensions: DimenionsMatrix, data: VoxelShapeAddData, flip?: boolean | undefined) => void>;
    addFace(direction: DirectionNames, origin: Position3Matrix, dimensions: DimenionsMatrix, data: VoxelShapeAddData, flip?: boolean): void;
};
export {};

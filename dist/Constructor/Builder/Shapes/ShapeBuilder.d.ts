import type { VoxelShapeAddData } from "Meta/index";
import type { DirectionNames, Position3Matrix } from "Meta/Util.types";
declare type DimenionsMatrix = {
    width: number;
    height: number;
    depth: number;
};
declare const defaultTransform: {
    v1: {
        x: number;
        y: number;
        z: number;
    };
    v2: {
        x: number;
        y: number;
        z: number;
    };
    v3: {
        x: number;
        y: number;
        z: number;
    };
    v4: {
        x: number;
        y: number;
        z: number;
    };
};
export declare const ShapeBuilder: {
    faceFunctions: Record<DirectionNames, (origin: Position3Matrix, dimensions: DimenionsMatrix, data: VoxelShapeAddData, transform: typeof defaultTransform, flip?: boolean | undefined) => void>;
    addFace(direction: DirectionNames, origin: Position3Matrix, dimensions: DimenionsMatrix, data: VoxelShapeAddData, flip?: boolean, transform?: {
        v1: {
            x: number;
            y: number;
            z: number;
        };
        v2: {
            x: number;
            y: number;
            z: number;
        };
        v3: {
            x: number;
            y: number;
            z: number;
        };
        v4: {
            x: number;
            y: number;
            z: number;
        };
    }): void;
};
export {};

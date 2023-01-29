import type { VoxelShape } from "Meta/Constructor/VoxelShape.types";
export declare const ShapeManager: {
    shapes: Map<string, VoxelShape>;
    shapeCount: number;
    registerShape(shapeObject: VoxelShape): void;
    getShape(shapeId: string): VoxelShape;
};

import type { VoxelShape } from "Meta/Constructor/VoxelShape.types";
export declare const ShapeManager: {
    shapes: Record<number, VoxelShape>;
    shapeMap: Record<string, number>;
    shapeCount: number;
    registerShape(shapeObject: VoxelShape): void;
    getShape(shapeId: number): VoxelShape;
    getShapeId(shapeId: string): number;
    getShapeMap(): Record<string, number>;
};

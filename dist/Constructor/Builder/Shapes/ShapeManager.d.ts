import type { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";
export declare const ShapeManager: {
    shapes: Record<number, VoxelShapeInterface>;
    shapeMap: Record<string, number>;
    shapeCount: number;
    registerShape(shapeObject: VoxelShapeInterface): void;
    getShape(shapeId: number): VoxelShapeInterface;
    getShapeId(shapeId: string): number;
    getShapeMap(): Record<string, number>;
};

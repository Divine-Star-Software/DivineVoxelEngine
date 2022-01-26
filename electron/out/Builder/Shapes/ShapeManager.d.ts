import type { VoxelShapeInterface } from "Meta/Builder/Shapes/VoxelShape.interface";
export declare class ShapeManager {
    shapes: Record<number, VoxelShapeInterface>;
    shapeMap: Record<string, number>;
    shapeCount: number;
    registerShape(shapeObject: VoxelShapeInterface): void;
    getShape(shapeId: number): VoxelShapeInterface;
    getShapeMap(): Record<string, number>;
}

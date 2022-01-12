import type { VoxelShapeInterface } from "Meta/Contents/Builder/Shapes/VoxelShape.interface";
export declare class ShapeManager {
    shapes: Record<number, VoxelShapeInterface>;
    registerShape(id: number, shapeObject: VoxelShapeInterface): void;
}

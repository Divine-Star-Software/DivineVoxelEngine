import { VoxelSubstanceType } from "Meta/index";
export declare const VoxelDataByteLengths: {
    substance: number;
    shapeId: number;
    hardness: number;
    material: number;
    checkCollision: number;
    colliderId: number;
    lightSource: number;
    lightValue: number;
    isRich: number;
    totalLength: number;
};
export declare const VoxelDataIndexes: {
    substance: number;
    shapeId: number;
    hardness: number;
    material: number;
    checkCollision: number;
    colliderId: number;
    lightSource: number;
    lightValue: number;
    isRich: number;
};
export declare const VoxelSubstanceMap: Record<VoxelSubstanceType, number>;
export declare const VoxelSubstanceRecord: Record<number, VoxelSubstanceType>;

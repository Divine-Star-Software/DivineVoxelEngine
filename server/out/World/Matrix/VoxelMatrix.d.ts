import type { VoxelSubstanceType } from "Meta/index.js";
export declare const VoxelMatrix: {
    byteLength: {
        substance: number;
        shapeId: number;
        hardness: number;
        material: number;
        checkCollision: number;
        colliderId: number;
        lightSource: number;
        lightValue: number;
        totalLength: number;
    };
    indexes: {
        substance: number;
        shapeId: number;
        hardness: number;
        material: number;
        checkCollision: number;
        colliderId: number;
        lightSource: number;
        lightValue: number;
    };
    substanceMap: Record<VoxelSubstanceType, number>;
    voxelData: {
        substance: number;
        shapeId: number;
        hardness: number;
        material: number;
        checkCollision: number;
        colliderId: number;
        lightSource: number;
        lightValue: number;
    };
    voxelBuffer: SharedArrayBuffer;
    voxelDataView: DataView;
    voxelMapBuffer: SharedArrayBuffer;
    voxelMap: Uint16Array;
    __isReady: boolean;
    $INIT(): void;
    getVoxelData(id: number): {
        substance: number;
        shapeId: number;
        hardness: number;
        material: number;
        checkCollision: number;
        colliderId: number;
        lightSource: number;
        lightValue: number;
    };
    getSubstance(id: number): number;
    getShapeId(id: number): number;
    getHardness(id: number): number;
    getCheckCollisions(id: number): number;
    getColliderId(id: number): number;
    isLightSource(id: number): number;
    getLightValue(id: number): number;
};

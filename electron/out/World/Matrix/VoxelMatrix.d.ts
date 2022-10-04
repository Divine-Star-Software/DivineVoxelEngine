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
    matrixMap: {
        shapeMap: Record<string, number>;
        substanceMap: Record<VoxelSubstanceType, number>;
        substanceRecord: Record<number, VoxelSubstanceType>;
        __shapeMapSet: boolean;
        isReady(): boolean;
        setShapeMap(shapeMap: Record<string, number>): void;
        flush(): void;
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
    voxelDataMapped: {
        substance: string;
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
    getTrueSubstance(id: number): VoxelSubstanceType;
    getShapeId(id: number): number;
    getHardness(id: number): number;
    getCheckCollisions(id: number): number;
    getColliderId(id: number): number;
    isLightSource(id: number): number;
    getLightValue(id: number): number;
};

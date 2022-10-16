export declare const VoxelData: {
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
    maps: {
        substanceMap: Record<import("../Meta/index.js").VoxelSubstanceType, number>;
        substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
    };
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
    voxelDataView: DataView;
    voxelMap: Uint16Array;
    syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
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
    getTrueSubstance(id: number): import("../Meta/index.js").VoxelSubstanceType;
    getShapeId(id: number): number;
    getHardness(id: number): number;
    getCheckCollisions(id: number): number;
    getColliderId(id: number): number;
    isLightSource(id: number): boolean;
    getLightValue(id: number): number;
};

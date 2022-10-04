export declare const MatrixMap: {
    shapeMap: Record<string, number>;
    substanceMap: Record<import("../../Meta/index.js").VoxelSubstanceType, number>;
    substanceRecord: Record<number, import("../../Meta/index.js").VoxelSubstanceType>;
    __shapeMapSet: boolean;
    isReady(): boolean;
    setShapeMap(shapeMap: Record<string, number>): void;
    flush(): void;
};

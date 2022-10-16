export declare const VoxelDataCreator: {
    voxelBuffer: SharedArrayBuffer;
    voxelMapBuffer: SharedArrayBuffer;
    shapeMap: Record<string, number>;
    __shapeMapSet: boolean;
    isReady(): boolean;
    $INIT(): void;
    setShapeMap(shapeMap: Record<string, number>): void;
    flush(): void;
};

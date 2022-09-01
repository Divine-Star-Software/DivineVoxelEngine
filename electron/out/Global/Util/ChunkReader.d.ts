export declare const ChunkReader: {
    indexSizes: {
        header: number;
        states: number;
        heightMap: number;
        voxelData: number;
        voxelStateData: number;
    };
    indexes: {
        header: number;
        states: number;
        heightMap: number;
        voxelData: number;
        voxelStateData: number;
    };
    byteLengths: {
        heightMapData: number;
        voxelData: number;
        voxelStaeteData: number;
    };
    syncSettings(): void;
    _getVoxelDataIndex(x: number, y: number, z: number): number;
    _getVoxelStateDataIndex(x: number, y: number, z: number): number;
    getVoxelChunkDataIndex(x: number, y: number, z: number, secondary?: boolean): number;
    getHeightMapIndex(x: number, y: number, z: number): number;
    getDataVoxelData(chunkData: DataView, x: number, y: number, z: number, secondary?: boolean): number;
    setVoxelData(chunkData: DataView, x: number, y: number, z: number, data: number, secondary?: boolean): void;
    getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
    setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
};

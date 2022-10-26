export declare type SetChunkMeshTask = [
    dimension: number,
    substanceType: number,
    chunkX: number,
    chunkY: number,
    chunkZ: number,
    positions: Float32Array,
    normals: Float32Array,
    indicies: Int32Array,
    faceData: Float32Array,
    AOColors: Float32Array,
    RGBLightColors: Float32Array,
    sunLightColors: Float32Array,
    colors: Float32Array,
    uvs: Float32Array,
    overlayUVs: Float32Array
];
export declare type RemoveChunkMeshTasks = [
    dimension: number,
    substanceType: number,
    chunkX: number,
    chunkY: number,
    chunkZ: number
];

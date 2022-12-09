export declare const DataManager: {
    dimensions: {
        _count: number;
        dimensionRecord: Record<string, number>;
        dimensionMap: Record<number, string>;
        __defaultDimensionOptions: import("../Meta/Data/DimensionData.types.js").DimensionOptions;
        _dimensions: Record<string, import("../Meta/Data/DimensionData.types.js").DimensionData>;
        registerDimension(id: string, option: import("../Meta/Data/DimensionData.types.js").DimensionOptions): void;
        getDimension(id: string | number): import("../Meta/Data/DimensionData.types.js").DimensionData;
        getDimensionStringId(id: string | number): string;
        getDimensionNumericId(id: string | number): number;
    };
    voxelTags: {
        voxelMap: Uint16Array;
        substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
        voxelData: {
            substance: import("../Meta/index.js").VoxelSubstanceType;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
            isRich: number;
        };
        id: string;
        sync(voxelMap: Uint16Array): void;
        setVoxel(id: number): void;
        getVoxelData(id: number): {
            substance: import("../Meta/index.js").VoxelSubstanceType;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
            isRich: number;
        };
        getTrueSubstance(id: number): import("../Meta/index.js").VoxelSubstanceType;
        $INIT(data: import("../Libs/DivineBinaryTags/Meta/Util.types.js").RemoteTagManagerInitData): void;
        byteOffSet: number;
        tagSize: number;
        tagIndexes: number;
        data: DataView;
        indexMap: Map<string, number>;
        index: DataView;
        setBuffer(data: DataView | import("../Libs/DivineBinaryTags/Meta/Util.types.js").BufferTypes): void;
        setTagIndex(index: number): void;
        getTag(id: string): number;
        setTag(id: string, value: number): boolean;
        getArrayTagValue(id: string, index: number): number;
        setArrayTagValue(id: string, index: number, value: number): number | void;
        loopThroughTags(run: (id: string, value: number) => void): void;
        loopThroughIndex(run: (data: number[]) => void): void;
        loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
    };
    world: {
        _currentionDimension: string;
        util: {
            isSameVoxel(dimensionId: string | number, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
        };
        paint: {
            _dt: import("../Tools/Data/DataTool.js").DataTool;
            voxel(data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
            voxelAsync(data: import("../Meta/Data/WorldData.types.js").AddVoxelData): Promise<void>;
            __paint(dimension: string, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
            erease(dimensionId: string | number, x: number, y: number, z: number): void;
        };
    };
    worldRegister: {
        _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
        _cacheOn: boolean;
        _cache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
        $INIT(): void;
        cache: {
            enable(): void;
            disable(): void;
            _add(key: string, data: import("../Meta/Data/WorldData.types.js").ChunkData): void;
            _get(key: string): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
        };
        dimensions: {
            add(id: string | number): Map<any, any>;
            get(id: string | number): Map<string, import("../Meta/Data/WorldData.types.js").Region> | undefined;
        };
        region: {
            add(dimensionId: string, x: number, y: number, z: number, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
            _getRegionData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
            get(dimensionId: string, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").Region;
        };
        column: {
            add(dimensionId: string, x: number, z: number, y: number | undefined, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column | undefined;
            _getColumnData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column;
            get(dimensionId: string, x: number, z: number, y?: number): false | import("../Meta/Data/WorldData.types.js").Column | undefined;
            fill(dimensionId: string, x: number, z: number, y?: number): void;
            height: {
                getRelative(dimensionId: string, x: number, z: number, y?: number): number;
                getAbsolute(dimensionId: string, x: number, z: number, y?: number): number;
            };
        };
        chunk: {
            add(dimensionId: string, x: number, y: number, z: number, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            _getChunkData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
            addFromServer(chunkBuffer: ArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            get(dimensionId: string, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
        };
    };
    columnTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    worldBounds: {
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        _hashMask(n: number): number;
        hash(x: number, y: number, z: number): number;
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
        regionColumnWidth: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __worldColumnPosition: {
            x: number;
            z: number;
            y: number;
        };
        __chunkPosition: {
            x: number;
            y: number;
            z: number;
        };
        __voxelPosition: {
            x: number;
            y: number;
            z: number;
        };
        __columnPosition: {
            x: number;
            z: number;
            y: number;
        };
        syncBoundsWithArrays(): void;
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
        isPositonInBounds(x: number, y: number, z: number): boolean;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("../Meta/Util.types.js").Vector3): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../Meta/Util.types.js").Vector3): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Vector3): {
            x: number;
            y: number;
            z: number;
        };
        getRichPositionKey(x: number, y: number, z: number): string;
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        _columnIndexPosition: {
            x: number;
            y: number;
            z: number;
        };
        getColumnIndex(x: number, z: number, y: number): number;
        getChunkColumnIndex(y: number): number;
        getColumnKey(x: number, z: number, y?: number): string;
        getColumnPosition(x: number, z: number, y?: number): {
            x: number;
            z: number;
            y: number;
        };
    };
    register: {
        voxels: {
            substanceMap: Record<import("../Meta/index.js").VoxelSubstanceType, number>;
            substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
        };
    };
    chunkTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    regionTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    chunks: {
        space: {
            syncSettings(): void;
            hmBounds: {
                x: number;
                y: number;
                z: number;
            };
            getHeightMapIndex(x: number, y: number, z: number): number;
            getVoxelDataIndex(x: number, y: number, z: number): number;
            getHeightMapIndexUseObj(pos: import("../Meta/Util.types.js").Vector3): number;
            getVoxelDataIndexUseObj(pos: import("../Meta/Util.types.js").Vector3): number;
        };
    };
};

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
        materialMap: Record<number, string>;
        colliderMap: Record<number, string>;
        voxelData: {
            substance: import("../Meta/index.js").VoxelSubstanceType;
            shapeId: number;
            hardness: number;
            material: string;
            checkCollision: number;
            colliderId: string;
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
            material: string;
            checkCollision: number;
            colliderId: string;
            lightSource: number;
            lightValue: number;
            isRich: number;
        };
        getTrueSubstance(id: number): import("../Meta/index.js").VoxelSubstanceType;
        getMaterial(id: number): string;
        getCollider(id: number): string;
        $INIT(data: import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData): void;
        byteOffSet: number;
        tagSize: number;
        tagIndexes: number;
        data: DataView;
        indexMap: Map<string, number>;
        index: DataView;
        setBuffer(data: DataView | import("../Libs/DivineBinaryTags/Types/Util.types.js").BufferTypes): void;
        setTagIndex(index: number): void;
        getTag(id: string): number;
        setTag(id: string, value: number): boolean;
        getArrayTagValue(id: string, index: number): number;
        getArrayTagByteIndex(id: string, index: number): number;
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
            erase(dimensionId: string | number, x: number, y: number, z: number): void;
        };
    };
    worldRegister: {
        _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
        _cacheOn: boolean;
        _chunkCache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
        _columnCache: Map<string, import("../Meta/Data/WorldData.types.js").Column>;
        $INIT(): void;
        cache: {
            enable(): void;
            disable(): void;
            _addChunk(key: string, data: import("../Meta/Data/WorldData.types.js").ChunkData): void;
            _addColumn(key: string, data: import("../Meta/Data/WorldData.types.js").Column): void;
            _getChunk(key: string): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            _getColumn(key: string): import("../Meta/Data/WorldData.types.js").Column | undefined;
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
            get(dimensionId: string, x: number, z: number, y?: number): false | import("../Meta/Data/WorldData.types.js").Column;
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
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
    };
    spaces: {
        region: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
            chunkBounds: {
                x: number;
                y: number;
                z: number;
            };
            columnBounds: {
                x: number;
                y: number;
                z: number;
            };
            getChunkVolume(): number;
            getColumnVolume(): number;
        };
        column: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
        chunk: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
            _regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            getRegionPositonx(): {
                x: number;
                y: number;
                z: number;
            };
            getRegionPositonxXYZ(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getRegionIndex(): number;
            getRegionIndexXYZ(x: number, y: number, z: number): number;
        };
        voxel: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
        setDimensions(data: {
            regions: {
                x: number;
                y: number;
                z: number;
            };
            columns: {
                x: number;
                y: number;
                z: number;
            };
            chunks: {
                x: number;
                y: number;
                z: number;
            };
        }): void;
    } & {
        $INIT(settings: import("../Meta/index.js").EngineSettingsData): void;
    };
    register: {
        voxels: {
            substanceMap: Record<import("../Meta/index.js").VoxelSubstanceType, number>;
            substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
            materialMap: Record<number, string>;
            colliderMap: Record<number, string>;
        };
    };
    chunkTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    regionTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    regionHeaderReigster: {
        _headers: Map<string, Map<string, {
            data: DataView;
            buffer: SharedArrayBuffer;
        }>>;
        add(location: import("../Meta/Data/CommonTypes.js").LocationData, buffer: SharedArrayBuffer): void;
        get(location: import("../Meta/Data/CommonTypes.js").LocationData): false | {
            data: DataView;
            buffer: SharedArrayBuffer;
        } | undefined;
        isStored(location: import("../Meta/Data/CommonTypes.js").LocationData): 1 | 0 | -1;
    };
};

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
        voxelIndex: Uint16Array;
        id: string;
        sync(voxelMap: Uint16Array): void;
        setVoxel(id: number): void;
        initData: import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData;
        $INIT(data: import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData): void;
        byteOffSet: number;
        tagSize: number;
        tagIndexes: number;
        data: DataView;
        indexMap: Map<string, number>;
        index: DataView;
        setBuffer(data: DataView | import("../Libs/DivineBinaryTags/Types/Util.types.js").BufferTypes): void;
        getBuffer(): ArrayBuffer;
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
        paint: {
            _dt: import("../Tools/Data/DataTool.js").DataTool;
            voxel(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
            __paint(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
            erase(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
        };
    };
    worldRegister: {
        _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
        _cacheOn: boolean;
        _chunkCache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
        _columnCache: Map<string, import("../Meta/Data/WorldData.types.js").Column>;
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
            add(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
            _getRegionData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
            get(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../Meta/Data/WorldData.types.js").Region;
            remove(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): boolean;
        };
        column: {
            add(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column | undefined;
            _getColumnData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column;
            get(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../Meta/Data/WorldData.types.js").Column;
            remove(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): boolean;
            fill(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            height: {
                getRelative(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): number;
                getAbsolute(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): number;
            };
        };
        chunk: {
            add(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            _getChunkData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
            addFromServer(chunkBuffer: ArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            get(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            remove(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): boolean;
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
                copy(): any;
                copyTo(vec3: {
                    x: number;
                    y: number;
                    z: number;
                }): void;
                toString(): string;
                multiply(vec3: {
                    x: number;
                    y: number;
                    z: number;
                }): any;
            };
            getRegionPositonxXYZ(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
                copy(): any;
                copyTo(vec3: {
                    x: number;
                    y: number;
                    z: number;
                }): void;
                toString(): string;
                multiply(vec3: {
                    x: number;
                    y: number;
                    z: number;
                }): any;
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
        stringMaps: {
            segments: Map<string, Map<string, string[]>>;
            syncStringMap(data: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): void;
            getStringMapValue(segment: string, id: string, index: number): string;
        };
    };
    chunkTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    regionTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    regionHeaderReigster: {
        _headers: Map<string, Map<string, {
            data: DataView;
            buffer: SharedArrayBuffer;
        }>>;
        remove(location: import("../Meta/Data/CommonTypes.js").LocationData): boolean;
        add(location: import("../Meta/Data/CommonTypes.js").LocationData, buffer: SharedArrayBuffer): void;
        get(location: import("../Meta/Data/CommonTypes.js").LocationData): false | {
            data: DataView;
            buffer: SharedArrayBuffer;
        } | undefined;
        isStored(location: import("../Meta/Data/CommonTypes.js").LocationData): 0 | 1 | -1;
    };
};

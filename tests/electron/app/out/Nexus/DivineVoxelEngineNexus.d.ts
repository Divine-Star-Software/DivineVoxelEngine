import type { EngineSettingsData } from "Meta/index.js";
export declare const DVEN: {
    environment: "node" | "browser";
    TC: {
        threadNumber: number;
        threadName: string;
        environment: "node" | "browser";
        _comms: Record<string, import("../Libs/ThreadComm/Comm/Comm.js").CommBase>;
        _commManageras: Record<string, import("../Libs/ThreadComm/Manager/CommManager.js").CommManager>;
        _tasks: Record<string, import("../Libs/ThreadComm/Tasks/Tasks.js").Task<any>>;
        _queues: Map<string, Map<string, import("../Libs/ThreadComm/Queue/SyncedQueue.js").SyncedQueue>>;
        _onDataSync: Record<string, import("../Libs/ThreadComm/Data/DataSync.js").DataSync<any, any>>;
        parent: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
        __internal: Record<number, Record<number, (data: any, event: any) => void>>;
        __initalized: boolean;
        __expectedPorts: Record<string, boolean>;
        $INIT(threadName: string): Promise<void>;
        getSyncedQueue(threadId: string, queueId: string): import("../Libs/ThreadComm/Queue/SyncedQueue.js").SyncedQueue | undefined;
        addComm(comm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase): void;
        createComm<T>(name: string, mergeObject?: T): T & import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
        createCommManager(data: import("../Libs/ThreadComm/Meta/Manager/Manager.types.js").CommManagerData): import("../Libs/ThreadComm/Manager/CommManager.js").CommManager;
        getComm(id: string): import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
        getCommManager(id: string): import("../Libs/ThreadComm/Manager/CommManager.js").CommManager;
        __throwError(message: string): never;
        getWorkerPort(): Promise<any>;
        __handleInternalMessage(data: any[], event: any): void;
        __isInternalMessage(data: any[]): boolean;
        __handleTasksDone(tasksId: string, mode: number, threadId: string, tid: string, tasksData: any): void;
        __handleTasksMessage(data: any[]): Promise<void>;
        __isTasks(data: any[]): boolean;
        registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: Function | undefined) => void, mode?: "async" | "deffered"): import("../Libs/ThreadComm/Tasks/Tasks.js").Task<T_1>;
        __hanldeDataSyncMessage(data: any[]): Promise<void>;
        __isDataSync(data: any[]): boolean;
        onDataSync<T_2, K>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K) => void) | undefined): import("../Libs/ThreadComm/Data/DataSync.js").DataSync<T_2, K>;
    };
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T_3>(): import("../Global/Util/Queue.js").Queue<T_3>;
        merge<T_4, K_1>(target: T_4, newObject: K_1): T_4 & K_1;
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
        convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
        converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
    };
    settings: {
        enviorment: "node" | "browser";
        settings: EngineSettingsData;
        getSettings(): EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        __syncWithObjects(): void;
        syncWithWorldBounds(worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        }): void;
        getSettingsCopy(): any;
        syncChunkInRichWorldThread(): boolean;
        richDataEnabled(): boolean;
        syncChunkInFXThread(): boolean;
        syncChunkInDataThread(): boolean;
        syncChunksInNexusThread(): boolean;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
        doLight(): boolean;
        doFlow(): boolean;
        saveWorldData(): boolean;
        isServer(): boolean;
        isClient(): boolean;
    };
    dataSyncNode: {
        _states: Record<string, boolean>;
        isReady(): boolean;
        voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
        voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
        dimension: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DimensionData.types.js").DimensionData, void>;
        chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData>;
        column: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData>;
        region: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData>;
        regionHeader: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData>;
        chunkTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData, void>;
        columnTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData, void>;
        regionTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData[], void>;
        stringMap: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").RegisterStringMapSync, void>;
    };
    data: {
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
            $INIT(settings: EngineSettingsData): void;
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
    worldData: {
        _currentionDimension: string;
        paint: {
            _dt: import("../Tools/Data/DataTool.js").DataTool;
            voxel(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
            __paint(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
            erase(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
        };
    };
    worldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    nexusEntites: {
        entityTemplate: Record<string, {
            template: import("Meta/index.js").NexusEntity;
            data: import("Meta/index.js").NexusEntityData;
        }>;
        loaedEntities: Record<import("Meta/index.js").EntityTypes, Record<string, import("Meta/index.js").NexusEntityInterface>>;
        registerEntity(id: string, entityData: import("Meta/index.js").NexusEntityData, nexusEntity: import("Meta/index.js").NexusEntity): void;
        _getID(): string;
        _unqiueId(): string;
        _generateUUI(): string;
        spawnEntity(entityId: string, position: import("Meta/index.js").Vector3, otherData?: any, identiferId?: string | undefined): void;
        ddSepawnEntity(entityId: string, identiferId: string): void;
    };
    $INIT(): Promise<void>;
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
};
export declare type DivineVoxelEngineNexus = typeof DVEN;

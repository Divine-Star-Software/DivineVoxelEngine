import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { BuilderTool } from "../Tools/Build/BuilderTool.js";
import { ChunkDataTool } from "../Tools/Data/WorldData/ChunkDataTool.js";
import { ColumnDataTool } from "../Tools/Data/WorldData/ColumnDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { HeightMapTool } from "../Tools/Data/WorldData/HeightMapTool.js";
import { RegionDataTool } from "../Tools/Data/WorldData/RegionDataTool.js";
import { DataLoaderTool } from "../Tools/Data/DataLoaderTool.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare const DVEW: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
    __renderIsDone: boolean;
    __serverIsDone: boolean;
    TC: any;
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
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
    worldTasks: {
        addChunk: any;
        unLoad: {
            unLoadColumn: any;
        };
        load: {
            loadRegino: any;
            loadReginoHeader: any;
            loadColumn: any;
            loadChunk: any;
        };
    };
    generators: {
        worldData: {
            chunk: {
                create(buffer?: false | ArrayBuffer): SharedArrayBuffer;
            };
            column: {
                create(buffer?: false | ArrayBuffer): SharedArrayBuffer;
            };
            region: {
                create(buffer?: false | ArrayBuffer): SharedArrayBuffer;
            };
        };
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
        };
        world: {
            _currentionDimension: string;
            paint: {
                _dt: DataTool;
                voxel(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                __paint(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                erase(location: import("voxelspaces").LocationData): void;
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
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                _getRegionData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Region;
                remove(location: import("voxelspaces").LocationData): boolean;
            };
            column: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column | undefined;
                _getColumnData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Column;
                remove(location: import("voxelspaces").LocationData): boolean;
                fill(location: import("voxelspaces").LocationData): void;
                height: {
                    getRelative(location: import("voxelspaces").LocationData): number;
                    getAbsolute(location: import("voxelspaces").LocationData): number;
                };
            };
            chunk: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                _getChunkData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
                addFromServer(chunkBuffer: ArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                remove(location: import("voxelspaces").LocationData): boolean;
            };
        };
        columnTags: any;
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
            region: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
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
            column: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
            chunk: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
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
            voxel: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
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
        chunkTags: any;
        regionTags: any;
        regionHeaderReigster: {
            _headers: Map<string, Map<string, {
                data: DataView;
                buffer: SharedArrayBuffer;
            }>>;
            remove(location: import("voxelspaces").LocationData): boolean;
            add(location: import("voxelspaces").LocationData, buffer: SharedArrayBuffer): void;
            get(location: import("voxelspaces").LocationData): false | {
                data: DataView;
                buffer: SharedArrayBuffer;
            } | undefined;
            isStored(location: import("voxelspaces").LocationData): 0 | 1 | -1;
        };
    };
    dataSync: {
        voxelDataCreator: {
            $generateVoxelData(): void;
            palette: {
                _count: number;
                _palette: import("../Meta/Data/WorldData.types.js").VoxelPalette;
                _map: Record<string, number>;
                registerVoxel(voxel: import("../index.js").VoxelData): void;
                get(): import("../Meta/Data/WorldData.types.js").VoxelPalette;
                getMap(): Record<string, number>;
            };
        };
        comms: Record<string, any>;
        commOptions: Record<string, {
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }>;
        _ready: boolean;
        $INIT(): void;
        isReady(): boolean;
        registerComm(comm: any, data?: Partial<{
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }>): void;
        loopThroughComms(func: (comm: any, options: {
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }) => void): void;
        dimesnion: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: string | number, threadId?: string | undefined) => false | import("../Meta/Data/DimensionData.types.js").DimensionData;
                getUnSyncData: (data: string | number, threadId?: string | undefined) => boolean;
            };
            unSync(input: string | number): false | undefined;
            unSyncInThread(commName: string, input: string | number): false | undefined;
            sync(input: string | number): false | undefined;
            syncInThread(commName: string, input: string | number): false | undefined;
        };
        chunk: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        column: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        region: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        regionHeader: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").WorldDataSync;
                getUnSyncData: (data: import("voxelspaces").LocationData, threadId?: string | undefined) => boolean;
            };
            unSync(input: import("voxelspaces").LocationData): false | undefined;
            unSyncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
            sync(input: import("voxelspaces").LocationData): false | undefined;
            syncInThread(commName: string, input: import("voxelspaces").LocationData): false | undefined;
        };
        voxelTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | [RemoteTagManagerInitData, SharedArrayBuffer];
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        chunkTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => any;
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        columnTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => any;
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        regionTags: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | [RemoteTagManagerInitData, RemoteTagManagerInitData];
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        voxelPalette: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: void, threadId?: string | undefined) => false | [import("../Meta/Data/WorldData.types.js").VoxelPalette, import("../Meta/Data/WorldData.types.js").VoxelPaletteMap];
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: void): false | undefined;
            syncInThread(commName: string, input: void): false | undefined;
        };
        stringMap: {
            data: {
                dataSyncType: string | number;
                commCheck: (options: {
                    worldData: boolean;
                    worldDataTags: boolean;
                    voxelPalette: boolean;
                    voxelTags: boolean;
                    materials: boolean;
                    colliders: boolean;
                }, threadId?: string | undefined) => boolean;
                getSyncData: (data: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync, threadId?: string | undefined) => false | import("../Meta/Data/DataSync.types.js").RegisterStringMapSync;
                getUnSyncData: (data: void, threadId?: string | undefined) => false;
            };
            unSync(input: void): false | undefined;
            unSyncInThread(commName: string, input: void): false | undefined;
            sync(input: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): false | undefined;
            syncInThread(commName: string, input: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): false | undefined;
        };
    };
    fxComm: any;
    dataComm: any;
    nexusComm: any;
    parentComm: any;
    ccm: any;
    richWorldComm: any;
    voxelManager: {
        voxelData: Map<string, import("../index.js").VoxelData>;
        getVoxelData(id: string): import("../index.js").VoxelData;
        registerVoxelData(data: import("../index.js").VoxelData | import("../index.js").VoxelData[]): void;
    };
    itemManager: {
        itemData: Record<string, import("../Meta/Data/Items/Item.types.js").ItemData>;
        _onRegister: (data: import("../Meta/Data/Items/Item.types.js").ItemData) => void;
        getItemData(id: string): import("../Meta/Data/Items/Item.types.js").ItemData;
        registerItemData(data: import("../Meta/Data/Items/Item.types.js").ItemData): void;
        onRegister(func: (data: import("../Meta/Data/Items/Item.types.js").ItemData) => void): void;
    };
    cQueues: {
        $INIT(): void;
        _queueMap: Map<string | number, number>;
        addQueue(queueKey: string | number): boolean;
        removeQueue(queueKey: string | number): boolean;
        filterQueues(filter: (queueKey: string | number) => boolean): void;
        filterOldQueues(maxTime?: number): void;
        rgb: {
            update: any;
            remove: any;
        };
        worldSun: any;
        voxelUpdate: {
            erase: any;
            paint: any;
        };
        sun: {
            update: any;
            remove: any;
        };
        explosion: {
            run: any;
        };
        flow: {
            update: any;
            remove: any;
        };
        build: {
            chunk: any;
        };
        generate: any;
    };
    cTasks: {
        runQueue: {
            build: {
                chunk: any;
            };
        };
        addToQueue: {
            rgb: {
                update: any;
                remove: null;
            };
            build: {
                addToRebuildQueue: any;
            };
            buildChunk: any;
        };
    };
    tags: {
        voxels: {
            _nodeMap: Map<string, import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes>;
            _stringMaps: Map<string, {
                count: number;
                found: Record<string, number>;
                map: string[];
                allowedComms: string[];
            }>;
            _defaults: Map<string, number>;
            addNode(node: import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes | import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes[]): void;
            getNode(id: string): import("../Meta/Data/Tags/TagBuilder.types.js").TagBuilderNodes | undefined;
            setDefaults(tagManager: TagManagerBase): void;
            setNode(id: string, value: string | number | boolean | number[], tagManager: TagManagerBase): false | undefined;
            $INIT(totalVoxels: number): any;
            $SYNC(): void;
        };
        chunks: any;
    };
    isReady(): any;
    syncSettings(data: EngineSettingsData): void;
    $INIT(): Promise<void>;
    getAllTools(): {
        brush: import("../Tools/Brush/Brush.js").BrushTool & {
            paintAndAwaitUpdate(): Promise<unknown>;
            eraseAndAwaitUpdate(): Promise<unknown>;
            paintAndUpdate(onDone?: Function | undefined): void;
            eraseAndUpdate(onDone?: Function | undefined): void;
            explode(radius?: number, onDone?: Function | undefined): void;
        };
        builder: BuilderTool;
        data: DataTool;
        chunkData: ChunkDataTool;
        columnData: ColumnDataTool;
        regonData: RegionDataTool;
        heightMap: HeightMapTool;
        tasks: import("../Tools/Tasks/TasksTool.js").TaskTool;
    };
    getBrush(): import("../Tools/Brush/Brush.js").BrushTool & {
        paintAndAwaitUpdate(): Promise<unknown>;
        eraseAndAwaitUpdate(): Promise<unknown>;
        paintAndUpdate(onDone?: Function | undefined): void;
        eraseAndUpdate(onDone?: Function | undefined): void;
        explode(radius?: number, onDone?: Function | undefined): void;
    };
    getBuilder(): BuilderTool;
    getDataTool(): DataTool;
    getRegionTool(): RegionDataTool;
    getChunkDataTool(): ChunkDataTool;
    getColumnDataTool(): ColumnDataTool;
    getHeightMapTool(): HeightMapTool;
    getTasksTool(): import("../Tools/Tasks/TasksTool.js").TaskTool;
    getDataLoaderTool(): DataLoaderTool;
};
export declare type DivineVoxelEngineWorld = typeof DVEW;

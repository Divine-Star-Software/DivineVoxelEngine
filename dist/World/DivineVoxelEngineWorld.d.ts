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
    worldTasks: {
        addChunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData>;
        unLoad: {
            unLoadColumn: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData>;
        };
        load: {
            loadRegino: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").LoadWorldDataTasks>;
            loadReginoHeader: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").LoadRegionHeadertasks>;
            loadColumn: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").LoadWorldDataTasks>;
            loadChunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").LoadWorldDataTasks>;
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
            paint: {
                _dt: DataTool;
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
            getTotalLoadedChunks(): number;
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
            remove(location: import("../Meta/Data/CommonTypes.js").LocationData): boolean;
            add(location: import("../Meta/Data/CommonTypes.js").LocationData, buffer: SharedArrayBuffer): void;
            get(location: import("../Meta/Data/CommonTypes.js").LocationData): false | {
                data: DataView;
                buffer: SharedArrayBuffer;
            } | undefined;
            isStored(location: import("../Meta/Data/CommonTypes.js").LocationData): 1 | -1 | 0;
        };
    };
    dataSync: {
        voxelDataCreator: {
            voxelBuffer: SharedArrayBuffer;
            voxelMapBuffer: SharedArrayBuffer;
            initData: import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData;
            __shapeMapSet: boolean;
            isReady(): boolean;
            $generateVoxelData(): void;
            setShapeMap(newShapeMap: Record<string, number>): void;
            palette: {
                _count: number;
                _palette: Record<number, string>;
                _map: Record<string, number>;
                registerVoxel(voxel: import("../Meta/index.js").VoxelData): void;
                getVoxelBaseId(id: number): number;
                getVoxelStateId(voxelId: string, voxelState: number): number;
                getVoxelStringId(voxelId: number): string;
                getVoxelState(voxelId: number): number;
                get(): Record<number, string>;
                getMap(): Record<string, number>;
            };
        };
        comms: Record<string, import("../Libs/ThreadComm/Comm/Comm.js").CommBase | import("../Libs/ThreadComm/Manager/CommManager.js").CommManager>;
        commOptions: Record<string, {
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }>;
        $INIT(): Promise<unknown>;
        isReady(): boolean;
        registerComm(comm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase | import("../Libs/ThreadComm/Manager/CommManager.js").CommManager, data?: Partial<{
            worldData: boolean;
            worldDataTags: boolean;
            voxelPalette: boolean;
            voxelTags: boolean;
            materials: boolean;
            colliders: boolean;
        }>): void;
        dimesnion: {
            unSync(id: string | number): void;
            unSyncInThread(commName: string, id: string | number): void;
            sync(data: import("../Meta/Data/DimensionData.types.js").DimensionData): void;
            syncInThread(commName: string, data: import("../Meta/Data/DimensionData.types.js").DimensionData): void;
        };
        chunk: {
            unSync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            unSyncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            sync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            syncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
        };
        column: {
            unSync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            unSyncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            sync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            syncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
        };
        regionHeader: {
            unSync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            unSyncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            sync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            syncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
        };
        region: {
            unSync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            unSyncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            sync(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
            syncInThread(commName: string, location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): void;
        };
        voxelTags: {
            sync(): void;
            syncInThread(commName: string): void;
        };
        materials: {
            sync(): void;
            syncInThread(commName: string): void;
        };
        colliders: {
            sync(): void;
            syncInThread(commName: string): void;
        };
        chunkTags: {
            sync(): void;
            syncInThread(commName: string): void;
        };
        columnTags: {
            sync(): void;
            syncInThread(commName: string): void;
        };
        regionTags: {
            sync(): void;
            syncInThread(commName: string): void;
        };
        voxelPalette: {
            sync(): void;
            syncInThread(commName: string): void;
        };
    };
    fxComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    dataComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    nexusComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    ccm: import("../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
        tasks: {
            build: {
                chunk: (data: import("../Meta/Tasks/Tasks.types.js").BuildTasks) => number;
                column: (data: import("../Meta/Tasks/Tasks.types.js").BuildTasks) => number;
                entity: (x: number, y: number, z: number, width: number, depth: number, height: number, composed: number, voxelData: Uint32Array[], voxelStateData: Uint32Array[]) => number;
                item: (data: any) => number;
            };
        };
    };
    richWorldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        setInitalData(data: import("../Meta/Data/RichWorldData.types.js").SetRichVoxel): void;
        removeRichData(data: import("../Meta/Data/CommonTypes.js").LocationData): void;
    };
    entityConstructor: {
        voxelData: Uint32Array[] | null;
        voxelStateData: Uint32Array[] | null;
        _3dArray: {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: Uint32Array | number[]): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Vector3, array: Uint32Array | number[]): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Vector3, array: Uint32Array | number[]): number;
            setValue(x: number, y: number, z: number, array: Uint32Array | number[], value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Vector3, array: Uint32Array | number[], value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Vector3, array: Uint32Array | number[], value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array | number[]): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Vector3, array: Uint32Array | number[]): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Vector3;
        };
        voxelByte: {
            getLevel(stateData: number): number;
            setLevel(stateData: number, level: number): number;
            getLevelState(stateData: number): number;
            setLevelState(stateData: number, levelState: number): number;
            getShapeState(voxelData: number): number;
            setShapeState(voxelData: number, shapeState: number): number;
        };
        lightByte: {
            SRS: number;
            _lightValues: [s: number, r: number, g: number, b: number];
            getS(value: number): number;
            getR(value: number): number;
            getG(value: number): number;
            getB(value: number): number;
            setS(value: number, sl: number): number;
            setR(value: number, sl: number): number;
            setG(value: number, sl: number): number;
            setB(value: number, sl: number): number;
            removeS(sl: number): number;
            hasRGBLight(sl: number): boolean;
            hasSunLight(sl: number): boolean;
            mixLight(l1: number, l2: number): number;
            getRGB(sl: number): number;
            setRGB(value: number, sl: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): [s: number, r: number, g: number, b: number];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number, nl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            isLessThanForSunAddUp(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(sl: number, nl: number): number;
            getMinusOneForSun(sl: number, nl: number): number;
            isLessThanForSunRemove(n1: number, sl: number): boolean;
            isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
            sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
            removeSunLight(sl: number): number;
            minusOneForAll(sl: number): number;
        };
        pos: {
            x: number;
            y: number;
            z: number;
        };
        composed: number;
        width: number;
        depth: number;
        height: number;
        begin(width: number, height: number, depth: number, composed?: number): void;
        setLight(s: number, r: number, g: number, b: number, x: number, y: number, z: number, composed?: number): void;
        fillLight(s: number, r: number, g: number, b: number, composed?: number): void;
        addVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number, composed?: number): void;
        build(x: number, y: number, z: number): void;
    };
    voxelManager: {
        voxelData: Record<string, import("../Meta/index.js").VoxelData>;
        _onRegister: (data: import("../Meta/index.js").VoxelData) => void;
        getVoxelData(id: string): import("../Meta/index.js").VoxelData;
        registerVoxelData(data: import("../Meta/index.js").VoxelData): void;
        onRegister(func: (data: import("../Meta/index.js").VoxelData) => void): void;
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
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        };
        worldSun: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        voxelUpdate: {
            erase: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            paint: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").PaintTasks>;
        };
        sun: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        };
        explosion: {
            run: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").ExplosionTasks>;
        };
        flow: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasks>;
        };
        build: {
            chunk: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>>;
        };
        generate: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").GenerateTasks>;
    };
    cTasks: {
        runQueue: {
            rgb: {
                update: null;
                remove: null;
            };
            worldSun: {
                fill: null;
                columnFill: null;
                flood: null;
            };
            sun: {
                update: null;
                remove: null;
            };
            flow: {
                update: null;
                remove: null;
            };
            build: {
                chunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").RunRebuildTasks>;
            };
            generate: {
                chunk: null;
            };
        };
        addToQueue: {
            rgb: {
                update: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<any>;
                remove: null;
            };
            worldSun: {
                fill: null;
                columnFill: null;
                flood: null;
            };
            sun: {
                update: null;
                remove: null;
            };
            flow: {
                update: null;
                remove: null;
            };
            build: {
                addToRebuildQueue: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue>;
            };
            generate: {
                chunk: null;
            };
        };
    };
    tags: {
        voxels: import("../Libs/DivineBinaryTags/TagManager.js").TagManager;
        chunks: import("../Libs/DivineBinaryTags/TagManager.js").TagManager;
    };
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
    generate(x: number, z: number, data?: any): void;
    createItem(itemId: string, x: number, y: number, z: number): void;
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
        tasks: {
            _data: {
                dimension: string;
                queue: string;
            };
            _thread: string;
            _priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
            setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
            setFocalPoint(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): any;
            generate: {
                async: {
                    _s: any;
                    add(x: number, y: number, z: number, data?: any): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, data: any, onDone: (data: any) => void): void;
                };
            };
            voxelUpdate: {
                erase: {
                    deferred: {
                        _s: any;
                        run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                    };
                    async: {
                        _s: any;
                        add(x: number, y: number, z: number): void;
                        run(onDone: Function): void;
                        runAndAwait(): Promise<void>;
                    };
                };
                paint: {
                    deferred: {
                        _s: any;
                        run(x: number, y: number, z: number, raw: import("../Meta/index.js").RawVoxelData, onDone: (data: any) => void): void;
                    };
                    async: {
                        _s: any;
                        add(x: number, y: number, z: number, raw: import("../Meta/index.js").RawVoxelData): void;
                        run(onDone: Function): void;
                        runAndAwait(): Promise<void>;
                    };
                };
            };
            build: {
                chunk: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                column: {
                    async: {};
                    deferred: {
                        _s: any;
                        run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                    };
                };
            };
            explosion: {
                run: {
                    _s: any;
                    add(x: number, y: number, z: number, radius: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            flow: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            anaylzer: {
                propagation: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
                update: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
            };
            light: {
                rgb: {
                    update: {
                        _s: any;
                        add(x: number, y: number, z: number, queue?: string | null): void;
                        run(onDone: Function): void;
                        runAndAwait(): Promise<void>;
                    };
                    remove: {
                        _s: any;
                        add(x: number, y: number, z: number, queue?: string | null): void;
                        run(onDone: Function): void;
                        runAndAwait(): Promise<void>;
                    };
                };
                sun: {
                    update: {
                        _s: any;
                        add(x: number, y: number, z: number): void;
                        run(onDone: Function): void;
                        runAndAwait(): Promise<void>;
                    };
                    remove: {
                        _s: any;
                        add(x: number, y: number, z: number): void;
                        run(onDone: Function): void;
                        runAndAwait(): Promise<void>;
                    };
                };
                worldSun: {
                    _s: any;
                    deferred: {
                        _s: any;
                        run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                    };
                    add(x: number, z: number, y?: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
        };
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
    getTasksTool(): {
        _data: {
            dimension: string;
            queue: string;
        };
        _thread: string;
        _priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
        setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
        setFocalPoint(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): any;
        generate: {
            async: {
                _s: any;
                add(x: number, y: number, z: number, data?: any): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            deferred: {
                _s: any;
                run(x: number, y: number, z: number, data: any, onDone: (data: any) => void): void;
            };
        };
        voxelUpdate: {
            erase: {
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
                async: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            paint: {
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, raw: import("../Meta/index.js").RawVoxelData, onDone: (data: any) => void): void;
                };
                async: {
                    _s: any;
                    add(x: number, y: number, z: number, raw: import("../Meta/index.js").RawVoxelData): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
        };
        build: {
            chunk: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            column: {
                async: {};
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
            };
        };
        explosion: {
            run: {
                _s: any;
                add(x: number, y: number, z: number, radius: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        flow: {
            update: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        anaylzer: {
            propagation: {
                _s: any;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
            update: {
                _s: any;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
        };
        light: {
            rgb: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            sun: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            worldSun: {
                _s: any;
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
                add(x: number, z: number, y?: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
    };
    getDataLoaderTool(): DataLoaderTool;
};
export declare type DivineVoxelEngineWorld = typeof DVEW;

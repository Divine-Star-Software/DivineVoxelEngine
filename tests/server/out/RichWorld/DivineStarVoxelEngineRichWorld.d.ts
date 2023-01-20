import type { EngineSettingsData } from "Meta/index.js";
export declare const DVERW: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
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
    worldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    richData: {
        _dimensions: import("../Meta/Data/RichWorldData.types.js").RichWorldDimensions;
        initalData: Record<string, any>;
        getRegion(x: number, y: number, z: number): false | import("../Meta/Data/RichWorldData.types.js").RichRegion;
        getDimension(dimension: string): Record<string, import("../Meta/Data/RichWorldData.types.js").RichRegion>;
        getChunk(x: number, y: number, z: number): false | import("../Meta/Data/RichWorldData.types.js").RichChunk;
        addRegion(x: number, y: number, z: number): false | import("../Meta/Data/RichWorldData.types.js").RichRegion;
        addChunk(x: number, y: number, z: number): import("../Meta/Data/RichWorldData.types.js").RichChunk;
        setData(x: number, y: number, z: number, data: any): void;
        getData<T_5>(x: number, y: number, z: number): false | T_5;
        removeData(x: number, y: number, z: number): void;
        registerInitalDataForVoxel(voxelId: string, data: any): void;
        hasInitalData(voxelId: string): boolean;
        setInitalData(voxelId: string, x: number, y: number, z: number): void;
    };
    voxelManager: {
        voxelData: Record<string, import("Meta/index.js").VoxelData>;
        _onRegister: (data: import("Meta/index.js").VoxelData) => void;
        getVoxelData(id: string): import("Meta/index.js").VoxelData;
        registerVoxelData(data: import("Meta/index.js").VoxelData): void;
        onRegister(func: (data: import("Meta/index.js").VoxelData) => void): void;
    };
    takss: {
        setVoxel: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Data/RichWorldData.types.js").SetRichVoxel>;
        removeVoxel: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Data/CommonTypes.js").LocationData>;
    };
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(): Promise<void>;
};
export declare type DivineVoxelEngineRichWorld = typeof DVERW;

import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
export declare const DVERW: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
    TC: {
        threadNumber: number;
        threadName: string;
        environment: "node" | "browser";
        _comms: Record<string, import("threadcomm").CommBase>;
        _commManageras: Record<string, import("threadcomm").CommManager>;
        _tasks: Record<string, import("threadcomm").Task<any>>;
        _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
        _onDataSync: Record<string, import("threadcomm").DataSync<any, any>>;
        parent: import("threadcomm").CommBase;
        __internal: Record<number, Record<number, (data: any, event: any) => void>>;
        __initalized: boolean;
        __expectedPorts: Record<string, boolean>;
        $INIT(threadName: string): Promise<void>;
        getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
        addComm(comm: import("threadcomm").CommBase): void;
        createComm<T>(name: string, mergeObject?: T | undefined): T & import("threadcomm").CommBase;
        createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
        getComm(id: string): import("threadcomm").CommBase;
        getCommManager(id: string): import("threadcomm").CommManager;
        __throwError(message: string): never;
        getWorkerPort(): Promise<any>;
        __handleInternalMessage(data: any[], event: any): void;
        __isInternalMessage(data: any[]): boolean;
        __handleTasksDone(tasksId: string, mode: number, threadId: string, tid: string, tasksData: any): void;
        __handleTasksMessage(data: any[]): Promise<void>;
        __isTasks(data: any[]): boolean;
        registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: Function | undefined) => void, mode?: "async" | "deffered" | undefined): import("threadcomm").Task<T_1>;
        __hanldeDataSyncMessage(data: any[]): Promise<void>;
        __isDataSync(data: any[]): boolean;
        onDataSync<T_2, K>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K) => void) | undefined): import("threadcomm").DataSync<T_2, K>;
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
    worldComm: import("threadcomm").CommBase;
    parentComm: import("threadcomm").CommBase;
    richData: {
        _dimensions: import("../Meta/Data/RichWorldData.types.js").RichWorldDimensions;
        dimensions: {
            get(dimensionId: string): false | Map<string, import("../Meta/Data/RichWorldData.types.js").RichRegion>;
            add(dimensionId: string): Map<any, any>;
        };
        region: {
            _getRegionData(): import("../Meta/Data/RichWorldData.types.js").RichRegion;
            add(location: import("voxelspaces").LocationData): import("../Meta/Data/RichWorldData.types.js").RichRegion;
            get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/RichWorldData.types.js").RichRegion;
            remove(location: import("voxelspaces").LocationData): false | import("../Meta/Data/RichWorldData.types.js").RichRegion;
        };
        column: {
            _getColumnData(): import("../Meta/Data/RichWorldData.types.js").RichColumn;
            add(location: import("voxelspaces").LocationData): import("../Meta/Data/RichWorldData.types.js").RichColumn;
            get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/RichWorldData.types.js").RichColumn;
            remove(location: import("voxelspaces").LocationData): false | import("../Meta/Data/RichWorldData.types.js").RichColumn;
        };
        chunk: {
            _getChunkData(): import("../Meta/Data/RichWorldData.types.js").RichDataSchema;
            add(location: import("voxelspaces").LocationData): import("divine-binary-object").TypedNode<{}>;
            get(location: import("voxelspaces").LocationData): false | import("divine-binary-object").TypedNode<import("../Meta/Data/RichWorldData.types.js").RichDataSchema>;
            remove(location: import("voxelspaces").LocationData): false | import("divine-binary-object").TypedNode<import("../Meta/Data/RichWorldData.types.js").RichDataSchema>;
        };
    };
    voxelManager: {
        voxelData: Map<string, import("../index.js").VoxelData>;
        getVoxelData(id: string): import("../index.js").VoxelData;
        registerVoxelData(data: import("../index.js").VoxelData | import("../index.js").VoxelData[]): void;
    };
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(): Promise<void>;
};
export declare type DivineVoxelEngineRichWorld = typeof DVERW;

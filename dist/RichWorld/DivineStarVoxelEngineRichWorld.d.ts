import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
export declare const DVERW: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
    TC: any;
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
    worldComm: any;
    parentComm: any;
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
    isReady(): any;
    $INIT(): Promise<void>;
};
export declare type DivineVoxelEngineRichWorld = typeof DVERW;

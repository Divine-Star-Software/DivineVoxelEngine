import type { EngineSettingsData } from "Meta/index.js";
export declare const DVERW: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
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
        getData<T_2>(x: number, y: number, z: number): false | T_2;
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

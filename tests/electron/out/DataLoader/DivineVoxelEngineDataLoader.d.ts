import type { EngineSettingsData } from "Meta/index.js";
export declare const DVEDL: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
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
    };
    settings: {
        settings: {
            nexus: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            data: {
                enabled: boolean;
                autoSyncChunks: boolean;
            };
            fx: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            server: {
                enabled: boolean;
            };
            richWorld: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            textures: {
                animationTime: number;
                width: number;
                height: number;
            };
            updating: {
                autoRebuild: boolean;
            };
            world: {
                maxX: number;
                minX: number;
                maxZ: number;
                minZ: number;
                maxY: number;
                minY: number;
            };
            regions: {
                regionXPow2: number;
                regionYPow2: number;
                regionZPow2: number;
            };
            chunks: {
                autoHeightMap: boolean;
                chunkXPow2: number;
                chunkYPow2: number;
                chunkZPow2: number;
            };
            voxels: {
                doColors: boolean;
            };
            flow: {
                enable: boolean;
            };
            lighting: {
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                autoRGBLight: boolean;
                autoSunLight: boolean;
            };
            meshes: {
                clearChachedGeometry: boolean;
                checkMagmaCollisions: boolean;
                checkLiquidCollisions: boolean;
                checkFloraCollisions: boolean;
                checkSolidCollisions: boolean;
                seralize: boolean;
                pickable: boolean;
            };
            materials: {
                mode: string;
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                disableFloraShaderEffects: boolean;
                disableLiquidShaderEffects: boolean;
            };
        };
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
            getChunkKey(chunkPOS: import("Meta/index.js").Vector3): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Vector3): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Vector3): {
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
    dataSyncNode: {
        _states: Record<string, boolean>;
        isReady(): boolean;
        voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
        voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
        dimension: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DimensionData.types.js").DimensionData, void>;
        chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").ChunkSyncData, import("../Meta/Data/DataSync.types.js").ChunkUnSyncData>;
        column: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").ChunkSyncData, import("../Meta/Data/DataSync.types.js").ChunkUnSyncData>;
        region: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").RegionSyncData, import("../Meta/Data/DataSync.types.js").RegionUnSyncData>;
        chunkTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Meta/Util.types.js").RemoteTagManagerInitData, void>;
        columnTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Meta/Util.types.js").RemoteTagManagerInitData, void>;
        regionTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Meta/Util.types.js").RemoteTagManagerInitData, void>;
    };
    data: {
        voxelDataCreator: {
            voxelBuffer: SharedArrayBuffer;
            voxelMapBuffer: SharedArrayBuffer;
            initData: import("../Libs/DivineBinaryTags/Meta/Util.types.js").RemoteTagManagerInitData;
            __shapeMapSet: boolean;
            isReady(): boolean;
            $createVoxelData(): void;
            setShapeMap(newShapeMap: Record<string, number>): void;
            palette: {
                _count: number;
                _palette: Record<number, string>;
                _map: Record<string, number>;
                registerVoxel(voxel: import("Meta/index.js").VoxelData): void;
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
            chunks: boolean;
            voxelPalette: boolean;
            voxelData: boolean;
        }>;
        $INIT(): Promise<unknown>;
        isReady(): boolean;
        registerComm(comm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase | import("../Libs/ThreadComm/Manager/CommManager.js").CommManager): void;
        dimesnion: {
            unSync(id: string | number): void;
            unSyncInThread(commName: string, id: string | number): void;
            sync(data: import("../Meta/Data/DimensionData.types.js").DimensionData): void;
            syncInThread(commName: string, data: import("../Meta/Data/DimensionData.types.js").DimensionData): void;
        };
        chunk: {
            unSync(dimesnion: string, x: number, y: number, z: number): void;
            unSyncInThread(commName: string, dimension: string, x: number, y: number, z: number): void;
            sync(dimension: string, x: number, y: number, z: number): void;
            syncInThread(commName: string, dimesnion: string, x: number, y: number, z: number): void;
        };
        column: {
            unSync(dimesnion: string, x: number, y: number, z: number): void;
            unSyncInThread(commName: string, dimension: string, x: number, y: number, z: number): void;
            sync(dimension: string, x: number, y: number, z: number): void;
            syncInThread(commName: string, dimesnion: string, x: number, y: number, z: number): void;
        };
        region: {
            unSync(dimesnion: string, x: number, y: number, z: number): void;
            unSyncInThread(commName: string, dimension: string, x: number, y: number, z: number): void;
            sync(dimension: string, x: number, y: number, z: number): void;
            syncInThread(commName: string, dimesnion: string, x: number, y: number, z: number): void;
        };
        voxelTags: {
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
    worldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    dataManager: {
        dataHanlder: import("../Meta/Interfaces/DataLoader/DataHandler.type.js").DataHandler | null;
        setDataHandler(handler: import("../Meta/Interfaces/DataLoader/DataHandler.type.js").DataHandler): void;
        saveChunk(x: number, y: number, z: number): void;
        loadChunk(x: number, y: number, z: number): void;
        _pos: {
            x: number;
            y: number;
            z: number;
            newIndex: number;
        };
        _sab: {
            sab: SharedArrayBuffer;
            newIndex: number;
        };
        loadRegion(x: number, y: number, z: number): Promise<void>;
        _getSAB(regionArray: Uint32Array, currentIndex: number, arrayLength: number): {
            sab: SharedArrayBuffer;
            newIndex: number;
        };
        _getPos(regionArray: Uint32Array, currentIndex: number): {
            x: number;
            y: number;
            z: number;
            newIndex: number;
        };
        saveRegion(x: number, y: number, z: number): void;
        _addPositionToBuffer(x: number, y: number, z: number, regionArray: Uint32Array, currentIndex: number): number;
        _addArrayToBuffer(regionArray: Uint32Array, currentIndex: number, array: Uint32Array): number;
        _getRegionBufferSize(totalChunks: number): number;
    };
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(): Promise<void>;
};
export declare type DivineVoxelEngineData = typeof DVEDL;

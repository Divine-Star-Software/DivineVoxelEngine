import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { CommBase } from "Libs/ThreadComm/Comm/Comm.js";
import type { CommManager } from "Libs/ThreadComm/Manager/CommManager.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
declare type CommSyncOptions = {
    worldData: boolean;
    worldDataTags: boolean;
    voxelPalette: boolean;
    voxelTags: boolean;
    materials: boolean;
    colliders: boolean;
};
export declare const DataSync: {
    voxelDataCreator: {
        voxelBuffer: SharedArrayBuffer;
        voxelMapBuffer: SharedArrayBuffer;
        initData: RemoteTagManagerInitData;
        __shapeMapSet: boolean;
        isReady(): boolean;
        $generateVoxelData(): void;
        setShapeMap(newShapeMap: Record<string, number>): void;
        palette: {
            _count: number;
            _palette: import("../../Meta/Data/WorldData.types.js").VoxelPalette;
            _map: Record<string, number>;
            registerVoxel(voxel: import("../../Meta/index.js").VoxelData): void;
            get(): import("../../Meta/Data/WorldData.types.js").VoxelPalette;
            getMap(): Record<string, number>;
        };
    };
    comms: Record<string, CommBase | CommManager>;
    commOptions: Record<string, CommSyncOptions>;
    $INIT(): Promise<unknown>;
    isReady(): boolean;
    registerComm(comm: CommBase | CommManager, data?: Partial<CommSyncOptions>): void;
    dimesnion: {
        unSync(id: string | number): void;
        unSyncInThread(commName: string, id: string | number): void;
        sync(data: DimensionData): void;
        syncInThread(commName: string, data: DimensionData): void;
    };
    chunk: {
        unSync(location: LocationData): void;
        unSyncInThread(commName: string, location: LocationData): void;
        sync(location: LocationData): void;
        syncInThread(commName: string, location: LocationData): void;
    };
    column: {
        unSync(location: LocationData): void;
        unSyncInThread(commName: string, location: LocationData): void;
        sync(location: LocationData): void;
        syncInThread(commName: string, location: LocationData): void;
    };
    regionHeader: {
        unSync(location: LocationData): void;
        unSyncInThread(commName: string, location: LocationData): void;
        sync(location: LocationData): void;
        syncInThread(commName: string, location: LocationData): void;
    };
    region: {
        unSync(location: LocationData): void;
        unSyncInThread(commName: string, location: LocationData): void;
        sync(location: LocationData): void;
        syncInThread(commName: string, location: LocationData): void;
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
export {};

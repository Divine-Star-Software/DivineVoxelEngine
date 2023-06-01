import type { LocationData } from "voxelspaces";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { CommBase, CommManager } from "threadcomm";
import type { PaletteSyncData, RegisterObjectMapSync, RegisterStringMapSync, WorldDataSync } from "Meta/Data/DataSync.types.js";
import type { RemoteTagManagerInitData } from "divine-binary-tags";
type CommSyncOptions = {
    worldData: boolean;
    worldDataTags: boolean;
    voxelPalette: boolean;
    voxelTags: boolean;
    materials: boolean;
    colliders: boolean;
};
declare class DataSyncNode<SyncInput, SyncOutput, UnSyncInput, UnSyncOutput> {
    data: {
        dataSyncType: number | string;
        commCheck: (options: CommSyncOptions, threadId?: string) => boolean;
        getSyncData: (data: SyncInput, threadId?: string) => SyncOutput | false;
        getUnSyncData: (data: UnSyncInput, threadId?: string) => UnSyncOutput | false;
    };
    constructor(data: {
        dataSyncType: number | string;
        commCheck: (options: CommSyncOptions, threadId?: string) => boolean;
        getSyncData: (data: SyncInput, threadId?: string) => SyncOutput | false;
        getUnSyncData: (data: UnSyncInput, threadId?: string) => UnSyncOutput | false;
    });
    unSync(input: UnSyncInput): false | undefined;
    unSyncInThread(commName: string, input: UnSyncInput): false | undefined;
    sync(input: SyncInput): false | undefined;
    syncInThread(commName: string, input: SyncInput): false | undefined;
}
export declare const DataSync: {
    comms: Record<string, CommBase | CommManager>;
    commOptions: Record<string, CommSyncOptions>;
    _ready: boolean;
    $INIT(): void;
    isReady(): boolean;
    registerComm(comm: CommBase | CommManager, data?: Partial<CommSyncOptions>): void;
    loopThroughComms(func: (comm: CommBase | CommManager, options: CommSyncOptions) => void): void;
    worldData: {
        dimesnion: DataSyncNode<string | number, DimensionData, string | number, boolean>;
        chunk: DataSyncNode<LocationData, WorldDataSync, LocationData, LocationData>;
        column: DataSyncNode<LocationData, WorldDataSync, LocationData, LocationData>;
        region: DataSyncNode<LocationData, WorldDataSync, LocationData, LocationData>;
        regionHeader: DataSyncNode<LocationData, WorldDataSync, LocationData, boolean>;
    };
    tags: {
        voxel: DataSyncNode<void, [RemoteTagManagerInitData, SharedArrayBuffer], void, false>;
        substance: DataSyncNode<void, RemoteTagManagerInitData, void, false>;
        chunk: DataSyncNode<void, RemoteTagManagerInitData, void, false>;
        column: DataSyncNode<void, RemoteTagManagerInitData, void, false>;
        region: DataSyncNode<void, [RemoteTagManagerInitData, RemoteTagManagerInitData], void, false>;
    };
    palettes: {
        voxel: DataSyncNode<void, PaletteSyncData, void, false>;
        substance: DataSyncNode<void, PaletteSyncData, void, false>;
    };
    maps: {
        strings: DataSyncNode<RegisterStringMapSync, RegisterStringMapSync, void, false>;
        objects: DataSyncNode<RegisterObjectMapSync, RegisterObjectMapSync, void, false>;
    };
};
export {};

import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { CommBase } from "Libs/ThreadComm/Comm/Comm.js";
import type { CommManager } from "Libs/ThreadComm/Manager/CommManager.js";
import type { RegisterStringMapSync, WorldDataSync } from "Meta/Data/DataSync.types.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
import { VoxelPalette, VoxelPaletteMap } from "Meta/Data/WorldData.types.js";
declare type CommSyncOptions = {
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
    voxelDataCreator: {
        $generateVoxelData(): void;
        palette: {
            _count: number;
            _palette: VoxelPalette;
            _map: Record<string, number>;
            registerVoxel(voxel: import("../../Meta/index.js").VoxelData): void;
            get(): VoxelPalette;
            getMap(): Record<string, number>;
        };
    };
    comms: Record<string, CommBase | CommManager>;
    commOptions: Record<string, CommSyncOptions>;
    _ready: boolean;
    $INIT(): void;
    isReady(): boolean;
    registerComm(comm: CommBase | CommManager, data?: Partial<CommSyncOptions>): void;
    loopThroughComms(func: (comm: CommBase | CommManager, options: CommSyncOptions) => void): void;
    dimesnion: DataSyncNode<string | number, DimensionData, string | number, boolean>;
    chunk: DataSyncNode<LocationData, WorldDataSync, LocationData, boolean>;
    column: DataSyncNode<LocationData, WorldDataSync, LocationData, boolean>;
    region: DataSyncNode<LocationData, WorldDataSync, LocationData, boolean>;
    regionHeader: DataSyncNode<LocationData, WorldDataSync, LocationData, boolean>;
    voxelTags: DataSyncNode<void, [RemoteTagManagerInitData, SharedArrayBuffer], void, false>;
    chunkTags: DataSyncNode<void, RemoteTagManagerInitData, void, false>;
    columnTags: DataSyncNode<void, RemoteTagManagerInitData, void, false>;
    regionTags: DataSyncNode<void, [RemoteTagManagerInitData, RemoteTagManagerInitData], void, false>;
    voxelPalette: DataSyncNode<void, [VoxelPalette, VoxelPaletteMap], void, false>;
    stringMap: DataSyncNode<RegisterStringMapSync, RegisterStringMapSync, void, false>;
};
export {};

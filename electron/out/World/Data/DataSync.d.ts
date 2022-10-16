import type { CommBase } from "Libs/ThreadComm/Comm/Comm.js";
import type { CommManager } from "Libs/ThreadComm/Manager/CommManager.js";
declare type CommSyncOptions = {
    chunks: boolean;
    voxelPalette: boolean;
    voxelData: boolean;
};
export declare const DataSync: {
    voxelDataCreator: {
        voxelBuffer: SharedArrayBuffer;
        voxelMapBuffer: SharedArrayBuffer;
        shapeMap: Record<string, number>;
        __shapeMapSet: boolean;
        isReady(): boolean;
        $INIT(): void;
        setShapeMap(shapeMap: Record<string, number>): void;
        flush(): void;
    };
    comms: Record<string, CommBase | CommManager>;
    commOptions: Record<string, CommSyncOptions>;
    $INIT(): void;
    isReady(): boolean;
    registerComm(comm: CommBase | CommManager): void;
    chunk: {
        unSync(dimesnion: number, chunkX: number, chunkY: number, chunkZ: number): void;
        unSyncInThread(commName: string, dimesnion: number, chunkX: number, chunkY: number, chunkZ: number): void;
        sync(dimesnion: number, chunkX: number, chunkY: number, chunkZ: number): void;
        syncInThread(commName: string, dimesnion: number, chunkX: number, chunkY: number, chunkZ: number): void;
    };
    voxelData: {
        sync(): void;
        syncInThread(commName: string): void;
    };
    voxelPalette: {
        sync(): void;
        syncInThread(commName: string): void;
    };
};
export {};

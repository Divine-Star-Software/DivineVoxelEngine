import { VoxelData } from "Meta/index.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
export declare const VoxelDataGenerator: {
    voxelBuffer: SharedArrayBuffer;
    voxelMapBuffer: SharedArrayBuffer;
    initData: RemoteTagManagerInitData;
    __shapeMapSet: boolean;
    isReady(): boolean;
    $generateVoxelData(): void;
    setShapeMap(newShapeMap: Record<string, number>): void;
    palette: {
        _count: number;
        _palette: Record<number, string>;
        _map: Record<string, number>;
        registerVoxel(voxel: VoxelData): void;
        getVoxelBaseId(id: number): number;
        getVoxelStateId(voxelId: string, voxelState: number): number;
        getVoxelStringId(voxelId: number): string;
        getVoxelState(voxelId: number): number;
        get(): Record<number, string>;
        getMap(): Record<string, number>;
    };
};

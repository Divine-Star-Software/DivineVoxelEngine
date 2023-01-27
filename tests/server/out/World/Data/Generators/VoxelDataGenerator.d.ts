import { VoxelData } from "Meta/index.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
import { VoxelPalette } from "Meta/Data/WorldData.types.js";
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
        _palette: VoxelPalette;
        _map: Record<string, number>;
        registerVoxel(voxel: VoxelData): void;
        get(): VoxelPalette;
        getMap(): Record<string, number>;
    };
};

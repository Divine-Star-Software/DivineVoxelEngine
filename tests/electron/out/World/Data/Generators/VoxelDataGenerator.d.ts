import type { VoxelData } from "Meta/index.js";
import type { VoxelPalette } from "Meta/Data/WorldData.types.js";
export declare const VoxelDataGenerator: {
    $generateVoxelData(): void;
    palette: {
        _count: number;
        _palette: VoxelPalette;
        _map: Record<string, number>;
        registerVoxel(voxel: VoxelData): void;
        get(): VoxelPalette;
        getMap(): Record<string, number>;
    };
};

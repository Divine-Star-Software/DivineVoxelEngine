import type { VoxelData } from "Meta/Voxels/Voxel.types";
/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from voxel palettes.
 */
export declare const VoxelPaletteManager: {
    globalVoxelPaletteIndex: number;
    globalVoxelPalette: Record<number, string>;
    globalVoxelPaletteMap: Record<string, number>;
    globalVoxelPaletteRecord: Record<string, string[]>;
    /**# Get Vooxel Id From Global Palette
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     */
    getVoxelPaletteIdFromGlobalPalette(voxelId: string, voxelState: string): number;
    /**# Get Voxel True Id From Global Palette
     * ---
     * Returns the string id and state from the global voxel palette.
     */
    getVoxelDataFromGlobalPalette(voxelId: number): string[];
    registerVoxelForGlobalPalette(voxel: VoxelData): void;
    getGlobalVoxelPalette(): Record<number, string>;
    getGlobalVoxelPaletteMap(): Record<string, number>;
    /**# Get Global Voxel Palette Record
     * ---
     * Returns a record that maps voxel ids and states to already split array of values.
     */
    getGlobalVoxelPaletteRecord(): Record<string, string[]>;
};

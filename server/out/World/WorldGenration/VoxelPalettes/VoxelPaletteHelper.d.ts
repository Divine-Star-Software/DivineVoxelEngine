import type { VoxelData } from "Meta/Voxels/Voxel.types";
/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from voxel palettes.
 */
export declare const VoxelPaletteManager: {
    voxelPaletteCount: number;
    voxelPalette: Record<number, string>;
    voxelPaletteMap: Record<string, number>;
    /**# Get Vooxel Numeric Id
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     */
    getVoxelPaletteId(voxelId: string, voxelState: number): number;
    /**# Get Voxel True Id
     * ---
     * Returns the string id and state from the global voxel palette.
     */
    getVoxelTrueId(voxelId: number): string;
    registerVoxel(voxel: VoxelData): void;
    getVoxelPartentId(id: number): number;
    getVoxelState(voxelId: number): number;
    getVoxelPalette(): Record<number, string>;
    getVoxelPaletteMap(): Record<string, number>;
};

import type { VoxelData } from "Meta/Voxels/Voxel.types";
/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from voxel palettes.
 */
export declare const VoxelPaletteManager: {
    voxelPaletteCount: number;
    voxelPalette: Record<number, string>;
    voxelPaletteMap: Record<string, number>;
    voxelPaletteRecord: Record<string, string[]>;
    /**# Get Vooxel Id From Global Palette
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     */
    getVoxelPaletteId(voxelId: string, voxelState: string): number;
    /**# Get Voxel True Id From Global Palette
     * ---
     * Returns the string id and state from the global voxel palette.
     */
    getVoxelData(voxelId: number): string[];
    registerVoxel(voxel: VoxelData): void;
    _register(id: string, stateId: string): void;
    getVoxelPartentId(id: number): number;
    isVoxelIdAState(id: number): boolean;
    getVoxelPalette(): Record<number, string>;
    getVoxelPaletteMap(): Record<string, number>;
    /**# Get Global Voxel Palette Record
     * ---
     * Returns a record that maps voxel ids and states to already split array of values.
     */
    getVoxelPaletteRecord(): Record<string, string[]>;
};

import { VoxelData } from "Meta/Voxels/Voxel.types";
import { WorldRegion } from "Meta/WorldData/World.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
/**# Voxel Palette Manager
 * ---
 * Used to help decode voxel ids and states from per-region voxel palettes.
 */
export declare class VoxelPaletteManager {
    private DVEW;
    globalVoxelPaletteIndex: number;
    perRegionVoxelRecord: Record<string, string[]>;
    globalVoxelPalette: Record<number, string>;
    globalVoxelPaletteMap: Record<string, number>;
    globalVoxelPaletteRecord: Record<string, string[]>;
    constructor(DVEW: DivineVoxelEngineWorld);
    /**# Get Vooxel Id From Global Palette
     * ---
     * Gets the number id for use of actual world generation.
     * This is what is actually stored in the chunk voxels.
     * @param voxelTrueId
     * @param voxelStateId
     * @returns
     */
    getVoxelPaletteIdFromGlobalPalette(voxelTrueId: string, voxelStateId: string): number;
    /**# Get Voxel True Id From Global Palette
     * ---
     * Returns the string id and state from the global voxel palette.
     * @param voxelId
     * @param voxelStateId
     * @returns
     */
    getVoxelDataFromGlobalPalette(voxelId: number): string[];
    registerVoxelForGlobalPalette(voxel: VoxelData): void;
    registerVoxelForPerRegionVoxelPalette(voxel: VoxelData): void;
    getGlobalVoxelPalette(): Record<number, string>;
    /**# Get Global Voxel Palette Record
     * ---
     * Returns a record that maps voxel ids and states to already split array of values.
     */
    getGlobalVoxelPaletteRecord(): Record<string, string[]>;
    getVoxelDataFromRegion(region: WorldRegion, voxelId: number): string[] | false;
    getVoxelPaletteIdFromRegion(region: WorldRegion, voxelId: string, voxelState: string): number | false;
    addToRegionsVoxelPalette(region: WorldRegion, voxelId: string, voxelState: string): number;
}

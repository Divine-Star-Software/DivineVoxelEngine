import type { WorldGenerationInterface } from "Meta/World/WorldGeneration/WorldGeneration.interface";
import type { VoxelPallet } from "Meta/WorldData/World.types";
/**# World Generation
 * ---
 * Helps with creating the needed format for each chunk.
 */
export declare class WorldGeneration implements WorldGenerationInterface {
    globalVoxelPalletIndex: number;
    globalVoxelPallet: VoxelPallet;
    globalVoxelPalletMap: Record<string, number>;
    getVoxelIdFromGlobalPallet(id: string): number;
    addToGlobalVoxelPallet(id: string, voxleStateData: any[]): void;
    getGlobalVoxelPallet(): VoxelPallet;
}

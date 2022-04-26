import type { DivineVoxelEngineWorld } from "index";
import type { VoxelInteface, VoxelProcessData } from "./Voxel.types";
/**# Voxel Helper
 * ---
 * This is an object that holds shared functions between voxels.
 */
export interface VoxelHelperInterface {
    DVEW: DivineVoxelEngineWorld;
    calculateVoxelAO(data: VoxelProcessData, voxel: VoxelInteface): void;
    calculateVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void;
    processVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void;
}

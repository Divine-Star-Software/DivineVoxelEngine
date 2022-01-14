import type { Util } from "Global/Util.helper";
import { TextureManagerInterface } from "../Textures/TextureManager.interface";
import { VoxelAOCalcData } from "./Voxel.types";

/**# Voxel Helper
 * ---
 * This is an object that holds shared functions between voxels.
 */
export interface VoxelHelperInterface {
 util: Util;

 textureManager: TextureManagerInterface;
 calculateVoxelAO(data: VoxelAOCalcData): void;
}

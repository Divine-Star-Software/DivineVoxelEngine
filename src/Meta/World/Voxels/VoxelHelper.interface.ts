import type { Util } from "Global/Util.helper";
import type { WorldData } from "World/WorldData/WorldData";
import type { TextureManagerInterface } from "../Textures/TextureManager.interface";
import type {  VoxelInteface,VoxelProcessData } from "./Voxel.types";

/**# Voxel Helper
 * ---
 * This is an object that holds shared functions between voxels.
 */
export interface VoxelHelperInterface {
 util: Util;

 worldData : WorldData;

 textureManager: TextureManagerInterface;
 calculateVoxelAO(data: VoxelProcessData, voxel : VoxelInteface): void;
 calculateVoxelLight(data: VoxelProcessData, voxel : VoxelInteface): void;


 processVoxelLight(data : VoxelProcessData , voxel: VoxelInteface)  : void;
}

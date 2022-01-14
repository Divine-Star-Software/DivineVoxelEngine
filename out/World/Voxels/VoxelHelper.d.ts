import type { Util } from "Global/Util.helper";
import type { TextureManagerInterface } from "Meta/World/Textures/TextureManager.interface";
import type { VoxelAOCalcData, VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/World/Voxels/VoxelHelper.interface";
import type { WorldData } from "World/WorldData/WorldData";
import type { VoxelManager } from "./VoxelManager.js";
export declare class VoxelHelper implements VoxelHelperInterface {
    util: Util;
    worldData: WorldData;
    textureManager: TextureManagerInterface;
    voxelManager: VoxelManager;
    constructor(util: Util, worldData: WorldData, textureManager: TextureManagerInterface, voxelManager: VoxelManager);
    calculateVoxelAO(data: VoxelAOCalcData, voxel: VoxelInteface): void;
}

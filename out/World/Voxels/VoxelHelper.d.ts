import type { Util } from "Global/Util.helper";
import type { TextureManagerInterface } from "Meta/World/Textures/TextureManager.interface";
import type { VoxelAOCalcData } from "Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/World/Voxels/VoxelHelper.interface";
import type { WorldData } from "World/WorldData/WorldData";
export declare class VoxelHelper implements VoxelHelperInterface {
    util: Util;
    worldData: WorldData;
    textureManager: TextureManagerInterface;
    constructor(util: Util, worldData: WorldData, textureManager: TextureManagerInterface);
    calculateVoxelAO(data: VoxelAOCalcData): void;
}

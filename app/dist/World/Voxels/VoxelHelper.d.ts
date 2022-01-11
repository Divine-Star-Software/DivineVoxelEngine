import type { Util } from "Global/Util.helper";
import type { TextureManagerInterface } from "Meta/Contents/World/Textures/TextureManager.interface";
import type { VoxelHelperInterface } from "Meta/Contents/World/Voxels/VoxelHelper.interface";
export declare class VoxelHelper implements VoxelHelperInterface {
    util: Util;
    textureManager: TextureManagerInterface;
    constructor(util: Util, textureManager: TextureManagerInterface);
}

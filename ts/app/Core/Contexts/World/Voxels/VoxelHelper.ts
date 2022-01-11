import type { Util } from "Global/Util.helper";
import type { TextureManagerInterface } from "Meta/Contents/World/Textures/TextureManager.interface";
import type { VoxelHelperInterface } from "Meta/Contents/World/Voxels/VoxelHelper.interface";

export class VoxelHelper implements VoxelHelperInterface {

    constructor(public util : Util,public textureManager : TextureManagerInterface) {
        
    }
}
import type { VoxelHelperInterface } from "Meta/Contents/World/Voxels/VoxelHelper.interface";
import type { VoxelManagerInterface } from "Meta/Contents/World/Voxels/VoxelManager.interface";
import type { TextureManagerInterface } from "./Textures/TextureManager.interface";


export interface DVEW {


    textureManager : TextureManagerInterface;
    voxelManager : VoxelManagerInterface;
    voxelHelper : VoxelHelperInterface;
    


}
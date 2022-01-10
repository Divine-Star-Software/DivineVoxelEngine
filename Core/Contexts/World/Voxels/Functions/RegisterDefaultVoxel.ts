import { DVEVoxel1 } from "../default/Voxel1.js";
import { VoxelHelper } from "../VoxelHelper";
import { VoxelManager } from "../VoxelManager";

export function RegisterDefaultVoxels(voxelManager : VoxelManager,voxelHelper : VoxelHelper) {



        const voxel1 = new DVEVoxel1(voxelHelper);
        voxelManager.registerVoxelData("dve:voxel1",voxel1);

}
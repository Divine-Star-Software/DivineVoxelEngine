import { DVEVoxel1 } from "../default/Voxel1.js";
import { DVEVoxel2 } from "../default/Voxel2.js";
export function RegisterDefaultVoxels(voxelManager, voxelHelper) {
    const voxel1 = new DVEVoxel1(voxelHelper);
    voxelManager.registerVoxelData(voxel1.data.id, voxel1);
    const voxel2 = new DVEVoxel2(voxelHelper);
    voxelManager.registerVoxelData(voxel2.data.id, voxel2);
}

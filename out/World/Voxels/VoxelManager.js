export class VoxelManager {
    voxels = {};
    getVoxel(id) {
        return this.voxels[id];
    }
    registerVoxelData(voxel) {
        this.voxels[voxel.data.id] = voxel;
    }
}

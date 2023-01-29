//objects
export const VoxelManager = {
    voxelObjects: new Map(),
    getVoxel(id) {
        return this.voxelObjects.get(id);
    },
    registerVoxel(voxel) {
        this.voxelObjects.set(voxel.id, voxel);
    },
};

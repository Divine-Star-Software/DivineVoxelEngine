export const VoxelManager = {
    voxelData: {},
    getVoxelData(id) {
        const voxelData = this.voxelData[id];
        if (!voxelData) {
            throw new Error(`Voxel with ${id} does not exists.`);
        }
        return voxelData;
    },
    registerVoxelData(data) {
        this.voxelData[data.id] = data;
    },
};

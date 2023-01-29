export const VoxelManager = {
    voxelData: new Map(),
    getVoxelData(id) {
        const voxelData = this.voxelData.get(id);
        if (!voxelData) {
            throw new Error(`Voxel with ${id} does not exists.`);
        }
        return voxelData;
    },
    registerVoxelData(data) {
        if (Array.isArray(data)) {
            for (const voxel of data) {
                this.voxelData.set(voxel.id, voxel);
            }
            return;
        }
        this.voxelData.set(data.id, data);
    },
};

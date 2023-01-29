export const VoxelManager = {
    voxelData: new Map(),
    _onRegister: (data) => { },
    getVoxelData(id) {
        const voxelData = this.voxelData.get(id);
        if (!voxelData) {
            throw new Error(`Voxel with ${id} does not exists.`);
        }
        return voxelData;
    },
    registerVoxelData(data) {
        this.voxelData.set(data.id, data);
        this._onRegister(data);
    },
    onRegister(func) {
        this._onRegister = func;
    },
};

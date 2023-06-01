export class RegisterDataManager {
    data = new Map();
    getData(id) {
        const voxelData = this.data.get(id);
        if (!voxelData) {
            throw new Error(`Voxel with ${id} does not exists.`);
        }
        return voxelData;
    }
    registerData(data) {
        if (Array.isArray(data)) {
            for (const voxel of data) {
                this.data.set(voxel.id, voxel);
            }
            return;
        }
        this.data.set(data.id, data);
    }
    clear() {
        this.data.clear();
    }
}

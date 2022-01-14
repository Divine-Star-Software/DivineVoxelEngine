export class VoxelManager {
    voxels = {};
    shapeMap = {};
    shapeMapHasBeenSet = false;
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        this.shapeMapHasBeenSet = true;
        for (const voxelId of Object.keys(this.voxels)) {
            const voxel = this.voxels[voxelId];
            voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
        }
    }
    shapMapIsSet() {
        return this.shapeMapHasBeenSet;
    }
    getVoxel(id) {
        return this.voxels[id];
    }
    registerVoxelData(voxel) {
        this.voxels[voxel.data.id] = voxel;
    }
}

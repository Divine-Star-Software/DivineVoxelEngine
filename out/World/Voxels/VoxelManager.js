export class VoxelManager {
    voxels = {};
    shapeMap = {};
    shapeMapHasBeenSet = false;
    fluidShapeMap = {};
    fluidShapeMapHasBeenSet = false;
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        this.shapeMapHasBeenSet = true;
        for (const voxelId of Object.keys(this.voxels)) {
            const voxel = this.voxels[voxelId];
            if (voxel.data.substance !== "fluid") {
                voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
            }
        }
    }
    setFluidShapeMap(shapeMap) {
        console.log(shapeMap);
        this.fluidShapeMap = shapeMap;
        this.fluidShapeMapHasBeenSet = true;
        for (const voxelId of Object.keys(this.voxels)) {
            const voxel = this.voxels[voxelId];
            if (voxel.data.substance === "fluid") {
                voxel.trueShapeId = this.fluidShapeMap[voxel.data.shapeId];
            }
        }
    }
    shapMapIsSet() {
        return this.shapeMapHasBeenSet;
    }
    fluidShapMapIsSet() {
        return this.fluidShapeMapHasBeenSet;
    }
    getVoxel(id) {
        return this.voxels[id];
    }
    registerVoxelData(voxel) {
        this.voxels[voxel.data.id] = voxel;
    }
}

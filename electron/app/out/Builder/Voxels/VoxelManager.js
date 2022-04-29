export class VoxelManager {
    DVEB;
    voxelData = {};
    shapeMap = {};
    shapeMapHasBeenSet = false;
    fluidShapeMap = {};
    fluidShapeMapHasBeenSet = false;
    constructor(DVEB) {
        this.DVEB = DVEB;
    }
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        this.shapeMapHasBeenSet = true;
    }
    setFluidShapeMap(shapeMap) {
        this.fluidShapeMap = shapeMap;
        this.fluidShapeMapHasBeenSet = true;
    }
    shapMapIsSet() {
        return this.shapeMapHasBeenSet;
    }
    fluidShapMapIsSet() {
        return this.fluidShapeMapHasBeenSet;
    }
    getVoxel(id) {
        return this.voxelData[id];
    }
    registerVoxelData(voxel) {
        this.voxelData[voxel.id] = voxel;
    }
}

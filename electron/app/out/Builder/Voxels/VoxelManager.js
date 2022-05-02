export class VoxelManager {
    DVEB;
    voxelObjects = {};
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
        return this.voxelObjects[id];
    }
    registerVoxel(voxel) {
        this.voxelObjects[voxel.data.id] = voxel;
    }
    runVoxelHookForAll(hook) {
        for (const voxelID of Object.keys(this.voxelObjects)) {
            const voxel = this.voxelObjects[voxelID];
            if (!voxel.hooks[hook])
                continue;
            voxel.hooks[hook](this.DVEB);
        }
    }
}

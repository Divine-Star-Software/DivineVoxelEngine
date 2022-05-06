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
        for (const voxelId of Object.keys(this.voxelObjects)) {
            const voxel = this.voxelObjects[voxelId];
            if (voxel.data.substance !== "fluid") {
                voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
            }
        }
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

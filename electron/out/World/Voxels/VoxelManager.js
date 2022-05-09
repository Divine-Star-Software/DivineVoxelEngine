export class VoxelManager {
    DVEW;
    voxels = {};
    shapeMap = {};
    shapeMapHasBeenSet = false;
    fluidShapeMap = {};
    fluidShapeMapHasBeenSet = false;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    setShapeMap(shapeMap) {
    }
    setFluidShapeMap(shapeMap) {
    }
    shapMapIsSet() {
        return this.shapeMapHasBeenSet;
    }
    fluidShapMapIsSet() {
        return this.fluidShapeMapHasBeenSet;
    }
    getVoxel(id) {
        console.log(id);
        return this.voxels[id];
    }
    registerVoxelData(voxel) {
        this.voxels[voxel.id] = voxel;
        if (this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            this.DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(voxel);
        }
        if (this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region") {
            this.DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(voxel);
        }
    }
    runVoxelHookForAll(hook) {
        /*   for (const voxelID of Object.keys(this.voxels)) {
           const voxel = this.voxels[voxelID];
           if (!voxel.hooks[hook]) continue;
           voxel.hooks[hook]();
          } */
    }
}

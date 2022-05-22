import { DVEW } from "../DivineVoxelEngineWorld.js";
export const VoxelManager = {
    voxels: {},
    shapeMap: {},
    shapeMapHasBeenSet: false,
    fluidShapeMap: {},
    fluidShapeMapHasBeenSet: false,
    getVoxel(id) {
        return this.voxels[id];
    },
    registerVoxelData(voxel) {
        this.voxels[voxel.id] = voxel;
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(voxel);
        }
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region") {
            DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(voxel);
        }
    },
    getCurrentVoxelSize() {
        const data = JSON.stringify(this.voxels);
        return new Blob([data]).size;
    },
    runVoxelHookForAll(hook) {
        /*   for (const voxelID of Object.keys(this.voxels)) {
         const voxel = this.voxels[voxelID];
         if (!voxel.hooks[hook]) continue;
         voxel.hooks[hook]();
        } */
    },
};

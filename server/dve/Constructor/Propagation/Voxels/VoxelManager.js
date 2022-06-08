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
    },
    runVoxelHookForAll(hook) {
        /*   for (const voxelID of Object.keys(this.voxels)) {
         const voxel = this.voxels[voxelID];
         if (!voxel.hooks[hook]) continue;
         voxel.hooks[hook]();
        } */
    },
};

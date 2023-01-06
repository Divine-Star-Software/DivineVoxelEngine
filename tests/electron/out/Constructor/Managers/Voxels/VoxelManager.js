//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
export const VoxelManager = {
    voxelObjects: {},
    getVoxel(id) {
        return this.voxelObjects[id];
    },
    registerVoxel(voxel) {
        this.voxelObjects[voxel.id] = voxel;
    },
    runVoxelHookForAll(hook) {
        for (const voxelID of Object.keys(this.voxelObjects)) {
            const voxel = this.voxelObjects[voxelID];
            if (!voxel.hooks[hook])
                continue;
            voxel.hooks[hook](DVEC.builder);
        }
    },
    removeVoxelHookForAll(hook) {
        for (const voxelID of Object.keys(this.voxelObjects)) {
            const voxel = this.voxelObjects[voxelID];
            if (!voxel.hooks[hook])
                continue;
            delete voxel.hooks[hook];
        }
    },
};

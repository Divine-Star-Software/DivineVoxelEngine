//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
export const VoxelManager = {
    voxelObjects: {},
    setShapeMap(shapeMap) {
        for (const voxelId of Object.keys(this.voxelObjects)) {
            const voxel = this.voxelObjects[voxelId];
            voxel.trueShapeId = shapeMap[voxel.data.shapeId];
        }
    },
    getVoxel(id) {
        return this.voxelObjects[id];
    },
    getVoxelData(id) {
        return this.voxelObjects[id].data;
    },
    registerVoxel(voxel) {
        this.voxelObjects[voxel.data.id] = voxel;
    },
    runVoxelHookForAll(hook) {
        for (const voxelID of Object.keys(this.voxelObjects)) {
            const voxel = this.voxelObjects[voxelID];
            if (!voxel.hooks[hook])
                continue;
            voxel.hooks[hook](DVEC.DVEB);
        }
    },
};

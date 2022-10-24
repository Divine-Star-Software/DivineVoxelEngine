//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
export const VoxelManager = {
    voxelObjects: {},
    * /*
    syncData() {
     for (const voxelId of Object.keys(this.voxelObjects)) {
      const trueId = DVEC.worldMatrix.getVoxelPaletteId(voxelId,0);
      const shapeId = DVEC.worldMatrix.
      voxel.trueShapeId = shapeMap[voxel.data.shapeId];
     }
    },
    */syncShapeData() { },
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
            voxel.hooks[hook](DVEC.DVEB);
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

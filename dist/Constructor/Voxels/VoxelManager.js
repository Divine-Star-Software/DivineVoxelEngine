//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
export const VoxelManager = {
    voxelObjects: {},
    shapeMap: {},
    shapeMapHasBeenSet: false,
    fluidShapeMap: {},
    fluidShapeMapHasBeenSet: false,
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        this.shapeMapHasBeenSet = true;
        for (const voxelId of Object.keys(this.voxelObjects)) {
            const voxel = this.voxelObjects[voxelId];
            voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
        }
    },
    shapMapIsSet() {
        return this.shapeMapHasBeenSet;
    },
    fluidShapMapIsSet() {
        return this.fluidShapeMapHasBeenSet;
    },
    getVoxel(id) {
        return this.voxelObjects[id];
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

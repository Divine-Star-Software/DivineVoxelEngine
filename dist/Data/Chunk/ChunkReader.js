import { Flat3DArray } from "../Util/Flat3DArray.js";
import { WorldBounds } from "../World/WorldBounds.js";
export const ChunkSpace = {
    syncSettings() {
        //set index sizes
        this.hmBounds.x = WorldBounds.chunkXSize;
        this.hmBounds.z = WorldBounds.chunkXSize;
    },
    hmBounds: {
        x: 16,
        y: 2,
        z: 16,
    },
    getHeightMapIndex(x, y, z) {
        return x + y * this.hmBounds.x + z * this.hmBounds.z * this.hmBounds.y;
    },
    getVoxelDataIndex(x, y, z) {
        const voxPos = WorldBounds.getVoxelPosition(x, y, z);
        return Flat3DArray.getIndex(voxPos.x, voxPos.y, voxPos.z);
    },
};

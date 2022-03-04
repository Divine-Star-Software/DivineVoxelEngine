import { Flat3DArray } from "../Util/Flat3DArray.js";
import { ChunkBounds } from "../Chunks/ChunkBounds.js";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export class WorldMatrix {
    _3dArray = new Flat3DArray();
    chunkBounds = new ChunkBounds();
    chunks = {};
    constructor() { }
    syncChunkBounds() {
        this.chunkBounds.syncBoundsWithFlat3DArray(this._3dArray);
    }
    setChunk(chunkX, chunkY, chunkZ, data) {
        this.chunks[`${chunkX}-${chunkZ}-${chunkY}`] = data;
    }
    getChunk(chunkX, chunkY, chunkZ) {
        if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`])
            return false;
        return this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
    }
    setData(x, y, z, data) {
        const chunkX = (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
        const chunkY = (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
        const chunkZ = (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
        if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`])
            return false;
        const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
        let voxelX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
                voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
            }
        }
        let voxelZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
                voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
            }
        }
        let voxelY = Math.abs(y - chunkY);
        if (y < 0) {
            if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
                voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
            }
        }
        this._3dArray.setValue(voxelX, voxelY, voxelZ, chunk, data);
    }
    getData(x, y, z, value) {
        const chunkX = (x >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
        const chunkY = (y >> this.chunkBounds.chunkYPow2) << this.chunkBounds.chunkYPow2;
        const chunkZ = (z >> this.chunkBounds.chunkXPow2) << this.chunkBounds.chunkXPow2;
        if (!this.chunks[`${chunkX}-${chunkZ}-${chunkY}`])
            return false;
        const chunk = this.chunks[`${chunkX}-${chunkZ}-${chunkY}`];
        let voxelX = Math.abs(x - chunkX);
        if (x < 0) {
            if (x == chunkX + ((1 << this.chunkBounds.chunkXPow2) - 1)) {
                voxelX = (1 << this.chunkBounds.chunkXPow2) - 1;
            }
        }
        let voxelZ = Math.abs(z - chunkZ);
        if (z < 0) {
            if (z == chunkZ + ((1 << this.chunkBounds.chunkZPow2) - 1)) {
                voxelZ = (1 << this.chunkBounds.chunkZPow2) - 1;
            }
        }
        let voxelY = Math.abs(y - chunkY);
        if (y < 0) {
            if (y == chunkY + ((1 << this.chunkBounds.chunkYPow2) - 1)) {
                voxelY = (1 << this.chunkBounds.chunkYPow2) - 1;
            }
        }
        return this._3dArray.getValue(voxelX, voxelY, voxelZ, chunk);
    }
}

export class ChunkDataHelper {
    DVEW;
    lightByte;
    _3dArray;
    chunkBounds;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.chunkBounds = DVEW.chunkBounds;
        this.lightByte = this.DVEW.UTIL.getLightByte();
        this._3dArray = this.DVEW.UTIL.getFlat3DArray();
    }
    syncChunkBounds() {
        this.chunkBounds.syncBoundsWithFlat3DArray(this._3dArray);
    }
    fillWithAir(chunk) {
        const voxels = chunk.voxels;
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                for (let y = 0; y < 128; y++) {
                    this._3dArray.setValue(x, y, z, voxels, this.DVEW.worldGeneration.paintVoxel(0));
                }
            }
        }
    }
    createHeightMap(chunk, chunkX, chunkY, chunkZ) {
        const heightMap = [];
        for (let x = 0; x < 16; x++) {
            heightMap[x] = [];
            for (let z = 0; z < 16; z++) {
                heightMap[x][z] = chunkY + 127;
            }
        }
        chunk.heightMap = heightMap;
    }
}

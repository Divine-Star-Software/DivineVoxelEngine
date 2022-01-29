export class ChunkDataHelper {
    DVEW;
    lightByte;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.lightByte = this.DVEW.UTIL.getLightByte();
    }
    fillWithAir(chunk) {
        const voxels = chunk.voxels;
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                for (let y = 0; y < 128; y++) {
                    voxels[x] ??= [];
                    voxels[x][z] ??= [];
                    voxels[x][z][y] = this.DVEW.worldGeneration.paintVoxel(0);
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

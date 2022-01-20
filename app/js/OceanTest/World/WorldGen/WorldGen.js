export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunkX, chunkZ, type = "default") {
        let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamstone:defualt");
        //   this.chunkMap.addChunk(chunkX,chunkZ);
        let liquidDreamEther = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:liquiddreamether:defualt");
        const liquidDreamEtherVoxel = [liquidDreamEther, 1, 1];
        const returnChunk = [];
        const dreamStoneVovxel = [dreamstone, 1, 1];
        let baseY = 0;
        let maxY = 31;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y > baseY && y <= maxY) {
                        returnChunk[x] ??= [];
                        returnChunk[x][z] ??= [];
                        returnChunk[x][z][y] = liquidDreamEtherVoxel;
                    }
                    if (y == baseY) {
                        returnChunk[x] ??= [];
                        returnChunk[x][z] ??= [];
                        returnChunk[x][z][y] = dreamStoneVovxel;
                    }
                }
            }
        }
        return {
            voxels: returnChunk,
            maxMinHeight: [],
            heightMap: [],
        };
    }
}

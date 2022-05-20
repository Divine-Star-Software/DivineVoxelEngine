export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    generateChunk(chunkX, chunkY, chunkZ) {
        let baseY = 60;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                    if (y == baseY + 5 && x == 1 && z == 1) {
                        this.DVEW.worldData.paintVoxel("dve:debugbox", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                }
            }
        }
    }
}

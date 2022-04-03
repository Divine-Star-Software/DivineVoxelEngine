export class WorldGen {
    DVEW;
    lightSourceColor;
    seedLightSourceColor;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.infoByte = this.DVEW.UTIL.getInfoByte();
        this.lightByte = this.DVEW.UTIL.getLightByte();
    }
    infoByte;
    lightByte;
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunkX, chunkY, chunkZ) {
        let maxY = 10;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= maxY) {
                        this.DVEW.worldData.paintVoxel("dve:dreamstone", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                    if (x == 7 && z == 7 && y == maxY) {
                        this.DVEW.worldData.paintVoxel("dve:debugbox", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                }
            }
        }
    }
}

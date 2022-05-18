export class WorldGen {
    DVEW;
    lightSourceColor;
    seedLightSourceColor;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this._3dArray = this.DVEW.UTIL.getFlat3DArray();
    }
    _3dArray;
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunkX, chunkY, chunkZ) {
        let baseY = 0;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        this.DVEW.worldData.paintVoxel("dve:lightdebug", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                }
            }
        }
    }
}

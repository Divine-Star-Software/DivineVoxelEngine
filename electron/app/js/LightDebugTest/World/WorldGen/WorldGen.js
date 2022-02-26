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
    generateChunk(chunk, chunkX, chunkY, chunkZ, type = "default") {
        let lightDebugBox = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:lightdebug", "default");
        const chunkVoxels = chunk.voxels;
        let baseY = 0;
        let maxY = 61;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        chunkVoxels[x] ??= [];
                        chunkVoxels[x][z] ??= [];
                        chunkVoxels[x][z][y] = this.DVEW.worldGeneration.paintVoxel(lightDebugBox);
                    }
                }
            }
        }
        return chunk;
    }
}

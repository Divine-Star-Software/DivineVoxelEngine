export class WorldGen {
    DVEW;
    lightSourceColor;
    seedLightSourceColor;
    _3dArray;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this._3dArray = this.DVEW.UTIL.getFlat3DArray();
    }
    visited = {};
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunk, chunkX, chunkY, chunkZ, type = "default") {
        let dreamstonepillar = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstonepillar", "default");
        const chunkVoxels = chunk.voxels;
        let baseY = 0;
        let maxY = 61;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        this._3dArray.setValue(x, y, z, chunkVoxels, this.DVEW.worldGeneration.paintVoxel(dreamstonepillar));
                    }
                }
            }
        }
        return chunk;
    }
}

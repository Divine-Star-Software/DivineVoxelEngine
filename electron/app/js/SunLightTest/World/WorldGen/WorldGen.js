export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.infoByte = this.DVEW.UTIL.getInfoByte();
        this.lightByte = this.DVEW.UTIL.getLightByte();
        this._3dArray = this.DVEW.UTIL.getFlat3DArray();
    }
    visited = {};
    infoByte;
    lightByte;
    _3dArray;
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunk, chunkX, chunkY, chunkZ, type = "default") {
        const dreamstonepillar = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstonepillar", "default");
        const voxels = chunk.voxels;
        let baseY = 0;
        let maxY = 126;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= maxY / 2 - 5) {
                        this._3dArray.setValue(x, y, z, voxels, this.DVEW.worldGeneration.paintVoxel(dreamstonepillar));
                    }
                    if (y == maxY / 2) {
                        this._3dArray.setValue(x, y, z, voxels, this.DVEW.worldGeneration.paintVoxel(dreamstonepillar));
                    }
                }
            }
        }
        if (Math.random() > 0.5) {
            this._3dArray.setValue(7, maxY / 2, 7, voxels, 0);
        }
        return chunk;
    }
}

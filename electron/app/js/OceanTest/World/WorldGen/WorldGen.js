export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this._3dArray = this.DVEW.UTIL.getFlat3DArray();
    }
    _3dArray;
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunkX, chunkZ, type = "default") {
        let dreamstone = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstone", "default");
        let liquidDreamEther = this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:liquiddreamether", "default");
        const liquidDreamEtherVoxel = this.DVEW.worldGeneration.paintVoxel(liquidDreamEther);
        const dreamStoneVovxel = this.DVEW.worldGeneration.paintVoxel(dreamstone);
        const chunk = this.DVEW.worldGeneration.getBlankChunk(false);
        const voxels = chunk.voxels;
        let baseY = 0;
        let maxY = 31;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y > baseY && y <= maxY) {
                        this._3dArray.setValue(x, y, z, voxels, liquidDreamEtherVoxel);
                    }
                    if (y == baseY) {
                        this._3dArray.setValue(x, y, z, voxels, dreamStoneVovxel);
                    }
                }
            }
        }
        return chunk;
    }
}

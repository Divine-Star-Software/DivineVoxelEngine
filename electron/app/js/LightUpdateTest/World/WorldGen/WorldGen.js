import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    _3dArray: DVEW.UTIL.getFlat3DArray(),
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 256,
    generateChunk(chunk, chunkX, chunkY, chunkZ, type = "default") {
        let dreamstonepillar = DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstonepillar", "default");
        const chunkVoxels = chunk.voxels;
        let baseY = 0;
        let maxY = 61;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        this._3dArray.setValue(x, y, z, chunkVoxels, DVEW.worldGeneration.paintVoxel(dreamstonepillar));
                    }
                }
            }
        }
        return chunk;
    },
};

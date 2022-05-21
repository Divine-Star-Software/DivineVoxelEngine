import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    _3dArray: DVEW.UTIL.getFlat3DArray(),
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 256,
    generateChunk(chunkX, chunkZ, type = "default") {
        let debugBox = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:debugbox", "default"));
        let dreamstone = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstone", "default"));
        let dreamStonePillar = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstonepillar", "default"));
        let dreamGrasss = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamgrass", "default"));
        let liquidDreamEther = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:liquiddreamether", "default"));
        const chunk = DVEW.worldGeneration.getBlankChunk(false);
        const voxels = chunk.voxels;
        if (type == "fluid") {
            let baseY = 0;
            let maxY = 31;
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y > baseY && y <= maxY) {
                            this._3dArray.setValue(x, y, z, voxels, liquidDreamEther);
                        }
                        if (y == baseY) {
                            this._3dArray.setValue(x, y, z, voxels, dreamstone);
                        }
                    }
                }
            }
        }
        if (type == "pond") {
            let baseY = 31;
            let topY = 50;
            let hole = false;
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y < baseY) {
                            this._3dArray.setValue(x, y, z, voxels, dreamstone);
                            continue;
                        }
                        if (y == baseY && x > 0 && x < 15 && z > 0 && z < 15) {
                            this._3dArray.setValue(x, y, z, voxels, liquidDreamEther);
                        }
                        if (y == baseY && x == 0) {
                            this._3dArray.setValue(x, y, z, voxels, dreamstone);
                        }
                        if (y == baseY && x == 15) {
                            this._3dArray.setValue(x, y, z, voxels, dreamstone);
                        }
                        if (y == baseY && z == 0) {
                            this._3dArray.setValue(x, y, z, voxels, dreamstone);
                        }
                        if (y == baseY && z == 15) {
                            this._3dArray.setValue(x, y, z, voxels, dreamstone);
                        }
                    }
                }
            }
        }
        if (type == "pillar") {
            let baseY = 31;
            let topY = 50;
            let hole = false;
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y < baseY) {
                            this._3dArray.setValue(x, y, z, voxels, dreamstone);
                        }
                        if (y == topY) {
                            this._3dArray.setValue(x, y, z, voxels, dreamStonePillar);
                        }
                        if (y >= baseY && y < topY) {
                            if (x % 15 == 0 || z % 15 == 0) {
                                if (x > 0) {
                                    if (x % 2 == 0)
                                        continue;
                                }
                                if (z > 0) {
                                    if (z % 2 == 0)
                                        continue;
                                }
                                this._3dArray.setValue(x, y, z, voxels, dreamStonePillar);
                            }
                        }
                    }
                }
            }
        }
        if (type == "default") {
            let topY = 31;
            let groundY = 31;
            let hole = false;
            if (Math.abs(chunkX) == 16 && Math.abs(chunkZ) == 16) {
                topY = 42;
                hole = true;
            }
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (hole) {
                            if (y > 30 && y <= topY - 4) {
                                if (x > 4 && x < 10) {
                                    continue;
                                }
                                if (z > 4 && z < 10) {
                                    continue;
                                }
                            }
                        }
                        if (y < groundY) {
                            this._3dArray.setValue(x, y, z, voxels, dreamStonePillar);
                            continue;
                        }
                        if (hole) {
                            if (y < topY) {
                                this._3dArray.setValue(x, y, z, voxels, dreamstone);
                            }
                        }
                    }
                }
            }
        }
        return chunk;
    },
};

import { DVEW } from "../../../../out/index.js";
export const WorldGen = {
    _3dArray: DVEW.UTIL.getFlat3DArray(),
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 256,
    generateCrazyChunk(bottomChunk, topChunk, minY, x, y, z) {
        bottomChunk.maxMinHeight[0] = 0;
        bottomChunk.maxMinHeight[1] = minY;
        const chunkVoxels = bottomChunk.voxels;
        let dreamstone = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstone", "default"));
        let dreamGrasss = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamgrass", "default"));
        if (y < Math.floor(Math.random() * minY)) {
            this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
            if (y < bottomChunk.maxMinHeight[0]) {
                bottomChunk.maxMinHeight[0] = y;
            }
            if (Math.random() > 0.8) {
                this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
            }
        }
    },
    generateSpikeChunk(bottomChunk, topChunk, minY, maxY, x, y, z) {
        let dreamStonePillar = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstonepillar", "default"));
        bottomChunk.maxMinHeight[0] = minY;
        bottomChunk.maxMinHeight[1] = maxY;
        let chunkVoxels;
        let cy = y;
        if (y > 128) {
            cy = y - 129;
            minY = 0;
            chunkVoxels = topChunk.voxels;
            topChunk.isEmpty = false;
        }
        else {
            chunkVoxels = bottomChunk.voxels;
        }
        if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (cy == minY ||
                cy == minY + 28 ||
                cy == minY + 54 ||
                cy == minY + 56 ||
                cy == minY + 86) {
                this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (cy == minY + 1 ||
                cy == minY + 26 ||
                cy == minY + 30 ||
                cy == minY + 52 ||
                cy == minY + 58 ||
                cy == minY + 84 ||
                cy == minY + 88) {
                this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (x == 1 || z == 1 || x == 14 || z == 14) {
            if (cy == minY + 2 ||
                cy == minY + 24 ||
                cy == minY + 32 ||
                cy == minY + 52 ||
                cy == minY + 60 ||
                cy == minY + 82 ||
                cy == minY + 86 ||
                cy == minY + 90) {
                this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (x == 2 || z == 2 || x == 13 || z == 13) {
            if (cy == minY + 4 ||
                cy == minY + 22 ||
                cy == minY + 34 ||
                cy == minY + 50 ||
                cy == minY + 62 ||
                cy == minY + 80 ||
                cy == minY + 88 ||
                cy == minY + 92) {
                this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (x == 3 || z == 3 || x == 12 || z == 12) {
            if (cy == minY + 6 ||
                cy == minY + 20 ||
                cy == minY + 36 ||
                cy == minY + 48 ||
                cy == minY + 64 ||
                cy == minY + 78 ||
                cy == minY + 90 ||
                cy == minY + 94) {
                this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (x == 4 || z == 4 || x == 11 || z == 11) {
            if (cy == minY + 8 ||
                cy == minY + 18 ||
                cy == minY + 38 ||
                cy == minY + 46 ||
                cy == minY + 66 ||
                cy == minY + 74 ||
                cy == minY + 96) {
                this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (x == 5 || z == 5 || x == 10 || z == 10) {
            if (cy == minY + 10 ||
                cy == minY + 16 ||
                cy == minY + 40 ||
                cy == minY + 44 ||
                cy == minY + 68 ||
                cy == minY + 72 ||
                cy == minY + 98) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (x == 6 || z == 6 || x == 9 || z == 9) {
            if (cy == minY + 12 ||
                cy == minY + 14 ||
                cy == minY + 42 ||
                cy == minY + 70 ||
                minY + 100) {
                this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
            }
        }
        if (y < minY) {
            this._3dArray.setValue(x, cy, z, chunkVoxels, dreamStonePillar);
        }
    },
    generatePondChunk(bottomChunk, topChunk, minY, x, y, z) {
        const chunkVoxels = bottomChunk.voxels;
        bottomChunk.maxMinHeight[0] = minY - 7;
        bottomChunk.maxMinHeight[1] = minY;
        const dreamstone = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstone", "default"));
        const liquidDreamEther = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:liquiddreamether", "default"));
        if (y < minY - 6) {
            this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
        }
        if (y >= minY - 6 && y <= minY) {
            this._3dArray.setValue(x, y, z, chunkVoxels, liquidDreamEther);
        }
    },
    generateHoleChunk(bottomChunk, topChunk, minY, x, y, z) {
        const chunkVoxels = bottomChunk.voxels;
        bottomChunk.maxMinHeight[0] = minY - 8;
        bottomChunk.maxMinHeight[1] = minY;
        let dreamstone = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstone", "default"));
        let dreamGrasss = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamgrass", "default"));
        if (x == 0 || z == 0 || x == 15 || z == 15) {
            if (y == minY) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
                if (Math.random() > 0.8) {
                    this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
                }
            }
        }
        if (x == 1 || z == 1 || x == 14 || z == 14) {
            if (y == minY - 1) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
                if (Math.random() > 0.8) {
                    this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
                }
            }
        }
        if (x == 2 || z == 2 || x == 13 || z == 13) {
            if (y == minY - 2) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
                if (Math.random() > 0.8) {
                    this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
                }
            }
        }
        if (x == 3 || z == 3 || x == 12 || z == 12) {
            if (y == minY - 3) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
                if (Math.random() > 0.8) {
                    this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
                }
            }
        }
        if (x == 4 || z == 4 || x == 11 || z == 11) {
            if (y == minY - 4) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
                if (Math.random() > 0.8) {
                    this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
                }
            }
        }
        if (x == 5 || z == 5 || x == 10 || z == 10) {
            if (y == minY - 5) {
                this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamstone);
                if (Math.random() > 0.8) {
                    this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
                }
            }
        }
        if (x == 6 || z == 6 || x == 9 || z == 9) {
            if (y == minY - 6) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
                if (Math.random() > 0.8) {
                    this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
                }
            }
        }
        if (y < minY - 7) {
            this._3dArray.setValue(x, y, z, chunkVoxels, dreamstone);
            if (Math.random() > 0.8) {
                this._3dArray.setValue(x, y + 1, z, chunkVoxels, dreamGrasss);
            }
        }
    },
    generateNormalChunk(bottomChunk, topChunk, minY, x, y, z) {
        const chunkVoxels = bottomChunk.voxels;
        bottomChunk.maxMinHeight[0] = minY;
        bottomChunk.maxMinHeight[1] = minY + 1;
        let dreamGrassBlock = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamgrassblock", "default"));
        let dreamGrasss = DVEW.worldGeneration.paintVoxel(DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamgrass", "default"));
        if (y < minY) {
            this._3dArray.setValue(x, y, z, chunkVoxels, dreamGrassBlock);
        }
        if (y == minY) {
            if (Math.random() > 0.8) {
                this._3dArray.setValue(x, y, z, chunkVoxels, dreamGrasss);
            }
        }
    },
    generateChunkNormal(chunkX, chunkZ) {
        let toss = Math.random();
        const topChunk = DVEW.worldGeneration.getBlankChunk(false);
        const bottomChunk = DVEW.worldGeneration.getBlankChunk(false);
        let minY = 60;
        let maxY = 256;
        let spiked = false;
        let crazy = false;
        let hole = false;
        let pond = false;
        let normal = true;
        if (toss < 0.2) {
            crazy = true;
        }
        if (toss > 0.2 && toss < 0.3) {
            spiked = true;
        }
        if (toss > 0.3 && toss < 0.6) {
            hole = true;
        }
        if (toss > 0.6) {
            pond = true;
        }
        if (crazy || spiked || hole || pond) {
            normal = false;
        }
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (pond) {
                        this.generatePondChunk(bottomChunk, topChunk, minY, x, y, z);
                    }
                    if (crazy) {
                        this.generateCrazyChunk(bottomChunk, topChunk, minY, x, y, z);
                    }
                    if (spiked) {
                        this.generateSpikeChunk(bottomChunk, topChunk, minY, maxY, x, y, z);
                    }
                    if (hole) {
                        this.generateHoleChunk(bottomChunk, topChunk, minY, x, y, z);
                    }
                    if (normal) {
                        this.generateNormalChunk(bottomChunk, topChunk, minY, x, y, z);
                    }
                }
            }
        }
        return [bottomChunk, topChunk];
    },
};

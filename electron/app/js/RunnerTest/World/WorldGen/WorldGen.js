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
    generateChunk(chunkX, chunkY, chunkZ, type) {
        let dreamstonepillar = this.DVEW.worldGeneration.paintVoxel(this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstonepillar", "default"));
        let baseY = 10;
        let maxY = 61;
        let fill = false;
        let heightChange = false;
        let height = 0;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                if (Math.random() < 0.1) {
                    fill = true;
                }
                else {
                    fill = false;
                }
                if (Math.random() < 0.2) {
                    heightChange = true;
                }
                else {
                    heightChange = false;
                }
                if (heightChange) {
                    height = Math.random() * 3;
                }
                else {
                    height = 0;
                }
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (type == "track") {
                        if (!fill) {
                            if (y <= baseY + height && x >= 6 && x <= 9) {
                                this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                            }
                            if (y <= baseY - 5) {
                                this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                            }
                            if (y >= baseY - 5 && y <= baseY - 1 && x != 7 && x != 8) {
                                this.DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", x + chunkX, y + chunkY, z + chunkZ);
                            }
                            if (y == baseY && x == 7 && z == 7) {
                                this.DVEW.worldData.paintVoxel("dve:debugbox", "default", x + chunkX, y + chunkY, z + chunkZ);
                            }
                        }
                        else {
                            if (y <= baseY - 5) {
                                this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                            }
                            if (y >= baseY - 5 && y <= baseY - 1) {
                                this.DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", x + chunkX, y + chunkY, z + chunkZ);
                            }
                        }
                    }
                    if (type == "trench") {
                        if (y <= baseY - 5) {
                            this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                        }
                        if (y >= baseY - 5 && y <= baseY - 1) {
                            this.DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", x + chunkX, y + chunkY, z + chunkZ);
                        }
                    }
                    if (type == "wall") {
                        if (y <= maxY) {
                            this.DVEW.worldData.paintVoxel("dve:dreamstone", "default", x + chunkX, y + chunkY, z + chunkZ);
                        }
                    }
                }
            }
        }
    }
}

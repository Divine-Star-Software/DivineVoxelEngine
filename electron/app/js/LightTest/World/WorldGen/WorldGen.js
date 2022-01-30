export class WorldGen {
    DVEW;
    lightSourceColor;
    seedLightSourceColor;
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.infoByte = this.DVEW.UTIL.getInfoByte();
        this.lightByte = this.DVEW.UTIL.getLightByte();
        this.lightSourceColor = this.colorFunctions["white"](15, this.infoByte);
        this.seedLightSourceColor = this.colorFunctions["white"](14, this.infoByte);
    }
    visited = {};
    colorFunctions = {
        green: (lightLevel, infoByte) => {
            infoByte.setNumberValue(0);
            infoByte.setHalfByteBits(0, 0);
            infoByte.setHalfByteBits(4, 0);
            infoByte.setHalfByteBits(8, lightLevel);
            infoByte.setHalfByteBits(12, 0);
            return infoByte.getNumberValue();
        },
        red: (lightLevel, infoByte) => {
            infoByte.setNumberValue(0);
            infoByte.setHalfByteBits(0, 0);
            infoByte.setHalfByteBits(4, lightLevel);
            infoByte.setHalfByteBits(8, 0);
            infoByte.setHalfByteBits(12, 0);
            return infoByte.getNumberValue();
        },
        blue: (lightLevel, infoByte) => {
            infoByte.setNumberValue(0);
            infoByte.setHalfByteBits(0, 0);
            infoByte.setHalfByteBits(4, 5);
            infoByte.setHalfByteBits(8, 0);
            infoByte.setHalfByteBits(12, lightLevel);
            return infoByte.getNumberValue();
        },
        white: (lightLevel, infoByte) => {
            infoByte.setNumberValue(0);
            infoByte.setHalfByteBits(0, 0);
            infoByte.setHalfByteBits(4, lightLevel);
            infoByte.setHalfByteBits(8, lightLevel);
            infoByte.setHalfByteBits(12, lightLevel);
            return infoByte.getNumberValue();
        },
    };
    infoByte;
    lightByte;
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunkX, chunkY, chunkZ, type = "default") {
        let dreamstonepillar = this.DVEW.worldGeneration.paintVoxel(this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette("dve:dreamstonepillar", "default"));
        let baseY = 60;
        let maxY = 61;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        this.DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                    if (y == baseY + 5 && x == 1 && z == 1) {
                        this.DVEW.worldData.paintVoxel("dve:debugbox", "default", x + chunkX, y + chunkY, z + chunkZ);
                    }
                }
            }
        }
    }
}

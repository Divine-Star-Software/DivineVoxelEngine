import { LightTest } from "./LightTest.js";
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
    lightTest = LightTest;
    infoByte;
    lightByte;
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunk, chunkX, chunkY, chunkZ, type = "default") {
        let dreamstonepillar = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:dreamstonepillar:defualt");
        //   this.chunkMap.addChunk(chunkX,chunkZ);
        let liquidDreamEther = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:liquiddreamether:defualt");
        /**light data
         * light is stored in 4 bits. Levels are stored as 0 - 15;
         *
         */
        const liquidDreamEtherVoxel = [liquidDreamEther, 1, 0xffffffff];
        const voxels = chunk.voxels;
        // const dreamStoneVovxel1 = [dreamstone, 1, 0xFFFFFFFF];
        // const dreamStoneVovxel2 = [dreamstone, 1, 0xFF001baF];
        this.infoByte.setNumberValue(0);
        this.infoByte.setHalfByteBits(0, 0);
        this.infoByte.setHalfByteBits(4, 0);
        this.infoByte.setHalfByteBits(8, 0);
        this.infoByte.setHalfByteBits(12, 0);
        const dreamStoneVovxel = [
            dreamstonepillar,
            0,
            this.infoByte.getNumberValue(),
        ];
        let baseY = 0;
        let maxY = 126;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= maxY / 2 - 5) {
                        voxels[x] ??= [];
                        voxels[x][z] ??= [];
                        voxels[x][z][y] = [...dreamStoneVovxel];
                    }
                    if (y == maxY / 2) {
                        voxels[x] ??= [];
                        voxels[x][z] ??= [];
                        voxels[x][z][y] = [...dreamStoneVovxel];
                    }
                }
            }
        }
        if (Math.random() > 0.5) {
            if (voxels[7] && voxels[7][7] && voxels[7][7][maxY / 2]) {
                voxels[7][7][maxY / 2] = [-1, 0];
            }
        }
        return chunk;
    }
}

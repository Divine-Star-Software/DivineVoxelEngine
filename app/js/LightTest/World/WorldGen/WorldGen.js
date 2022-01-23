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
    generateChunk(chunkX, chunkY, chunkZ, type = "default") {
        let dreamstonepillar = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:dreamstonepillar:defualt");
        //   this.chunkMap.addChunk(chunkX,chunkZ);
        let liquidDreamEther = this.DVEW.worldGeneration.getVoxelIdFromGlobalPallet("dve:liquiddreamether:defualt");
        /**light data
         * light is stored in 4 bits. Levels are stored as 0 - 15;
         *
         */
        const liquidDreamEtherVoxel = [liquidDreamEther, 1, 0xffffffff];
        const returnChunk = [];
        // const dreamStoneVovxel1 = [dreamstone, 1, 0xFFFFFFFF];
        // const dreamStoneVovxel2 = [dreamstone, 1, 0xFF001baF];
        this.infoByte.setNumberValue(0);
        this.infoByte.setHalfByteBits(0, 0);
        this.infoByte.setHalfByteBits(4, 0);
        this.infoByte.setHalfByteBits(8, 0);
        this.infoByte.setHalfByteBits(12, 0);
        const dreamStoneVovxel = [
            2,
            1,
            this.infoByte.getNumberValue(),
        ];
        let baseY = 0;
        let maxY = 61;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (y <= baseY + 5) {
                        returnChunk[x] ??= [];
                        returnChunk[x][z] ??= [];
                        returnChunk[x][z][y] = [...dreamStoneVovxel];
                    }
                    if (y >= baseY && y <= maxY + 8 && Math.random() < 0.05) {
                        returnChunk[x] ??= [];
                        returnChunk[x][z] ??= [];
                        returnChunk[x][z][y] = [...dreamStoneVovxel];
                    }
                }
            }
        }
        return {
            voxels: returnChunk,
            isEmpty: false,
            maxMinHeight: [],
            heightMap: [],
        };
    }
}

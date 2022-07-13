import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    chunkHeight: 32,
    _type0(tx, ty, tz) {
        if (ty == 16) {
            DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, tx, ty, tz);
        }
    },
    _type1(tx, ty, tz) {
        if (tz == 1) {
            DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, tx, ty, tz);
        }
    },
    _type2(tx, ty, tz) {
        if (tx == 30) {
            DVEW.worldData.paintVoxel("dve:liquiddreamether", "default", 0, tx, ty, tz);
        }
    },
    generateChunk(chunkX, chunkY, chunkZ, type) {
        let baseY = 0;
        for (let x = 0; x < +this.chunkWidth; x++) {
            for (let z = 0; z < this.chunkDepth; z++) {
                for (let y = 0; y < this.chunkHeight; y++) {
                    if (type == 0) {
                        this._type0(chunkX + x, chunkY + y, chunkZ + z);
                    }
                    if (type == 1) {
                        this._type1(chunkX + x, chunkY + y, chunkZ + z);
                    }
                    if (type == 2) {
                        this._type2(chunkX + x, chunkY + y, chunkZ + z);
                    }
                }
            }
        }
    },
};

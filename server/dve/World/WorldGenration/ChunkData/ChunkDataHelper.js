import { Util } from "../../../Global/Util.helper.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
export const ChunkDataHelper = {
    lightByte: Util.getLightByte(),
    _3dArray: Util.getFlat3DArray(),
    fillWithAir(chunk) {
        const voxels = chunk.voxels;
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                for (let y = 0; y < 128; y++) {
                    this._3dArray.setValue(x, y, z, voxels, DVEW.worldGeneration.paintVoxel(0));
                }
            }
        }
    },
    createHeightMap(chunk, chunkX, chunkY, chunkZ) {
        const heightMap = [];
        for (let x = 0; x < 16; x++) {
            heightMap[x] = [];
            for (let z = 0; z < 16; z++) {
                heightMap[x][z] = chunkY + 127;
            }
        }
        chunk.heightMap = heightMap;
    },
};

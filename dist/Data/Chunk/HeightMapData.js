import { PositionByte } from "../Util/PositionByte.js";
import { ChunkReader } from "./ChunkReader.js";
/**# Height Byte
 * ---
 * Interpets height map data.
 */
export const HeightMapData = {
    _getHeightMapData: {
        solid: (byteData) => {
            return (byteData & 0x7f) >>> 0;
        },
        fluid: (byteData) => {
            return (byteData & 0x7f00) >>> 8;
        },
        flora: (byteData) => {
            return (byteData & 0x7f0000) >>> 16;
        },
        magma: (byteData) => {
            return (byteData & 0x7f000000) >>> 24;
        },
    },
    _setHeightMapData: {
        solid: (height, byteData) => {
            byteData = byteData & ~(0x7f << 0);
            return byteData | (height << 0);
        },
        fluid: (height, byteData) => {
            byteData = byteData & ~0x7f00;
            return byteData | (height << 8);
        },
        flora: (height, byteData) => {
            byteData = byteData & ~0x7f0000;
            return byteData | (height << 16);
        },
        magma: (height, byteData) => {
            byteData = byteData & ~0x7f000000;
            return byteData | (height << 24);
        },
    },
    _markSubstanceAsNotExposed: {
        solid: (data) => {
            return data | (1 << 7);
        },
        fluid: (data) => {
            return data | (1 << 15);
        },
        flora: (data) => {
            return data | (1 << 23);
        },
        magma: (data) => {
            return data | (1 << 31);
        },
    },
    _markSubstanceAsExposed: {
        solid: (data) => {
            return data & ~(1 << 7);
        },
        fluid: (data) => {
            return data & ~(1 << 15);
        },
        flora: (data) => {
            return data & ~(1 << 23);
        },
        magma: (data) => {
            return data & ~(1 << 31);
        },
    },
    _isSubstanceExposed: {
        solid: (data) => {
            return (data & 0x80) >>> 7 != 1;
        },
        fluid: (data) => {
            return (data & 0x8000) >>> 15 != 1;
        },
        flora: (data) => {
            return (data & 0x800000) >>> 23 != 1;
        },
        magma: (data) => {
            return (data & 0x80000000) >>> 31 != 1;
        },
    },
    getStartingHeightMapValue() {
        //this number will mark all substances as not exposed and/or non existent in the chunk.
        return 0x80808080;
    },
    initalizeChunk(chunkData) {
        let value = this.getStartingHeightMapValue();
        let start = ChunkReader.indexes.heightMap;
        let end = start + ChunkReader.indexSizes.heightMap;
        for (let i = start; i < end; i += 4) {
            chunkData.setUint32(i, value);
        }
    },
    updateChunkMinMax(voxelPOS, chunkData) {
        const currentMin = PositionByte.getY(ChunkReader.getChunkMinData(chunkData));
        const currentMax = PositionByte.getY(ChunkReader.getChunkMaxData(chunkData));
        if (voxelPOS.y < currentMin) {
            ChunkReader.setChunkMinData(chunkData, PositionByte.setPositionUseObj(voxelPOS));
        }
        if (voxelPOS.y > currentMax) {
            ChunkReader.setChunkMaxData(chunkData, PositionByte.setPositionUseObj(voxelPOS));
        }
    },
    getChunkMin(chunkData) {
        return PositionByte.getY(ChunkReader.getChunkMinData(chunkData));
    },
    getChunkMax(chunkData) {
        return PositionByte.getY(ChunkReader.getChunkMaxData(chunkData));
    },
    calculateHeightRemoveDataForSubstance(height, substance, x, z, heightMap) {
        let minY = this.getMinYForSubstance(substance, x, z, heightMap);
        let maxY = this.getMaxYForSubstance(substance, x, z, heightMap);
        //nothing to do here since it won't affect anything.
        if (height > minY && height < maxY)
            return false;
        if (minY == maxY && minY == height) {
            this.setMinYForSubstance(0, substance, x, z, heightMap);
            this.setMaxYForSubstance(0, substance, x, z, heightMap);
            this.markSubstanceAsNotExposed(substance, x, z, heightMap);
        }
        if (height == minY || height == maxY) {
            return true;
        }
    },
    calculateHeightAddDataForSubstance(height, substance, x, z, chunk) {
        let minY = this.getMinYForSubstance(substance, x, z, chunk);
        let maxY = this.getMaxYForSubstance(substance, x, z, chunk);
        if (!this.isSubstanceExposed(substance, x, z, chunk)) {
            this.markSubstanceAsExposed(substance, x, z, chunk);
            this.setMinYForSubstance(height, substance, x, z, chunk);
            this.setMaxYForSubstance(height, substance, x, z, chunk);
            return;
        }
        //nothing to do here since it won't affect anything.
        // if (height > minY && height < maxY) return;
        if (height < minY) {
            this.setMinYForSubstance(height, substance, x, z, chunk);
        }
        if (height > maxY) {
            this.setMaxYForSubstance(height, substance, x, z, chunk);
        }
    },
    getLowestExposedVoxel(x, z, chunk) {
        const byteData = ChunkReader.getHeightMapData(chunk, x, 0, z);
        let min = this._getHeightMapData["solid"](byteData);
        let min2 = this._getHeightMapData["fluid"](byteData);
        if (min2 < min) {
            min = min2;
        }
        let min3 = this._getHeightMapData["flora"](byteData);
        if (min3 < min) {
            min = min3;
        }
        let min4 = this._getHeightMapData["magma"](byteData);
        if (min3 < min) {
            min = min4;
        }
        return min;
    },
    getHighestExposedVoxel(x, z, chunk) {
        const byteData = ChunkReader.getHeightMapData(chunk, x, 1, z);
        let max = this._getHeightMapData["solid"](byteData);
        let max2 = this._getHeightMapData["fluid"](byteData);
        if (max2 > max) {
            max = max2;
        }
        let max3 = this._getHeightMapData["flora"](byteData);
        if (max3 > max) {
            max = max3;
        }
        let max4 = this._getHeightMapData["magma"](byteData);
        if (max3 > max) {
            max = max4;
        }
        return max;
    },
    isSubstanceExposed(substance, x, z, chunk) {
        let byteData = ChunkReader.getHeightMapData(chunk, x, 0, z);
        return this._isSubstanceExposed[substance](byteData);
    },
    markSubstanceAsExposed(substance, x, z, chunk) {
        let byteData = ChunkReader.getHeightMapData(chunk, x, 0, z);
        byteData = this._markSubstanceAsExposed[substance](byteData);
        ChunkReader.setHeightMapData(chunk, x, 0, z, byteData);
    },
    markSubstanceAsNotExposed(substance, x, z, chunk) {
        let byteData = ChunkReader.getHeightMapData(chunk, x, 0, z);
        byteData = this._markSubstanceAsNotExposed[substance](byteData);
        ChunkReader.setHeightMapData(chunk, x, 0, z, byteData);
    },
    setMinYForSubstance(height, substance, x, z, chunk) {
        let byteData = ChunkReader.getHeightMapData(chunk, x, 0, z);
        byteData = this._setHeightMapData[substance](height, byteData);
        ChunkReader.setHeightMapData(chunk, x, 0, z, byteData);
    },
    getMinYForSubstance(substance, x, z, chunk) {
        let byteData = ChunkReader.getHeightMapData(chunk, x, 0, z);
        return this._getHeightMapData[substance](byteData);
    },
    setMaxYForSubstance(height, substance, x, z, chunk) {
        let byteData = ChunkReader.getHeightMapData(chunk, x, 1, z);
        byteData = this._setHeightMapData[substance](height, byteData);
        ChunkReader.setHeightMapData(chunk, x, 1, z, byteData);
    },
    getMaxYForSubstance(substance, x, z, chunk) {
        let byteData = ChunkReader.getHeightMapData(chunk, x, 1, z);
        return this._getHeightMapData[substance](byteData);
    },
};

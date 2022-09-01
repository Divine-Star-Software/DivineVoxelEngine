import { Flat3DArray } from "./Flat3DArray.js";
import { HeightMapArray } from "./HeightMapArray.js";
import { WorldBounds } from "./WorldBounds.js";
export const ChunkReader = {
    //size in bytes
    indexSizes: {
        header: 2,
        states: 10,
        heightMap: 0,
        voxelData: 0,
        voxelStateData: 0,
    },
    //index in bytes
    indexes: {
        header: 0,
        states: 0,
        heightMap: 0,
        voxelData: 0,
        voxelStateData: 0,
    },
    byteLengths: {
        heightMapData: 4,
        voxelData: 4,
        voxelStaeteData: 4,
    },
    syncSettings() {
        //set index sizes
        this.indexSizes.heightMap = WorldBounds.chunkArea * 4;
        this.indexSizes.voxelData = WorldBounds.chunkTotalVoxels * 4;
        this.indexSizes.voxelStateData = WorldBounds.chunkTotalVoxels * 4;
        //set indexs
        this.indexes.states = this.indexSizes.header;
        this.indexes.heightMap = this.indexes.states + 1;
        this.indexes.voxelData =
            this.indexes.heightMap + this.indexSizes.heightMap + 1;
        this.indexes.voxelStateData =
            this.indexes.voxelData + this.indexSizes.voxelData + 1;
    },
    _getVoxelDataIndex(x, y, z) {
        return (Flat3DArray.getIndex(x, y, z) * this.byteLengths.voxelData +
            this.indexes.voxelData);
    },
    _getVoxelStateDataIndex(x, y, z) {
        return (Flat3DArray.getIndex(x, y, z) * this.byteLengths.voxelData +
            this.indexes.voxelData);
    },
    getVoxelChunkDataIndex(x, y, z, secondary = false) {
        let index = 0;
        if (!secondary) {
            index = this._getVoxelDataIndex(x, y, z);
        }
        else {
            index = this._getVoxelStateDataIndex(x, y, z);
        }
        return index;
    },
    getHeightMapIndex(x, y, z) {
        return (HeightMapArray.getIndex(x, y, z) * this.byteLengths.heightMapData +
            this.indexes.heightMap);
    },
    getDataVoxelData(chunkData, x, y, z, secondary = false) {
        return chunkData.getUint32(this.getVoxelChunkDataIndex(x, y, z, secondary));
    },
    setVoxelData(chunkData, x, y, z, data, secondary = false) {
        chunkData.setUint32(this.getVoxelChunkDataIndex(x, y, z, secondary), data);
    },
    getHeightMapData(chunkData, x, y, z) {
        return chunkData.getUint32(this.getHeightMapIndex(x, y, z));
    },
    setHeightMapData(chunkData, x, y, z, data) {
        return chunkData.setUint32(this.getHeightMapIndex(x, y, z), data);
    },
};

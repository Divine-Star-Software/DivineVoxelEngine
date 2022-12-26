//types
import { WorldBounds } from "../../Data/World/WorldBounds.js";
//objects
import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import { RegionDataTool } from "../../Tools/Data/RegionDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/ChunkDataTool.js";
export const DataManager = {
    dataHanlder: null,
    regions: {},
    columns: {},
    chunks: {},
    setDataHandler(handler) {
        this.dataHanlder = handler;
    },
    $INIT() {
        this.regions = new RegionDataTool();
        this.columns = new ColumnDataTool();
        this.chunks = new ChunkDataTool();
    },
    saveChunk(x, y, z) { },
    loadChunk(x, y, z) { },
    _pos: { x: 0, y: 0, z: 0, newIndex: 0 },
    _sab: { sab: new SharedArrayBuffer(0), newIndex: 0 },
    async loadRegion(x, y, z) {
        if (!this.dataHanlder) {
            throw new Error("A data hanlder must be set.");
        }
        const rawRegion = await this.dataHanlder.getRegion(x, y, z);
        const voxelArrayLengths = rawRegion[1];
        const heightMapArrayLength = rawRegion[2];
        const minMaxLength = rawRegion[3];
        let currentIndex = this._getPos(rawRegion, 3).newIndex;
        currentIndex++;
        while (currentIndex < rawRegion.length) {
            const chunkPOS = this._getPos(rawRegion, currentIndex);
            currentIndex = chunkPOS.newIndex;
            let SABData = this._getSAB(rawRegion, currentIndex, voxelArrayLengths);
            const voxelSAB = SABData.sab;
            currentIndex = SABData.newIndex;
            SABData = this._getSAB(rawRegion, currentIndex, voxelArrayLengths);
            const voxelStatesSAB = SABData.sab;
            currentIndex = SABData.newIndex;
            SABData = this._getSAB(rawRegion, currentIndex, heightMapArrayLength);
            const heightMapSAB = SABData.sab;
            currentIndex = SABData.newIndex;
            SABData = this._getSAB(rawRegion, currentIndex, minMaxLength);
            const minMaxMap = SABData.sab;
            currentIndex = SABData.newIndex;
            DVEDL.worldComm.sendMessage("set-chunk", [
                chunkPOS.x,
                chunkPOS.y,
                chunkPOS.z,
                voxelSAB,
                voxelStatesSAB,
                heightMapSAB,
                minMaxMap,
            ]);
        }
        this._sab = { sab: new SharedArrayBuffer(0), newIndex: 0 };
    },
    _getSAB(regionArray, currentIndex, arrayLength) {
        const sab = new SharedArrayBuffer(arrayLength * 4);
        const tempArray = new Uint32Array(sab);
        let k = 0;
        for (let i = currentIndex; i < currentIndex + arrayLength; i++) {
            tempArray[k] = regionArray[i];
            k++;
        }
        this._sab.sab = sab;
        this._sab.newIndex = currentIndex += arrayLength;
        return this._sab;
    },
    _getPos(regionArray, currentIndex) {
        this._pos.x = regionArray[currentIndex + 1];
        if (regionArray[currentIndex] == 1) {
            this._pos.x *= -1;
        }
        this._pos.y = regionArray[currentIndex + 3];
        if (regionArray[currentIndex + 2] == 1) {
            this._pos.y *= -1;
        }
        this._pos.z = regionArray[currentIndex + 5];
        if (regionArray[currentIndex + 6] == 1) {
            this._pos.z *= -1;
        }
        this._pos.newIndex = currentIndex += 6;
        return this._pos;
    },
    //this is just a test of converting a whole region into a typed array
    saveRegion(dimesnon, x, y, z) {
        if (!this.regions.setDimension(dimesnon).loadIn(x, y, z))
            return false;
        const dataCount = this.regions.getRegionDataCount();
        const bufferTotalSize = this.regions.getBufferSize() +
            dataCount.chunks * this.chunks.getBufferSize() +
            dataCount.columns * this.columns.getBufferSize();
        const regionBuffer = new ArrayBuffer(bufferTotalSize);
        const regionArray = new Uint8Array(regionBuffer);
        const region = this.regions.getRegion();
        let offset = this._readDataIntoBuffer(region.buffer, 0, regionArray);
        region.columns.forEach((column) => {
            offset += this._readDataIntoBuffer(column.buffer, offset, regionArray);
            column.chunks.forEach((chunk) => {
                offset += this._readDataIntoBuffer(chunk.buffer, offset, regionArray);
            });
        });
        return regionBuffer;
    },
    _readDataIntoBuffer(source, offset, target) {
        let newOffset = offset;
        const bufferArray = new Uint8Array(source);
        for (let i = 0; i < bufferArray.length; i++) {
            target[i + offset] = bufferArray[i];
            newOffset++;
        }
        return newOffset;
    },
    _addPositionToBuffer(x, y, z, regionArray, currentIndex) {
        if (x < 0) {
            regionArray[currentIndex] = 1;
        }
        regionArray[currentIndex + 1] = Math.abs(x);
        if (y < 0) {
            regionArray[currentIndex + 2] = 1;
        }
        regionArray[currentIndex + 3] = Math.abs(y);
        if (z < 0) {
            regionArray[currentIndex + 4] = 1;
        }
        regionArray[currentIndex + 5] = Math.abs(z);
        return (currentIndex += 6);
    },
    _addArrayToBuffer(regionArray, currentIndex, array) {
        for (let i = 0; i < array.length; i++) {
            regionArray[currentIndex + i] = array[i];
        }
        return currentIndex + array.length;
    },
    _getRegionBufferSize(totalChunks) {
        let returnValue = 0;
        //message index
        returnValue += 3;
        //regions position
        returnValue += 6;
        //chunks positions
        returnValue += 6 * totalChunks;
        //voxels
        returnValue += totalChunks * WorldBounds.chunkTotalVoxels;
        //voxel states
        returnValue += totalChunks * WorldBounds.chunkTotalVoxels;
        //height map
        returnValue += totalChunks * WorldBounds.chunkArea * 2;
        //min max map
        returnValue += totalChunks * 2;
        return returnValue * 4;
    },
};

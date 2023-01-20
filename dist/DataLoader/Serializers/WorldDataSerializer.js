//objects
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { WorldDataHeaders, DVEMessageHeader, } from "../../Data/Constants/DataHeaders.js";
export const WorldDataSerialize = {
    regions: new RegionDataTool(),
    columns: new ColumnDataTool(),
    chunks: new ChunkDataTool(),
    serializeRegion(location) {
        if (!this.regions
            .setDimension(location[0])
            .loadInAt(location[1], location[2], location[3]))
            return false;
        const region = this.regions.getRegion();
        const columnBuffers = [];
        region.columns.forEach((column) => {
            this.columns.setColumn(column);
            const location = this.columns.getLocationData();
            const columnBuffer = this.serializeColumn(location);
            if (columnBuffer)
                columnBuffers.push([[...location], columnBuffer]);
        });
        return columnBuffers;
    },
    serializeColumn(location) {
        if (!this.columns.setLocation(location).loadIn())
            return false;
        const columnSize = this.columns.getBufferSizeForWholeColumn();
        const columnBuffer = new ArrayBuffer(columnSize);
        const columnArray = new Uint8Array(columnBuffer);
        const column = this.columns.getColumn();
        let offset = this._readDataIntoBuffer(0, columnArray, column.buffer);
        column.chunks.forEach((chunk) => {
            offset += this._readDataIntoBuffer(offset, columnArray, chunk.buffer);
        });
        return columnArray;
    },
    deSerializeRegion(regionBuffers) {
        for (const buffer of regionBuffers) {
            this.deSerializeColumn(buffer);
        }
    },
    deSerializeColumn(columnBuffer) {
        const dv = new DataView(columnBuffer);
        if (dv.getUint16(0) != DVEMessageHeader &&
            dv.getUint16(2) != WorldDataHeaders.column) {
            throw new Error(`Column at ${location} is not the correct format.`);
        }
        const chunks = [];
        const columnSAB = new SharedArrayBuffer(this.columns.getBufferSize());
        const columnArray = new Uint8Array(columnSAB);
        let offset = this._readDataIntoBuffer(0, columnArray, columnBuffer, 0, this.columns.getBufferSize());
        const columnBufferLength = columnBuffer.byteLength;
        while (offset < columnBufferLength) {
            const dataType = dv.getUint16(offset + 2);
            if (dataType == WorldDataHeaders.chunk) {
                const chunkSAB = new SharedArrayBuffer(this.chunks.getBufferSize());
                const chunkArray = new Uint8Array(chunkSAB);
                offset += this._readDataIntoBuffer(0, chunkArray, columnBuffer, offset, this.chunks.getBufferSize());
                chunks.push(chunkSAB);
                continue;
            }
            throw new Error(`Error loading column at: ${location}`);
        }
        return {
            column: columnSAB,
            chunks: chunks,
        };
    },
    _readDataIntoBuffer(offset, target, source, sourceOffset = 0, sourceLength = -1) {
        const bufferArray = new Uint8Array(source, sourceOffset, sourceLength == -1 ? source.byteLength : sourceLength);
        let i = bufferArray.length;
        while (i--) {
            target[i + offset] = bufferArray[i];
        }
        return bufferArray.length;
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionTagIds = exports.RegionData = exports.SecotrData = void 0;
exports.SecotrData = {
    byteSize: 0,
    maxSectors: 16,
    getSectorsNeeded(byteLength) {
        return Math.ceil(byteLength / exports.SecotrData.byteSize);
    },
    getTotalSectorsInFile(byteLength) {
        return Math.ceil(Math.abs(byteLength - exports.RegionData.headByteSize) / exports.SecotrData.byteSize);
    },
    getSectorByteIndex(index) {
        return index * this.byteSize + exports.RegionData.headByteSize;
    },
    getTotalBytesNeeded(byteLength) {
        return this.getSectorsNeeded(byteLength) * this.byteSize;
    },
};
exports.RegionData = {
    headByteSize: 0,
    numColumns: 0
};
exports.RegionTagIds = {
    sectorIndex: "#dved-column-sector-index",
    columnLength: "#dved-column-legnth-index",
    timeStamp: "#dved-column-save-timestamp",
};

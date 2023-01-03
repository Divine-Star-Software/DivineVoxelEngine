"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionHeaderData = exports.SecotrData = void 0;
exports.SecotrData = {
    byteSize: 0,
    maxSectors: 16,
    getSectorsNeeded: function (byteLength) {
        return Math.ceil(byteLength / exports.SecotrData.byteSize);
    },
    getTotalSectorsInFile: function (byteLength) {
        return Math.ceil(Math.abs(byteLength - exports.RegionHeaderData.byteSize) / exports.SecotrData.byteSize);
    },
    getSectorByteIndex: function (index) {
        return index * this.byteSize + exports.RegionHeaderData.byteSize;
    },
    getTotalBytesNeeded: function (byteLength) {
        return this.getSectorsNeeded(byteLength) * this.byteSize;
    },
};
exports.RegionHeaderData = {
    byteSize: 0,
};

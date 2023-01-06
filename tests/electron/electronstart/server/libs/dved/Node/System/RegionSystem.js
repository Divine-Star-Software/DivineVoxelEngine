"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionSystem = void 0;
const DVED_util_js_1 = require("../Util/DVED.util.js");
const DivineVoxelEngineData_js_1 = require("../DivineVoxelEngineData.js");
const System_js_1 = require("./System.js");
const SystemPath_js_1 = require("./SystemPath.js");
exports.RegionSystem = {
    _processInput(buffer) {
        if (buffer instanceof ArrayBuffer)
            return buffer;
        if (ArrayBuffer.isView(buffer))
            return buffer.buffer;
        let newBuf = new ArrayBuffer(buffer.length);
        const array = new Uint8Array(newBuf);
        let i = newBuf.byteLength;
        while (i--) {
            array[i] = buffer.charCodeAt(i);
        }
        return newBuf;
    },
    _getTagIndex(id, index) {
        return DivineVoxelEngineData_js_1.DVED.regionTags.getArrayTagByteIndex(id, index);
    },
    _getIndex(index) {
        if (Array.isArray(index)) {
            index = DivineVoxelEngineData_js_1.DVED.spaces.column.getIndexXYZ(index[1], index[2], index[3]);
        }
        return index;
    },
    timeStamp: {
        get(file, index) {
            const timeStampData = file.read(exports.RegionSystem._getTagIndex(DVED_util_js_1.RegionTagIds.timeStamp, index), 4);
            if (!timeStampData)
                return false;
            return new Uint32Array(timeStampData)[0];
        },
        set(file, index, timeStamp = Date.now()) {
            return file.write(exports.RegionSystem._getTagIndex(DVED_util_js_1.RegionTagIds.timeStamp, index), new Uint32Array([timeStamp]).buffer);
        },
    },
    sectorIndex: {
        get(file, index) {
            const sectorIndexData = file.read(exports.RegionSystem._getTagIndex(DVED_util_js_1.RegionTagIds.sectorIndex, index), 2);
            if (!sectorIndexData)
                return false;
            return new Uint16Array(sectorIndexData)[0] + 1;
        },
        set(file, index, sectorIndex) {
            return file.write(exports.RegionSystem._getTagIndex(DVED_util_js_1.RegionTagIds.sectorIndex, index), new Uint16Array([sectorIndex - 1]).buffer);
        },
    },
    columnLength: {
        get(file, index) {
            const columnLengthData = file.read(exports.RegionSystem._getTagIndex(DVED_util_js_1.RegionTagIds.columnLength, index), 2);
            if (!columnLengthData)
                return false;
            return new Uint16Array(columnLengthData)[0];
        },
        set(file, index, length) {
            return file.write(exports.RegionSystem._getTagIndex(DVED_util_js_1.RegionTagIds.columnLength, index), new Uint16Array([length]).buffer);
        },
    },
    sectors: {
        get(file, sectorIndex, length) {
            return file.read(DVED_util_js_1.SecotrData.getSectorByteIndex(sectorIndex - 1), length);
        },
        set(file, sectorIndex, data) {
            const sectorByteIndex = DVED_util_js_1.SecotrData.getSectorByteIndex(sectorIndex - 1);
            file.clear(sectorByteIndex, DVED_util_js_1.SecotrData.getTotalBytesNeeded(data.byteLength));
            return file.write(sectorByteIndex, data);
        },
    },
    getHeader(file) {
        return file.read(0, DVED_util_js_1.RegionData.headByteSize);
    },
    _rebuild(file, swapFile, newColumnIndex, newColumnData) {
        const columns = this._getAllColumns(file);
        for (const column of columns) {
            let [index, data] = column;
            if (data.byteLength == 0)
                continue;
            if (index == newColumnIndex)
                data = newColumnData;
            this.saveColumn(swapFile, index, data);
        }
    },
    _getAllColumns(file) {
        return (function* generator() {
            for (let i = 0; i < DVED_util_js_1.RegionData.numColumns; i++) {
                let data = exports.RegionSystem.loadColumn(file, i);
                data = data ? data : new ArrayBuffer(0);
                yield [i, data];
            }
        })();
    },
    loadColumn(file, index) {
        index = this._getIndex(index);
        const sectorIndex = this.sectorIndex.get(file, index);
        if (typeof sectorIndex == "boolean")
            return false;
        const columnLength = this.columnLength.get(file, index);
        if (typeof columnLength == "boolean" || columnLength === 0)
            return false;
        return this.sectors.get(file, sectorIndex, columnLength);
    },
    saveColumn(file, index, data) {
        index = this._getIndex(index);
        data = this._processInput(data);
        let timeStamp = this.timeStamp.get(file, index);
        let sectorIndex = this.sectorIndex.get(file, index);
        if (!sectorIndex)
            throw new Error("error");
        if (!timeStamp) {
            const currentFileSize = file.getSize();
            sectorIndex = DVED_util_js_1.SecotrData.getTotalSectorsInFile(currentFileSize) + 1;
            this.sectorIndex.set(file, index, sectorIndex);
        }
        let currentColumnLegnth = this.columnLength.get(file, index);
        if (currentColumnLegnth) {
            const currentSectors = DVED_util_js_1.SecotrData.getSectorsNeeded(currentColumnLegnth);
            const newSectors = DVED_util_js_1.SecotrData.getSectorsNeeded(data.byteLength);
            if (currentSectors != newSectors) {
                const swapFilePath = SystemPath_js_1.SystemPath.getDirecoty(file.getPath()) +
                    "/" +
                    Date.now() +
                    "-temp.dved";
                const oldPath = file.getPath();
                file.move(swapFilePath);
                //  file.reOpen();
                const swapFile = System_js_1.System.sync.createAndOpenFile(oldPath, DVED_util_js_1.RegionData.headByteSize);
                if (swapFile) {
                    this._rebuild(file, swapFile, index, data);
                    file.delete();
                    swapFile.close();
                    return;
                }
            }
        }
        this.sectors.set(file, sectorIndex, data);
        this.columnLength.set(file, index, data.byteLength);
        this.timeStamp.set(file, index);
    },
};

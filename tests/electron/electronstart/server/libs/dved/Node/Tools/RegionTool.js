"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionTool = void 0;
var DVEDSystem_js_1 = require("../DVEDSystem.js");
var DivineVoxelEngineData_js_1 = require("../DivineVoxelEngineData.js");
var DVED_constants_js_1 = require("../Constants/DVED.constants.js");
var System_js_1 = require("../System/System.js");
var getTagIndex = function (id, location) {
    var columnIndex = DivineVoxelEngineData_js_1.DVED.spaces.column.getIndexXYZ(location[1], location[2], location[3]);
    return DivineVoxelEngineData_js_1.DVED.regionTags.getArrayTagByteIndex(id, columnIndex);
};
var RegionTool = /** @class */ (function () {
    function RegionTool() {
        this.location = ["main", 0, 0, 0];
        this.dimension = "";
        this.previousDimension = "";
        this.path = "";
        this.fileName = "";
        this.dataType = "world-data";
    }
    RegionTool.prototype.setPath = function (path) {
        this.path = path;
        return this;
    };
    RegionTool.prototype.setDataType = function (dataTypes) {
        this.dataType = dataTypes;
        this._setFileName();
        return this;
    };
    RegionTool.prototype.setLocation = function (location) {
        this.location = location;
        this.dimension = location[0];
        this._setFileName();
        if (location[0] != this.previousDimension) {
            DVEDSystem_js_1.DVEDSystem.mkdirs([
                this._dimensionPath(),
                this._getDataPath("world-data"),
                this._getDataPath("rich-data"),
                this._getDataPath("entities"),
                this._getDataPath("dbo"),
            ]);
        }
        return this;
    };
    RegionTool.prototype.getCurrentPath = function () {
        return this._getDataPath(this.dataType, this.fileName);
    };
    RegionTool.prototype._dimensionPath = function (dataPath) {
        if (dataPath === void 0) { dataPath = ""; }
        return "".concat(this.path, "/").concat(this.dimension, "/").concat(dataPath);
    };
    RegionTool.prototype._getDataPath = function (dataType, fileName) {
        if (fileName === void 0) { fileName = ""; }
        return this._dimensionPath("".concat(dataType, "/").concat(fileName));
    };
    RegionTool.prototype._setFileName = function () {
        var regionPOS = DivineVoxelEngineData_js_1.DVED.spaces.region.getPositionXYZ(this.location[1], this.location[2], this.location[3]);
        this.fileName = "region_".concat(this.dataType.replace("-", "_"), "_").concat(this.dimension, "_").concat(regionPOS.x, "_").concat(regionPOS.y, "_").concat(regionPOS.z, ".dved");
    };
    RegionTool.prototype.regionExists = function () {
        var file = System_js_1.System.openFile(this.getCurrentPath());
        if (file)
            file.close();
        return Boolean(file);
    };
    RegionTool.prototype.createRegion = function (buffer) {
        if (buffer === void 0) { buffer = new ArrayBuffer(DivineVoxelEngineData_js_1.DVED.regionTags.tagSize); }
        return DVEDSystem_js_1.DVEDSystem.createFileSync(this.getCurrentPath(), buffer);
    };
    RegionTool.prototype.regionHasColumn = function () {
        var timeStamp = this.getColumnTimestamp();
        return timeStamp > 0;
    };
    RegionTool.prototype.getColumnTimestamp = function () {
        var file = System_js_1.System.openFile(this.getCurrentPath());
        if (!file)
            return false;
        var timeStampData = file.read(getTagIndex("#dved-column-save-timestamp", this.location), 4);
        file.close();
        if (!timeStampData)
            return false;
        var timeStamp = new Uint32Array(timeStampData)[0];
        return timeStamp;
    };
    RegionTool.prototype.loadColumn = function () {
        var file = System_js_1.System.openFile(this.getCurrentPath());
        if (!file)
            return;
        var sectorIndexData = file.read(getTagIndex("#dved-column-sector-index", this.location), 2);
        var sectorIndex = 0;
        if (!sectorIndexData) {
            return false;
        }
        else {
            sectorIndex = new Uint16Array(sectorIndexData)[0];
        }
        var columnLengthData = file.read(getTagIndex("#dved-column-legnth-index", this.location), 2);
        var columnLength = 0;
        if (!columnLengthData) {
            return false;
        }
        else {
            columnLength = new Uint16Array(columnLengthData)[0];
        }
        var data = file.read(DVED_constants_js_1.SecotrData.getSectorByteIndex(sectorIndex), columnLength);
        file.close();
        return data;
    };
    RegionTool.prototype._processInput = function (buffer) {
        if (buffer instanceof ArrayBuffer)
            return buffer;
        if (ArrayBuffer.isView(buffer))
            return buffer.buffer;
        var newBuf = new ArrayBuffer(buffer.length);
        var array = new Uint8Array(newBuf);
        var i = newBuf.byteLength;
        while (i--) {
            array[i] = buffer.charCodeAt(i);
        }
        return newBuf;
    };
    RegionTool.prototype.getHeader = function () {
        if (!this.regionExists()) {
            this.createRegion();
        }
        var file = System_js_1.System.openFile(this.getCurrentPath());
        if (!file)
            return;
        var buffer = file.read(0, DivineVoxelEngineData_js_1.DVED.regionTags.tagSize);
        file.close();
        return buffer;
    };
    RegionTool.prototype.saveColumn = function (buffer) {
        if (!this.regionExists()) {
            this.createRegion();
        }
        var file = System_js_1.System.openFile(this.getCurrentPath());
        if (!file)
            return;
        var currentSize = file.getSize();
        buffer = this._processInput(buffer);
        var columnSectorIndex = getTagIndex("#dved-column-sector-index", this.location);
        var sectorIndexData = file.read(columnSectorIndex, 2);
        var sectorIndex = 0;
        if (!sectorIndexData) {
        }
        else {
            sectorIndex = new Uint16Array(sectorIndexData)[0];
        }
        if (!sectorIndex) {
            sectorIndex = DVED_constants_js_1.SecotrData.getTotalSectorsInFile(currentSize);
            file.write(columnSectorIndex, new Uint16Array([sectorIndex]).buffer);
        }
        var sectorByteIndex = DVED_constants_js_1.SecotrData.getSectorByteIndex(sectorIndex);
        file.clear(sectorByteIndex, DVED_constants_js_1.SecotrData.getTotalBytesNeeded(buffer.byteLength));
        file.write(sectorByteIndex, buffer);
        file.write(getTagIndex("#dved-column-legnth-index", this.location), new Uint16Array([buffer.byteLength]).buffer);
        file.write(getTagIndex("#dved-column-save-timestamp", this.location), new Uint32Array([Date.now()]).buffer);
        file.close();
    };
    return RegionTool;
}());
exports.RegionTool = RegionTool;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionTool = void 0;
const DivineVoxelEngineData_js_1 = require("../DivineVoxelEngineData.js");
const System_js_1 = require("../System/System.js");
const RegionSystem_js_1 = require("../System/RegionSystem.js");
const DVED_util_js_1 = require("../Util/DVED.util.js");
const SystemPath_js_1 = require("../System/SystemPath.js");
class RegionTool {
    location = ["main", 0, 0, 0];
    dimension = "";
    previousDimension = "";
    path = "";
    fileName = "";
    dataType = "world-data";
    setDataType(dataTypes) {
        this.dataType = dataTypes;
        this._setFileName();
        return this;
    }
    setLocation(location) {
        this.location = location;
        this.dimension = location[0];
        this.path = SystemPath_js_1.SystemPath.getDataDirectory();
        this._setFileName();
        if (location[0] != this.previousDimension) {
            System_js_1.System.mkdirs([
                this._dimensionPath(),
                this._getDataPath("world-data"),
                this._getDataPath("rich-data"),
                this._getDataPath("entities"),
                this._getDataPath("dbo"),
            ]);
        }
        return this;
    }
    getCurrentPath() {
        return this._getDataPath(this.dataType, this.fileName);
    }
    _getSwapPath() {
        return this._getDataPath(this.dataType, "swap-" + this.fileName);
    }
    _dimensionPath(dataPath = "") {
        return `${this.path}/${this.dimension}/${dataPath}`;
    }
    _getDataPath(dataType, fileName = "") {
        return this._dimensionPath(`${dataType}/${fileName}`);
    }
    _setFileName() {
        const regionPOS = DivineVoxelEngineData_js_1.DVED.spaces.region.getPositionXYZ(this.location[1], this.location[2], this.location[3]);
        this.fileName = `region_${this.dataType.replace("-", "_")}_${this.dimension}_${regionPOS.x}_${regionPOS.y}_${regionPOS.z}.dved`;
    }
    regionExists() {
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (file)
            file.close();
        return Boolean(file);
    }
    createRegion() {
        return System_js_1.System.sync.createFile(this.getCurrentPath(), DVED_util_js_1.RegionData.headByteSize);
    }
    regionHasColumn() {
        const timeStamp = this.getColumnTimestamp();
        return timeStamp > 0;
    }
    getAllColumns() {
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (!file)
            return false;
        return RegionSystem_js_1.RegionSystem._getAllColumns(file);
    }
    copyToNewfile() {
        const swapFile = System_js_1.System.sync.createAndOpenFile(this._getSwapPath(), DVED_util_js_1.RegionData.headByteSize);
        if (!swapFile)
            return;
        const columns = this.getAllColumns();
        if (!columns)
            return;
        for (const column of columns) {
            RegionSystem_js_1.RegionSystem.saveColumn(swapFile, column[0], column[1]);
        }
    }
    getColumnTimestamp() {
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (!file)
            return false;
        const timeStamp = RegionSystem_js_1.RegionSystem.timeStamp.get(file, RegionSystem_js_1.RegionSystem._getIndex(this.location));
        file.close();
        return !timeStamp ? 0 : timeStamp;
    }
    getSectorIndex() {
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (!file)
            return false;
        const index = RegionSystem_js_1.RegionSystem.sectorIndex.get(file, RegionSystem_js_1.RegionSystem._getIndex(this.location));
        file.close();
        return !index ? 0 : index;
    }
    getColumnDataLength() {
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (!file)
            return false;
        const length = RegionSystem_js_1.RegionSystem.columnLength.get(file, RegionSystem_js_1.RegionSystem._getIndex(this.location));
        file.close();
        return !length ? 0 : length;
    }
    getHeader() {
        if (!this.regionExists()) {
            this.createRegion();
        }
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (!file)
            return false;
        const buffer = RegionSystem_js_1.RegionSystem.getHeader(file);
        file.close();
        return buffer;
    }
    loadColumn() {
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (!file)
            return false;
        const data = RegionSystem_js_1.RegionSystem.loadColumn(file, this.location);
        file.close();
        return data;
    }
    saveColumn(buffer) {
        if (!this.regionExists()) {
            this.createRegion();
        }
        const file = System_js_1.System.sync.openFile(this.getCurrentPath());
        if (!file)
            return false;
        RegionSystem_js_1.RegionSystem.saveColumn(file, this.location, buffer);
        file.close();
        return true;
    }
}
exports.RegionTool = RegionTool;

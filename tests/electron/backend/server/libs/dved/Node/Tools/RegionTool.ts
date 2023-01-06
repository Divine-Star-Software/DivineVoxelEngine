import type { DVEDDataTypes, DVEDLocationData } from "../../Types/DVED.types";
import { DVED } from "../DivineVoxelEngineData.js";
import { System } from "../System/System.js";
import { RegionSystem } from "../System/RegionSystem.js";
import { RegionData } from "../Util/DVED.util.js";
import { SystemPath } from "../System/SystemPath.js";

export class RegionTool {
  location: DVEDLocationData = ["main", 0, 0, 0];
  dimension = "";
  previousDimension = "";
  path = "";
  fileName = "";
  dataType: DVEDDataTypes = "world-data";

  setDataType(dataTypes: DVEDDataTypes) {
    this.dataType = dataTypes;
    this._setFileName();
    return this;
  }

  setLocation(location: DVEDLocationData) {
    this.location = location;
    this.dimension = location[0];
    this.path = SystemPath.getDataDirectory();
    this._setFileName();
    if (location[0] != this.previousDimension) {
      System.mkdirs([
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

  _dimensionPath(dataPath: string = "") {
    return `${this.path}/${this.dimension}/${dataPath}`;
  }

  _getDataPath(dataType: DVEDDataTypes, fileName = "") {
    return this._dimensionPath(`${dataType}/${fileName}`);
  }

  _setFileName() {
    const regionPOS = DVED.spaces.region.getPositionXYZ(
      this.location[1],
      this.location[2],
      this.location[3]
    );
    this.fileName = `region_${this.dataType.replace("-", "_")}_${
      this.dimension
    }_${regionPOS.x}_${regionPOS.y}_${regionPOS.z}.dved`;
  }

  regionExists() {
    const file = System.sync.openFile(this.getCurrentPath());
    if (file) file.close();
    return Boolean(file);
  }

  createRegion() {
    return System.sync.createFile(
      this.getCurrentPath(),
      RegionData.headByteSize
    );
  }

  regionHasColumn() {
    const timeStamp = this.getColumnTimestamp();
    return timeStamp > 0;
  }

  getAllColumns() {
    const file = System.sync.openFile(this.getCurrentPath());
    if (!file) return false;
    return RegionSystem._getAllColumns(file);
  }

  copyToNewfile() {
    const swapFile = System.sync.createAndOpenFile(
      this._getSwapPath(),
      RegionData.headByteSize
    );
    if (!swapFile) return;
    const columns = this.getAllColumns();
    if (!columns) return;
    for (const column of columns) {
      RegionSystem.saveColumn(swapFile, column[0], column[1]);
    }
  }

  getColumnTimestamp() {
    const file = System.sync.openFile(this.getCurrentPath());
    if (!file) return false;
    const timeStamp = RegionSystem.timeStamp.get(
      file,
      RegionSystem._getIndex(this.location)
    );
    file.close();
    return !timeStamp ? 0 : timeStamp;
  }

  getSectorIndex() {
    const file = System.sync.openFile(this.getCurrentPath());
    if (!file) return false;
    const index = RegionSystem.sectorIndex.get(
      file,
      RegionSystem._getIndex(this.location)
    );
    file.close();
    return !index ? 0 : index;
  }

  getColumnDataLength() {
    const file = System.sync.openFile(this.getCurrentPath());
    if (!file) return false;
    const length = RegionSystem.columnLength.get(
      file,
      RegionSystem._getIndex(this.location)
    );
    file.close();
    return !length ? 0 : length;
  }

  getHeader() {
    if (!this.regionExists()) {
      this.createRegion();
    }
    const file = System.sync.openFile(this.getCurrentPath());
    if (!file) return false;
    const buffer = RegionSystem.getHeader(file);
    file.close();
    return buffer;
  }

  loadColumn() {
    const file = System.sync.openFile(this.getCurrentPath());
    if (!file) return false;
    const data = RegionSystem.loadColumn(file, this.location);
    file.close();
    return data;
  }

  saveColumn(buffer: ArrayBuffer | string) {
    if (!this.regionExists()) {
      this.createRegion();
    }
    const file = System.sync.openFile(this.getCurrentPath());
    if (!file) return false;
    RegionSystem.saveColumn(file, this.location, buffer);
    file.close();
    return true;
  }
}

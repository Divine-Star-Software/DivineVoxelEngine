import type { DVEDDataTypes, DVEDLocationData } from "../../Types/DVED.types";
import { DVEDSystem } from "../DVEDSystem.js";
import { DVED } from "../DivineVoxelEngineData.js";
import { SecotrData } from "../Constants/DVED.constants.js";
import { System } from "../System/System.js";

const getTagIndex = (id: string, location: DVEDLocationData) => {
  const columnIndex = DVED.spaces.column.getIndexXYZ(
    location[1],
    location[2],
    location[3]
  );
  return DVED.regionTags.getArrayTagByteIndex(id, columnIndex);
};

export class RegionTool {
  location: DVEDLocationData = ["main", 0, 0, 0];
  dimension = "";
  previousDimension = "";
  path = "";
  fileName = "";
  dataType: DVEDDataTypes = "world-data";

  setPath(path: string) {
    this.path = path;
    return this;
  }

  setDataType(dataTypes: DVEDDataTypes) {
    this.dataType = dataTypes;
    this._setFileName();
    return this;
  }

  setLocation(location: DVEDLocationData) {
    this.location = location;
    this.dimension = location[0];
    this._setFileName();
    if (location[0] != this.previousDimension) {
      DVEDSystem.mkdirs([
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
    const file = System.openFile(this.getCurrentPath());
    if (file) file.close();
    return Boolean(file);
  }

  createRegion(buffer = new ArrayBuffer(DVED.regionTags.tagSize)) {
    return DVEDSystem.createFileSync(this.getCurrentPath(), buffer);
  }

  regionHasColumn() {
    const timeStamp = this.getColumnTimestamp();
    return timeStamp > 0;
  }

  getColumnTimestamp() {
    const file = System.openFile(this.getCurrentPath());
    if (!file) return false;
    const timeStampData = file.read(
      getTagIndex("#dved-column-save-timestamp", this.location),
      4
    );
    file.close();
    if (!timeStampData) return false;
    const timeStamp = new Uint32Array(timeStampData)[0];
    return timeStamp;
  }

  loadColumn() {
    const file = System.openFile(this.getCurrentPath());
    if (!file) return;

    const sectorIndexData = file.read(
      getTagIndex("#dved-column-sector-index", this.location),
      2
    );

    let sectorIndex = 0;
    if (!sectorIndexData) {
      return false;
    } else {
      sectorIndex = new Uint16Array(sectorIndexData)[0];
    }
    const columnLengthData = file.read(
      getTagIndex("#dved-column-legnth-index", this.location),
      2
    );
    let columnLength = 0;
    if (!columnLengthData) {
      return false;
    } else {
      columnLength = new Uint16Array(columnLengthData)[0];
    }
    const data = file.read(
      SecotrData.getSectorByteIndex(sectorIndex),
      columnLength
    );
    file.close();
    return data;
  }

  _processInput(buffer: ArrayBuffer | string) {
    if (buffer instanceof ArrayBuffer) return buffer;
    if (ArrayBuffer.isView(buffer)) return buffer.buffer;
    let newBuf = new ArrayBuffer(buffer.length);
    const array = new Uint8Array(newBuf);
    let i = newBuf.byteLength;
    while (i--) {
      array[i] = buffer.charCodeAt(i);
    }
    return newBuf;
  }

  getHeader() {
    if (!this.regionExists()) {
      this.createRegion();
    }
    const file = System.openFile(this.getCurrentPath());
    if (!file) return;
    const buffer = file.read(0,DVED.regionTags.tagSize);
    file.close();
    return buffer;
  }

  saveColumn(buffer: ArrayBuffer | string) {
    if (!this.regionExists()) {
      this.createRegion();
    }
    const file = System.openFile(this.getCurrentPath());
    if (!file) return;

    const currentSize = file.getSize();
    buffer = this._processInput(buffer);

    const columnSectorIndex = getTagIndex(
      "#dved-column-sector-index",
      this.location
    );
    const sectorIndexData = file.read(columnSectorIndex, 2);

    let sectorIndex = 0;
    if (!sectorIndexData) {
    } else {
      sectorIndex = new Uint16Array(sectorIndexData)[0];
    }
    if (!sectorIndex) {
      sectorIndex = SecotrData.getTotalSectorsInFile(currentSize);
      file.write(columnSectorIndex, new Uint16Array([sectorIndex]).buffer);
    }

    const sectorByteIndex = SecotrData.getSectorByteIndex(sectorIndex);
    file.clear(
      sectorByteIndex,
      SecotrData.getTotalBytesNeeded(buffer.byteLength)
    );
    file.write(sectorByteIndex, buffer);
    file.write(
      getTagIndex("#dved-column-legnth-index", this.location),
      new Uint16Array([buffer.byteLength]).buffer
    );
    file.write(
      getTagIndex("#dved-column-save-timestamp", this.location),
      new Uint32Array([Date.now()]).buffer
    );
    file.close();
  }
}

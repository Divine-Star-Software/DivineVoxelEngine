import type { DVEDSyncFile, DVEDLocationData } from "../../Types/DVED.types";
import { RegionData, RegionTagIds, SecotrData } from "../Util/DVED.util.js";
import { DVED } from "../DivineVoxelEngineData.js";
import { System } from "./System.js";
import { SystemPath } from "./SystemPath.js";

export const RegionSystem = {
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
  },

  _getTagIndex(id: string, index: number) {
    return DVED.regionTags.getArrayTagByteIndex(id, index);
  },

  _getIndex(index: number | DVEDLocationData) {
    if (Array.isArray(index)) {
      index = DVED.spaces.column.getIndexXYZ(index[1], index[2], index[3]);
    }
    return index;
  },

  timeStamp: {
    get(file: DVEDSyncFile, index: number) {
      const timeStampData = file.read(
        RegionSystem._getTagIndex(RegionTagIds.timeStamp, index),
        4
      );
      if (!timeStampData) return false;
      return new Uint32Array(timeStampData)[0];
    },
    set(file: DVEDSyncFile, index: number, timeStamp = Date.now()) {
      return file.write(
        RegionSystem._getTagIndex(RegionTagIds.timeStamp, index),
        new Uint32Array([timeStamp]).buffer
      );
    },
  },
  sectorIndex: {
    get(file: DVEDSyncFile, index: number) {
      const sectorIndexData = file.read(
        RegionSystem._getTagIndex(RegionTagIds.sectorIndex, index),
        2
      );
      if (!sectorIndexData) return false;
      return new Uint16Array(sectorIndexData)[0] + 1;
    },
    set(file: DVEDSyncFile, index: number, sectorIndex: number) {
      return file.write(
        RegionSystem._getTagIndex(RegionTagIds.sectorIndex, index),
        new Uint16Array([sectorIndex - 1]).buffer
      );
    },
  },
  columnLength: {
    get(file: DVEDSyncFile, index: number) {
      const columnLengthData = file.read(
        RegionSystem._getTagIndex(RegionTagIds.columnLength, index),
        2
      );
      if (!columnLengthData) return false;
      return new Uint16Array(columnLengthData)[0];
    },
    set(file: DVEDSyncFile, index: number, length: number) {
      return file.write(
        RegionSystem._getTagIndex(RegionTagIds.columnLength, index),
        new Uint16Array([length]).buffer
      );
    },
  },
  sectors: {
    get(file: DVEDSyncFile, sectorIndex: number, length: number) {
      return file.read(SecotrData.getSectorByteIndex(sectorIndex - 1), length);
    },
    set(file: DVEDSyncFile, sectorIndex: number, data: ArrayBuffer) {
      const sectorByteIndex = SecotrData.getSectorByteIndex(sectorIndex - 1);
      file.clear(
        sectorByteIndex,
        SecotrData.getTotalBytesNeeded(data.byteLength)
      );
      return file.write(sectorByteIndex, data);
    },
  },

  getHeader(file: DVEDSyncFile) {
    return file.read(0, RegionData.headByteSize);
  },

  _rebuild(
    file: DVEDSyncFile,
    swapFile: DVEDSyncFile,
    newColumnIndex: number,
    newColumnData: ArrayBuffer
  ) {
    const columns = this._getAllColumns(file);
    for (const column of columns) {
      let [index, data] = column;
      if (data.byteLength == 0) continue;
      if (index == newColumnIndex) data = newColumnData;
      this.saveColumn(swapFile, index, data);
    }
  },

  _getAllColumns(file: DVEDSyncFile) {
    return (function* generator(): IterableIterator<[number, ArrayBuffer]> {
      for (let i = 0; i < RegionData.numColumns; i++) {
        let data = RegionSystem.loadColumn(file, i);
        data = data ? data : new ArrayBuffer(0);
        yield [i, data];
      }
    })();
  },

  loadColumn(file: DVEDSyncFile, index: number | DVEDLocationData) {
    index = this._getIndex(index);
    const sectorIndex = this.sectorIndex.get(file, index);
    if (typeof sectorIndex == "boolean") return false;
    const columnLength = this.columnLength.get(file, index);
    if (typeof columnLength == "boolean" || columnLength === 0) return false;
    return this.sectors.get(file, sectorIndex, columnLength);
  },

  saveColumn(
    file: DVEDSyncFile,
    index: number | DVEDLocationData,
    data: ArrayBuffer | string
  ) {
    index = this._getIndex(index);
    data = this._processInput(data);
    let timeStamp = this.timeStamp.get(file, index);
    let sectorIndex = this.sectorIndex.get(file, index);
    if (!sectorIndex) throw new Error("error");
    if (!timeStamp) {
      const currentFileSize = file.getSize();
      sectorIndex = SecotrData.getTotalSectorsInFile(currentFileSize) + 1;
      this.sectorIndex.set(file, index, sectorIndex);
    }
    let currentColumnLegnth = this.columnLength.get(file, index);
    if (currentColumnLegnth) {
      const currentSectors = SecotrData.getSectorsNeeded(currentColumnLegnth);
      const newSectors = SecotrData.getSectorsNeeded(data.byteLength);
      if (currentSectors != newSectors) {
        const swapFilePath =
          SystemPath.getDirecoty(file.getPath()) +
          "/" +
          Date.now() +
          "-temp.dved";
        const oldPath = file.getPath();
        file.move(swapFilePath);
        //  file.reOpen();
        const swapFile = System.sync.createAndOpenFile(
          oldPath,
          RegionData.headByteSize
        );

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

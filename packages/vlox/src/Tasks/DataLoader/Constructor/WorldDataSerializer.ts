//types
import type { ColumnData } from "../../../Data/World/Classes/Column.js";
import type { LocationData } from "../../../Math";
//objects
import { RegionDataTool } from "../../../Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../../Tools/Data/WorldData/ChunkDataTool.js";
import { BinaryObject } from "@amodx/binary";

export class WorldDataSerializer {
  regions = new RegionDataTool();
  columns = new ColumnDataTool();
  chunks = new ChunkDataTool();

  serializeRegion(location: LocationData) {
    if (
      !this.regions
        .setDimension(location[0])
        .loadInAt(location[1], location[2], location[3])
    )
      return false;
    const region = this.regions.getRegion();
    const columnBuffers: [location: LocationData, buffer: ArrayBuffer][] = [];
    region.columns.forEach((column, index) => {
      this.columns.setColumn(column);
      const position = region.getColumnPosition(index);
      const columnLocation = [location[0], ...position] as LocationData;
      const columnBuffer = this.serializeColumn(columnLocation);
      if (columnBuffer) columnBuffers.push([[...columnLocation], columnBuffer]);
    });
    return columnBuffers;
  }

  serializeColumn(location: LocationData) {
    if (!this.columns.setLocation(location).loadIn()) return false;
    const column = this.columns.getColumn();
    const columnData = column.toJSON();
    const columnArray = BinaryObject.objectToBuffer(columnData);
    return columnArray;
  }

  deSerializeRegion(regionBuffers: ArrayBuffer[] | SharedArrayBuffer[]) {
    for (const buffer of regionBuffers) {
      this.deSerializeColumn(buffer);
    }
  }

  deSerializeColumn(columnBuffer: ArrayBuffer | SharedArrayBuffer): ColumnData {
    BinaryObject.setUseSharedMemory(true);
    const columnData = BinaryObject.bufferToObject(columnBuffer) as ColumnData;
    BinaryObject.setUseSharedMemory(false);
    return columnData;
  }

  _readDataIntoBuffer(
    offset: number,
    target: Uint8Array,
    source: ArrayBuffer | SharedArrayBuffer,
    sourceOffset = 0,
    sourceLength = -1
  ) {
    const bufferArray = new Uint8Array(
      source,
      sourceOffset,
      sourceLength == -1 ? source.byteLength : sourceLength
    );
    let i = bufferArray.length;
    while (i--) {
      target[i + offset] = bufferArray[i];
    }
    return bufferArray.length;
  }
}

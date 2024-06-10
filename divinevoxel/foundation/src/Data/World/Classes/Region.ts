import { RemoteBinaryStruct } from "@divinestar/binary/";
import { Column } from "./Column";
import {
  DVEMessageHeader,
  WorldDataHeaders,
} from "../../Constants/DataHeaders.js";
export interface RegionData {
  stateBuffer: ArrayBuffer;
  columns: Record<number, Column>;
}
export interface Region {}

export class Region {
  static CreateNew(): RegionData {
    const stateBuffer = new SharedArrayBuffer(Region.StateStruct.structSize);
    Region.StateStruct.setBuffer(stateBuffer);
    Region.StateStruct.setProperty("#dve_header", DVEMessageHeader);
    Region.StateStruct.setProperty("#dve_data_type", WorldDataHeaders.region);
    return {
      stateBuffer,
      columns: {},
    };
  }
  static toObject(data: RegionData) {
    return new Region(data);
  }
  static StateStruct = new RemoteBinaryStruct("region-tags");
  stateBuffer: ArrayBuffer;
  columns = new Map<number, Column>();
  regionState: DataView;
  constructor(data: RegionData) {
    this.regionState = new DataView(data.stateBuffer);
    this.stateBuffer = data.stateBuffer;
    const keys = Object.keys(data.columns);
    for (const key in keys) {
      data.columns[Number(key)] &&
        this.columns.set(Number(key), data.columns[Number(key)]);
    }
  }

  *getColumns(): Generator<Column> {
    for (const [key, column] of this.columns) {
      yield column;
    }
  }

  toJSON(): RegionData {
    const columns: Record<number, Column> = {};
    for (const [key, col] of this.columns) {
      columns[key] = col;
    }
    return {
      stateBuffer: this.stateBuffer,
      columns: columns,
    };
  }
}

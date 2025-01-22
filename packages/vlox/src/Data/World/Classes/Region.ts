import { RemoteBinaryStruct } from "@amodx/binary/";
import { Column } from "./Column";
import { WorldDataStructProperties } from "../../Structs/Constants/WorldDataStructProperties";
import { WorldSpaces } from "../../../Data/World/WorldSpaces";
import { Vec3Array } from "@amodx/math";

export interface RegionData {
  stateBuffer: ArrayBuffer;
  columns: Record<number, Column>;
}
export interface Region {}

export class Region {
  static CreateNew(): RegionData {
    const stateBuffer = new SharedArrayBuffer(Region.StateStruct.structSize);
    Region.StateStruct.setBuffer(stateBuffer);

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

  getPosition(): Vec3Array {
    Region.StateStruct.setBuffer(this.stateBuffer);
    return [
      Region.StateStruct.getProperty(WorldDataStructProperties.positionX),
      Region.StateStruct.getProperty(WorldDataStructProperties.positionY),
      Region.StateStruct.getProperty(WorldDataStructProperties.positionZ),
    ];
  }

  getColumnIndex(x: number, y: number, z: number): number {
    const position = this.getPosition();
    WorldSpaces.region.setXYZ(...position);
    return WorldSpaces.column.getIndexXYZ(x, y, z);
  }

  getColumnPosition(index: number): Vec3Array {
    const position = this.getPosition();
    WorldSpaces.region.setXYZ(...position);
    const columnPos = WorldSpaces.column.getPositionFromIndex(index);

    return [
      position[0] + columnPos.x,
      position[1] + columnPos.y,
      position[2] + columnPos.z,
    ];
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

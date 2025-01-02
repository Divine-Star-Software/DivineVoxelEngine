import { Vector3Like } from "@amodx/math";
import { ColumnCursor } from "./ColumnCursor";
import { WorldSpaces } from "../../World/WorldSpaces";
import { DataCursorInterface } from "../Interfaces/DataCursor.interface";

let cursorCache: ColumnCursor[] = [];

export class WorldCursor extends DataCursorInterface {
  columnCursors = new Map<number, Map<number, ColumnCursor>>();

  origin: Vector3Like = { x: 0, y: 0, z: 0 };
  dimension: string = "";

  setFocalPoint(dimension: string, x: number, y: number, z: number) {
    const columnPos = WorldSpaces.column.getPositionXYZ(x, y, z);

    for (const [cx, row] of this.columnCursors) {
      for (const [cz, col] of row) {
        cursorCache.push(col);
      }
    }

    this.columnCursors.clear();
    this.dimension = dimension;
    this.origin.x = columnPos.x / WorldSpaces.column._bounds.x;
    this.origin.y = columnPos.y / WorldSpaces.column._bounds.y;
    this.origin.z = columnPos.z / WorldSpaces.column._bounds.z;
  }

  getColumn(x: number, y: number, z: number) {
    const columnPos = WorldSpaces.column.getPositionXYZ(x, y, z);

    const cx = columnPos.x / WorldSpaces.column._bounds.x - this.origin.x;
    const cz = columnPos.z / WorldSpaces.column._bounds.z - this.origin.z;

    let row = this.columnCursors.get(cx);
    let cursor = row?.get(cz);

    if (!cursor) {
      cursor = cursorCache.length ? cursorCache.shift()! : new ColumnCursor();
      if (
        !cursor.setColumn(this.dimension, columnPos.x, columnPos.y, columnPos.z)
      )
        return null;

      if (!row) {
        row = new Map();
        this.columnCursors.set(cx, row);
      }
      row.set(cz, cursor);
    }
    return cursor;
  }

  getVoxel(x: number, y: number, z: number) {
    const section = this.getColumn(x, y, z);
    if (!section) return null;
    return section.getVoxel(x, y, z);
  }
}

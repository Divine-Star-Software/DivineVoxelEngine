import { Vector3Like } from "@amodx/math";
import { ColumnCursor } from "./ColumnCursor";
import { WorldSpaces } from "../../Data/World/WorldSpaces";

let cursorCache: ColumnCursor[] = [];
export class WorldCursor {
  columnCursors: ColumnCursor[][] = [];

  origin: Vector3Like = { x: 0, y: 0, z: 0 };
  dimension: string = "";

  setFocalPoint(dimension: string, x: number, y: number, z: number) {
    const columnPos = WorldSpaces.column.getPositionXYZ(x, y, z);
    for (const row of this.columnCursors) {
      for (const col of row) {
        cursorCache.push(col);
      }
    }
    this.columnCursors.length = 0;
    this.dimension = dimension;
    this.origin.x = columnPos.x / WorldSpaces.column._bounds.x;
    this.origin.y = columnPos.y / WorldSpaces.column._bounds.y;
    this.origin.z = columnPos.z / WorldSpaces.column._bounds.z;
  }

  getColumnCursor(x: number, y: number, z: number) {
    const columnPos = WorldSpaces.column.getPositionXYZ(x, y, z);

    const cx = columnPos.x / WorldSpaces.column._bounds.x - this.origin.x;
    const cz = columnPos.z / WorldSpaces.column._bounds.z - this.origin.z;

    let cursor = this.columnCursors[cx] && this.columnCursors[cx][cz];

    if (!cursor) {
      cursor = cursorCache.length ? cursorCache.shift()! : new ColumnCursor();
      cursor.setColumn(this.dimension, columnPos.x, columnPos.y, columnPos.z);
      this.columnCursors[cx] ??= [];
      this.columnCursors[cx][cz] = cursor;
    }
    return cursor;
  }
}

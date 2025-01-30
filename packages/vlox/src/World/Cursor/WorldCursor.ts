import { Vector3Like } from "@amodx/math";
import { SectorCursor } from "./SectorCursor";
import { WorldSpaces } from "../WorldSpaces";
import { DataCursorInterface } from "../../Data/Cursor/DataCursor.interface";
import { WorldBounds } from "../WorldBounds";

let cursorCache: SectorCursor[] = [];

const tempPosition = Vector3Like.Create();
export class WorldCursor extends DataCursorInterface {
  sectorCursors = new Map<number, Map<number, SectorCursor>>();

  origin: Vector3Like = { x: 0, y: 0, z: 0 };
  dimension: string = "";

  setFocalPoint(dimension: string, x: number, y: number, z: number) {
    const sectorPos = WorldSpaces.sector.getPosition(x, y, z, tempPosition);

    for (const [cx, row] of this.sectorCursors) {
      for (const [cz, col] of row) {
        cursorCache.push(col);
      }
    }

    this.sectorCursors.clear();
    this.dimension = dimension;
    this.origin.x = sectorPos.x / WorldSpaces.sector.bounds.x;
    this.origin.y = sectorPos.y / WorldSpaces.sector.bounds.y;
    this.origin.z = sectorPos.z / WorldSpaces.sector.bounds.z;
  }

  inBounds(x: number, y: number, z: number) {
    return WorldBounds.inBounds(x, y, z);
  }

  getSector(x: number, y: number, z: number) {
    const sectorPos = WorldSpaces.sector.getPosition(x, y, z, tempPosition);

    const cx = sectorPos.x / WorldSpaces.sector.bounds.x - this.origin.x;
    const cz = sectorPos.z / WorldSpaces.sector.bounds.z - this.origin.z;

    let row = this.sectorCursors.get(cx);
    let cursor = row?.get(cz);

    if (!cursor) {
      cursor = cursorCache.length ? cursorCache.shift()! : new SectorCursor();
      if (
        !cursor.setSector(this.dimension, sectorPos.x, sectorPos.y, sectorPos.z)
      )
        return null;

      if (!row) {
        row = new Map();
        this.sectorCursors.set(cx, row);
      }
      row.set(cz, cursor);
    }
    return cursor;
  }

  getVoxel(x: number, y: number, z: number) {
    const section = this.getSector(x, y, z);
    if (!section) return null;
    return section.getVoxel(x, y, z);
  }
}

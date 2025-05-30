import { Vector3Like } from "@amodx/math";
import { SectorCursor } from "./SectorCursor";
import { WorldSpaces } from "../WorldSpaces";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface";

let cursorCache: SectorCursor[] = [];

const tempPosition = Vector3Like.Create();
export class WorldCursor implements DataCursorInterface {
  sectorCursors: Record<number, Record<number, SectorCursor | null>> = {};

  origin = Vector3Like.Create();
  dimension = 0;

  _lastPosition = Vector3Like.Create();

  setFocalPoint(dimension: number, x: number, y: number, z: number) {
    const sectorPos = WorldSpaces.sector.getPosition(x, y, z, tempPosition);

    for (const row in this.sectorCursors) {
      for (const col in this.sectorCursors[row]) {
        const cursor = this.sectorCursors[row][col];
        if (!cursor) continue;
        cursorCache.push(cursor);
        this.sectorCursors[row][col] = null;
      }
    }

    this.dimension = dimension;
    this.origin.x = sectorPos.x / WorldSpaces.sector.bounds.x;
    this.origin.y = sectorPos.y / WorldSpaces.sector.bounds.y;
    this.origin.z = sectorPos.z / WorldSpaces.sector.bounds.z;

    this.getSector(x, y, z);
  }

  inBounds(x: number, y: number, z: number) {
    return WorldSpaces.world.inBounds(x, y, z);
  }

  getSector(x: number, y: number, z: number) {
    if (!this.inBounds(x, y, z)) return null;
    const sectorPos = WorldSpaces.sector.getPosition(x, y, z, tempPosition);

    const cx = sectorPos.x / WorldSpaces.sector.bounds.x - this.origin.x;
    const cz = sectorPos.z / WorldSpaces.sector.bounds.z - this.origin.z;

    let cursor = this.sectorCursors[cx]?.[cz];

    if (!cursor) {
      cursor = cursorCache.length ? cursorCache.shift()! : new SectorCursor();

      if (
        !cursor.loadSector(this.dimension, sectorPos.x, sectorPos.y, sectorPos.z)
      ) {
        cursorCache.push(cursor);
        return null;
      }

      if (!this.sectorCursors[cx]) {
        this.sectorCursors[cx] = {};
      }
      this.sectorCursors[cx][cz] = cursor;
    }
    return cursor;
  }

  getVoxel(x: number, y: number, z: number) {
    const sector = this.getSector(x, y, z);
    if (!sector) return null;
    return sector.getVoxel(x, y, z);
  }

  clone() {
    return new WorldCursor();
  }
}

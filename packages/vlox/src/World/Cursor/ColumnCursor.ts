import type { Chunk } from "../Chunk/index";
import type { Column } from "../Column/index";

import { WorldRegister } from "../WorldRegister";
import { WorldVoxelCursor } from "./WorldVoxelCursor";
import { WorldSpaces } from "../WorldSpaces";

import { Vector3Like } from "@amodx/math";
import { DataCursorInterface } from "../../Data/Cursor/DataCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";

export class ColumnCursor
  extends DataCursorInterface
  implements WorldSectionCursorInterface
{
  _current: Column | null = null;
  _chunk: Chunk | null;
  private voxel = new WorldVoxelCursor(this);
  _voxelIndex = 0;
  _voxelPosition = Vector3Like.Create();
  _columnPosition = Vector3Like.Create();

  inBounds(x: number, y: number, z: number): boolean {
    const maxX = this._columnPosition.x + WorldSpaces.column.bounds.x;
    const maxY = this._columnPosition.y + WorldSpaces.column.bounds.y;
    const maxZ = this._columnPosition.z + WorldSpaces.column.bounds.z;
    if (x < this._columnPosition.x) return false;
    if (y < this._columnPosition.y) return false;
    if (z < this._columnPosition.z) return false;
    if (x > maxX) return false;
    if (y > maxY) return false;
    if (z > maxZ) return false;
    return true;
  }

  setColumn(dimension: string, x: number, y: number, z: number) {
    WorldRegister.setDimension(dimension);
    const column = WorldRegister.column.get(x, y, z);
    if (!column) return false;
    this._current = column;
    this._columnPosition.x = column.position[0];
    this._columnPosition.y = column.position[1];
    this._columnPosition.z = column.position[2];
    return true;
  }

  getVoxel(x: number, y: number, z: number) {
    if (!this._current) return null;
    const chunk = this._current.chunks[WorldSpaces.chunk.getIndexXYZ(x, y, z)];
    if (!chunk) {
      this._chunk = null;
      return null;
    }
    const voxelIndex = WorldSpaces.voxel.getIndexXYZ(x, y, z);
    Vector3Like.Copy(
      this._voxelPosition,
      WorldSpaces.voxel.getPositionXYZ(x, y, z)
    );

    this._chunk = chunk;
    this._voxelIndex = voxelIndex;
    this.voxel.loadIn();
    return this.voxel;
  }
}

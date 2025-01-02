import { Chunk, Column } from "../../World/Classes";
import { WorldRegister } from "../../World/WorldRegister";
import { WorldVoxelCursor } from "./WorldVoxelCursor";
import { WorldSpaces } from "../../World/WorldSpaces";

import { Vector3Like } from "@amodx/math";
import { DataCursorInterface } from "../Interfaces/DataCursor.interface";
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

  setColumn(dimension: string, x: number, y: number, z: number) {
    WorldRegister.instance.setDimension(dimension);
    const column = WorldRegister.instance.column.get(x, y, z);
    if (!column) return false;
    this._current = column;
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

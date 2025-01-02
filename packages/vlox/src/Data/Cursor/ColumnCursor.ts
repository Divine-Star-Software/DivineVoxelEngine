import { Chunk, Column } from "../World/Classes";
import { WorldRegister } from "../World/WorldRegister";
import { VoxelCursor } from "./VoxelCursor";
import { WorldSpaces } from "../World/WorldSpaces";

import { Vector3Like } from "@amodx/math";

export class ColumnCursor {
  _current: Column | null = null;

  _chunk: Chunk | null;
  _voxelPosition = Vector3Like.Create();
  _voxelIndex = 0;

  voxel = new VoxelCursor(this);

  setColumn(dimension: string, x: number, y: number, z: number) {
    WorldRegister.instance.setDimension(dimension);
    const column = WorldRegister.instance.column.get(x, y, z);
    if (!column) return false;

    this._current = column;
  }

  loadIn(x: number, y: number, z: number) {
    if (!this._current) return false;
    const chunk = this._current.chunks[WorldSpaces.chunk.getIndexXYZ(x, y, z)];
    if (!chunk) {
      this._chunk = null;
      return false;
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

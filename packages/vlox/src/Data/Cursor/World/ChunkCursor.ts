import { Chunk, Column } from "../../World/Classes";
import { WorldRegister } from "../../World/WorldRegister";
import { WorldVoxelCursor } from "./WorldVoxelCursor";
import { WorldSpaces } from "../../World/WorldSpaces";

import { Vector3Like } from "@amodx/math";
import { DataCursorInterface } from "../Interfaces/DataCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";

export class ChunkCursor
  extends DataCursorInterface
  implements WorldSectionCursorInterface
{
  _chunk: Chunk | null;
  private voxel = new WorldVoxelCursor(this);
  _voxelIndex = 0;
  _voxelPosition = Vector3Like.Create();

  _chunkPosition = Vector3Like.Create();

  inBounds(x: number, y: number, z: number): boolean {
    const maxX = this._chunkPosition.x + WorldSpaces.chunk._bounds.x;
    const maxY = this._chunkPosition.y + WorldSpaces.chunk._bounds.y;
    const maxZ = this._chunkPosition.z + WorldSpaces.chunk._bounds.z;
    if (x < this._chunkPosition.x) return false;
    if (y < this._chunkPosition.y) return false;
    if (z < this._chunkPosition.z) return false;
    if (x > maxX) return false;
    if (y > maxY) return false;
    if (z > maxZ) return false;
    return true;
  }

  setChunk(chunk: Chunk): boolean;
  setChunk(dimension: string, x: number, y: number, z: number): boolean;
  setChunk(
    chunkOrDimension: string | Chunk,
    x?: number,
    y?: number,
    z?: number
  ) {
    if (typeof chunkOrDimension == "object") {
      this._chunk = chunkOrDimension;
      const chunkPos = this._chunk.getPosition();
      this._chunkPosition.x = chunkPos[0];
      this._chunkPosition.y = chunkPos[1];
      this._chunkPosition.z = chunkPos[2];
      return;
    }
    WorldRegister.instance.setDimension(chunkOrDimension);
    const chunk = WorldRegister.instance.chunk.get(x! || 0, y! || 0, z! || 0);
    if (!chunk) return false;
    this._chunk = chunk;
    const chunkPos = this._chunk.getPosition();
    this._chunkPosition.x = chunkPos[0];
    this._chunkPosition.y = chunkPos[1];
    this._chunkPosition.z = chunkPos[2];
    return true;
  }

  getVoxel(x: number, y: number, z: number) {
    if (!this._chunk) return null;
    const voxelIndex = WorldSpaces.voxel.getIndexXYZ(x, y, z);
    Vector3Like.Copy(
      this._voxelPosition,
      WorldSpaces.voxel.getPositionXYZ(x, y, z)
    );
    this._voxelIndex = voxelIndex;
    this.voxel.loadIn();
    return this.voxel;
  }
}

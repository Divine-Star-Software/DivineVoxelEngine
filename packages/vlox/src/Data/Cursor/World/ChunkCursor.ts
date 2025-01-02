import { Chunk, Column } from "../../World/Classes";
import { WorldRegister } from "../../World/WorldRegister";
import { WorldVoxelCursor } from "./WorldVoxelCursor";
import { WorldSpaces } from "../../World/WorldSpaces";

import { Vector3Like } from "@amodx/math";
import { DataCursorInterface } from "../Interfaces/DataCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";

export class ChunkCursor extends DataCursorInterface implements WorldSectionCursorInterface {
  _chunk: Chunk | null;
  private voxel = new WorldVoxelCursor(this);
  _voxelIndex = 0;
  _voxelPosition = Vector3Like.Create();


  setChunk(chunk:Chunk): boolean;
  setChunk(dimension: string, x:number,y:number,z:number): boolean;
  setChunk(dimension: string | Chunk, x?: number, y?: number, z?: number) {
    if(typeof dimension == "object") {
      this._chunk = dimension;
      return;
    }
    WorldRegister.instance.setDimension(dimension);
    const chunk = WorldRegister.instance.chunk.get(x! || 0, y! || 0, z! || 0);
    if (!chunk) return false;
    this._chunk = chunk;
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

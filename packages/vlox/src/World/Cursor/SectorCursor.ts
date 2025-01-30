import type { Section } from "../Section/index";
import type { Sector } from "../Sector/index";

import { WorldRegister } from "../WorldRegister";
import { WorldVoxelCursor } from "./WorldVoxelCursor";
import { WorldSpaces } from "../WorldSpaces";

import { Vector3Like } from "@amodx/math";
import { DataCursorInterface } from "../../Data/Cursor/DataCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";

export class SectorCursor
  extends DataCursorInterface
  implements WorldSectionCursorInterface
{
  _current: Sector | null = null;
  _section: Section | null;
  private voxel = new WorldVoxelCursor(this);
  _voxelIndex = 0;
  _voxelPosition = Vector3Like.Create();
  _sectorPosition = Vector3Like.Create();

  inBounds(x: number, y: number, z: number): boolean {
    const maxX = this._sectorPosition.x + WorldSpaces.sector.bounds.x;
    const maxY = this._sectorPosition.y + WorldSpaces.sector.bounds.y;
    const maxZ = this._sectorPosition.z + WorldSpaces.sector.bounds.z;
    if (x < this._sectorPosition.x) return false;
    if (y < this._sectorPosition.y) return false;
    if (z < this._sectorPosition.z) return false;
    if (x > maxX) return false;
    if (y > maxY) return false;
    if (z > maxZ) return false;
    return true;
  }

  setSector(dimension: string, x: number, y: number, z: number) {
    WorldRegister.setDimension(dimension);
    const sector = WorldRegister.sectors.get(x, y, z);
    if (!sector) return false;
    this._current = sector;
    this._sectorPosition.x = sector.position[0];
    this._sectorPosition.y = sector.position[1];
    this._sectorPosition.z = sector.position[2];
    return true;
  }

  getVoxel(x: number, y: number, z: number) {
    if (!this._current) return null;
    const section =
      this._current.sections[WorldSpaces.section.getIndex(x, y, z)];
    if (!section) {
      if (!section)
        throw new Error(
          `Could not load section at ${x}-${y}-${z} | ${WorldSpaces.section.getIndex(x, y, z)}`
        );
      this._section = null;
      return null;
    }
    this._section = section;
    this._voxelIndex = WorldSpaces.voxel.getIndex(x, y, z);
    WorldSpaces.voxel.getPosition(x, y, z, this._voxelPosition);
    this.voxel.loadIn();
    return this.voxel;
  }
}

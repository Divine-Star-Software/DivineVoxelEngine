import { WorldRegister } from "../WorldRegister";
import { WorldVoxelCursor } from "./WorldVoxelCursor";
import { WorldSpaces } from "../WorldSpaces";

import { Vector3Like } from "@amodx/math";
import { DataCursorInterface } from "../../Data/Cursor/DataCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";
import type { Section } from "../Section/index";

export class SectionCursor
  extends DataCursorInterface
  implements WorldSectionCursorInterface
{
  _section: Section | null;
  private voxel = new WorldVoxelCursor(this);
  _voxelIndex = 0;
  _voxelPosition = Vector3Like.Create();
  _sectionPosition = Vector3Like.Create();

  inBounds(x: number, y: number, z: number): boolean {
    const maxX = this._sectionPosition.x + WorldSpaces.section.bounds.x;
    const maxY = this._sectionPosition.y + WorldSpaces.section.bounds.y;
    const maxZ = this._sectionPosition.z + WorldSpaces.section.bounds.z;
    if (x < this._sectionPosition.x) return false;
    if (y < this._sectionPosition.y) return false;
    if (z < this._sectionPosition.z) return false;
    if (x > maxX) return false;
    if (y > maxY) return false;
    if (z > maxZ) return false;
    return true;
  }

  setSection(section: Section): boolean;
  setSection(dimension: string, x: number, y: number, z: number): boolean;
  setSection(
    sectionOrDimension: string | Section,
    x?: number,
    y?: number,
    z?: number
  ) {
    if (typeof sectionOrDimension == "object") {
      this._section = sectionOrDimension;
      const sectionPos = this._section.getPosition();
      this._sectionPosition.x = sectionPos[0];
      this._sectionPosition.y = sectionPos[1];
      this._sectionPosition.z = sectionPos[2];
      return;
    }
    WorldRegister.setDimension(sectionOrDimension);
    const sector = WorldRegister.sectors.get(x! || 0, y! || 0, z! || 0);
    if (!sector) return false;
    this._section = sector.getSection(y || 0);
    const sectionPos = this._section!.getPosition();
    this._sectionPosition.x = sectionPos[0];
    this._sectionPosition.y = sectionPos[1];
    this._sectionPosition.z = sectionPos[2];
    return true;
  }

  getVoxel(x: number, y: number, z: number) {
    if (!this._section) return null;
    this._voxelIndex = WorldSpaces.voxel.getIndex(x, y, z);
    WorldSpaces.voxel.getPosition(x, y, z, this._voxelPosition);
    this.voxel.loadIn();
    return this.voxel;
  }
}

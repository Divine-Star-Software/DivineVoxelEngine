import { Section } from "../Section/index";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";
export class WorldVoxelCursor extends VoxelCursorInterface {
  private _section: Section | null = null;

  ids: Uint16Array;
  light: Uint16Array;
  level: Uint8Array;
  secondary: Uint16Array;

  constructor(protected dataCursor: WorldSectionCursorInterface) {
    super();
  }

  loadIn() {
    if (!this.dataCursor._section) return;
    this._section = this.dataCursor._section;
    this.ids = this._section.ids;
    this.light = this._section.light;
    this.level = this._section.level;
    this.secondary = this._section.secondary;

    this._index = this.dataCursor._voxelIndex;
    this.process();
  }

  updateVoxel(mode: 0 | 1 | 2) {
    const voxelPos = this.dataCursor._voxelPosition;
    this.dataCursor._section?.setBuried(this.dataCursor._voxelIndex, false);
    if (mode == 0) {
      this.dataCursor._section?.sector.setStored(false);
      this.dataCursor._section?.setHasVoxel(voxelPos.y, true);
      return true;
    }
    if (mode == 1) {
      this.dataCursor._section?.sector.setStored(false);
      this.dataCursor._section?.setHasVoxelDirty(voxelPos.y, true);
      this.dataCursor._section?.setHasVoxel(voxelPos.y, false);
      return true;
    }
    return false;
  }
}

import { Section } from "../Section/index";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";
import { SectionStateDefaultFlags } from "../Section/SectionState";
export class WorldVoxelCursor extends VoxelCursorInterface {
  private _section: Section | null = null;

  ids = new Uint16Array(1);
  light = new Uint16Array(1);
  level = new Uint8Array(1);
  secondary = new Uint16Array(1);

  constructor(public dataCursor: WorldSectionCursorInterface) {
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
    this.dataCursor._section?.sector.setStored(false);
    this.dataCursor._section?.setBuried(this.dataCursor._voxelIndex, false);
    if (mode == 0) {
      if (this.doesVoxelAffectLogic()) {
        this.dataCursor._section?.setLogicDirty(true);
        this.dataCursor._section?.setLogicSliceDirty(voxelPos.y, true);
        this.dataCursor._section?.setVoxelLogicDirty(
          this.dataCursor._voxelIndex,
          true
        );
      }
      this.dataCursor._section?.setHasVoxel(voxelPos.y, true);
      return true;
    }
    if (mode == 1) {
      if (this.doesVoxelAffectLogic()) {
        this.dataCursor._section?.setLogicDirty(true);
        this.dataCursor._section?.setLogicSliceDirty(voxelPos.y, true);
        this.dataCursor._section?.setVoxelLogicDirty(
          this.dataCursor._voxelIndex,
          true
        );
      }
      this.dataCursor._section?.setHasVoxelDirty(voxelPos.y, true);
      this.dataCursor._section?.setHasVoxel(voxelPos.y, false);
      return true;
    }
    if (mode == 2) {
      if (this.doesVoxelAffectLogic()) {
        this.dataCursor._section?.setLogicDirty(true);
        this.dataCursor._section?.setLogicSliceDirty(voxelPos.y, true);
        this.dataCursor._section?.setVoxelLogicDirty(
          this.dataCursor._voxelIndex,
          true
        );
      }
    }
    return false;
  }
}

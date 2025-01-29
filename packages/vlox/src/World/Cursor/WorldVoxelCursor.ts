import { Section } from "../Section/index";
import { SectionStructProperties } from "../Section/SectionStructProperties";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";
export class WorldVoxelCursor extends VoxelCursorInterface {
  private _section: Section;

  get ids() {
    return this._section.ids;
  }
  get light() {
    return this._section.light;
  }
  get level() {
    return this._section.level;
  }
  get state() {
    return this._section.state;
  }
  get secondary() {
    return this._section.secondary;
  }
  get mod() {
    return this._section.mod;
  }

  constructor(public dataCursor: WorldSectionCursorInterface) {
    super();
  }

  loadIn() {
    if (!this.dataCursor._section) return;
    this._section = this.dataCursor._section;
    this._index = this.dataCursor._voxelIndex;
    this.process();
  }

  /**
   *
   * @param mode 0 for add 1 for remove
   * @param x
   * @param y
   * @param z
   * @returns
   */
  updateHeightMap(mode: 0 | 1) {
    Section.StateStruct.setData(this._section.sectionState);

    const voxelPos = this.dataCursor._voxelPosition;
    if (mode == 0) {
      Section.StateStruct.setArrayPropertyValue(
        SectionStructProperties.heightMap,
        voxelPos.y,
        1
      );
      return true;
    }
    if (mode == 1) {
      Section.StateStruct.setArrayPropertyValue(
        SectionStructProperties.dirtyMap,
        voxelPos.y,
        1
      );
      Section.StateStruct.setArrayPropertyValue(
        SectionStructProperties.heightMap,
        voxelPos.y,
        0
      );
      return true;
    }
    return false;
  }
}

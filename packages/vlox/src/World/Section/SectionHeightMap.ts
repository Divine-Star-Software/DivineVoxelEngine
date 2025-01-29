import { WorldSpaces } from "../WorldSpaces";
import { Section } from "./Section";
import { SectionStruct } from "./SectionStruct";
import { SectionStructProperties } from "./SectionStructProperties";

export class SectionHeightMap {
  private static _sectionState: ReturnType<
    typeof Section.StateStruct.instantiate<SectionStruct>
  >;
  
  static setSection(section: Section) {
    if (!this._sectionState)
      this._sectionState = Section.StateStruct.instantiate<SectionStruct>();
    this._sectionState.setData(section.sectionState);
    return this;
  }

  static setVoxel(y: number, hasVoxel: boolean) {
    this._sectionState[SectionStructProperties.heightMap][y] = hasVoxel ? 1 : 0;
  }
  static setDirty(y: number, dirty: boolean) {
    this._sectionState[SectionStructProperties.dirtyMap][y] = dirty ? 1 : 0;
  }

  static getMinMax() {
    let min = Infinity;
    let max = -Infinity;
    let i = WorldSpaces.section.bounds.y;
    while (i--) {
      if (
        this._sectionState[SectionStructProperties.heightMap][i] ||
        this._sectionState[SectionStructProperties.dirtyMap][i]
      ) {
        if (i < min) min = i;
        if (i > max) max = i;
      }
    }
    return [min, max];
  }
}

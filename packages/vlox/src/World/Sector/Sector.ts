import { Section, SectionData } from "../Section/Section.js";
import { Vec3Array } from "@amodx/math";
import { WorldSpaces } from "../WorldSpaces";
import {
  getBitArrayIndex,
  setBitArrayIndex,
} from "../../Util/Binary/BinaryArrays.js";
import { SectorState, SectorStateDefaultBitFlags } from "./SectorState.js";
import { forceMultipleOf2 } from "../../Util/Binary/BinaryFunctions.js";

export interface SectorData {
  buffer: ArrayBufferLike;
  /**Array of timestamps for the sector */
  timeStampArray: Uint32Array;
  /**Array of bit flags for the sector*/
  flagArray: Uint8Array;
  sections: SectionData[];
}
export interface Sector extends SectorData {}

export class Sector {
  static FlagIds = SectorState.Flags;
  static TimeStampIds = SectorState.TimeStamps;
  static GetHeaderSize() {
    return forceMultipleOf2(
      //12 bytes fot flags
      12 +
        //12 * 4 bytes for time stamps
        12 * 4
    );
  }
  static GetBufferSize() {
    const totalSections =
      WorldSpaces.sector.bounds.y / WorldSpaces.section.bounds.y;
    return this.GetHeaderSize() + Section.GetBufferSize() * totalSections;
  }
  static CreateNew(): SectorData {
    const buffer = new SharedArrayBuffer(this.GetBufferSize());
    const flagArray = new Uint8Array(buffer, 0, 12);
    const timeStampArray = new Uint32Array(buffer, 12, 12);
    const sections: SectionData[] = [];
    const totalSections = WorldSpaces.sector.sectionVolumne;

    for (let i = 0; i < totalSections; i++) {
      sections[i] = Section.CreateNew(i, buffer);
    }

    return {
      buffer,
      flagArray,
      timeStampArray,
      sections,
    };
  }

  sections: Section[] = [];
  bufferView: Uint8Array;

  constructor(
    data: SectorData,
    public position: Vec3Array
  ) {
    this.flagArray = data.flagArray;
    this.timeStampArray = data.timeStampArray;
    this.buffer = data.buffer;
    this.bufferView = new Uint8Array(data.buffer);
    for (let i = 0; i < data.sections.length; i++) {
      this.sections[i] = new Section(this, i, data.sections[i]);
    }
  }

  getSection(x: number, y: number, z: number) {
    return this.sections[WorldSpaces.section.getIndex(x, y, z)];
  }

  setBitFlag(index: number, value: boolean) {
    setBitArrayIndex(this.flagArray, index, value ? 1 : 0);
  }

  getBitFlag(index: number) {
    return getBitArrayIndex(this.flagArray, index) == 1;
  }

  isDisplayDirty() {
    return this.getBitFlag(SectorStateDefaultBitFlags.displayDirty);
  }

  setDisplayDirty(stored: boolean) {
    this.setBitFlag(SectorStateDefaultBitFlags.displayDirty, stored);
  }

  isLogicDirty() {
    return this.getBitFlag(SectorStateDefaultBitFlags.logicDirty);
  }

  setLogicDirty(stored: boolean) {
    this.setBitFlag(SectorStateDefaultBitFlags.logicDirty, stored);
  }


  setStored(stored: boolean) {
    this.setBitFlag(SectorStateDefaultBitFlags.stored, stored);
  }

  isStored() {
    return this.getBitFlag(SectorStateDefaultBitFlags.stored);
  }

  

  setTimeStamp(index: number, value: number) {
    this.timeStampArray[index] = value;
  }
  getTimeStamp(index: number) {
    return this.timeStampArray[index];
  }

  *getRenerableSections(): Generator<Section> {
    for (const section of this.sections) {
      const [min, max] = section.getMinMax();
      if (min == Infinity || max == -Infinity) continue;
      yield section;
    }
  }
  *getLogicDirtySections(): Generator<Section> {
    for (const section of this.sections) {
      const [min, max] = section.getLogicMinMax();
      if (min == Infinity || max == -Infinity) continue;
      yield section;
    }
  }

  anySectionDisplayDirty() {
    if (!this.isDisplayDirty()) return false;
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].isDisplayDirty() && !this.sections[i].isInProgress())
        return true;
    }
    this.setDisplayDirty(false);
    return false;
  }
  anySectionLogicDirty() {
    if (!this.isLogicDirty()) return false;
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].isLogicDirty() && !this.sections[i].isLogicUpdateInProgress())
        return true;
    }
    this.setLogicDirty(false);
    return false;
  }
  storeFlags() {
    const stored: Record<string, boolean> = {};
    for (const key in SectorState.StoredFlags) {
      stored[key] = this.getBitFlag(SectorState.StoredFlags[key]);
    }
    return stored;
  }
  loadFlags(flags: Record<string, boolean>) {
    for (const flag in flags) {
      const storedIndex = SectorState.StoredFlags[flag];
      if (storedIndex === undefined) {
        console.warn(`${flag} does not exist on stored flags for sector`);
        continue;
      }
      this.setBitFlag(storedIndex, flags[flag]);
    }
  }
  storeTimestamps() {
    const stored: Record<string, number> = {};
    for (const key in SectorState.StoredTimeStamps) {
      stored[key] = this.getTimeStamp(SectorState.StoredTimeStamps[key]);
    }
    return stored;
  }
  loadTimestamps(stored: Record<string, number>) {
    for (const timeStamp in stored) {
      const storedIndex = SectorState.StoredTimeStamps[timeStamp];
      if (storedIndex === undefined) {
        console.warn(
          `${timeStamp} does not exist on stored timestamps for sector`
        );
        continue;
      }
      this.setTimeStamp(storedIndex, stored[timeStamp]);
    }
  }
  toJSON(): SectorData {
    const sections: SectionData[] = [];
    for (const section of this.sections) {
      sections.push(section.toJSON());
    }
    return {
      buffer: this.buffer,
      flagArray: this.flagArray,
      timeStampArray: this.timeStampArray,
      sections,
    };
  }
}

import { Section, SectionData } from "../Section/Section.js";
import { Vec3Array } from "@amodx/math";
import { WorldSpaces } from "../WorldSpaces";
import {
  getBitArrayIndex,
  setBitArrayIndex,
} from "../../Util/Binary/BitArray.js";
import { SectorStateFlags, SectorTimestampFlags } from "./SectorState.js";
export interface SectorData {
  position: Vec3Array;
  buffer: ArrayBufferLike;
  /**Array of timestamps for the sector */
  timeStampArray: Uint32Array;
  /**Array of bit flags for the sector*/
  flagArray: Uint8Array;
  sections: SectionData[];
}
export interface Sector extends SectorData {}
function forceMultipleOf2(n: number): number {
  return n % 2 === 0 ? n : n + 1;
}
export class Sector {
  static FlagIds = SectorStateFlags;
  static TimeStampIds = SectorTimestampFlags;
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
    const timeStampArray = new Uint32Array(buffer, 12, 12 * 4);
    const sections: SectionData[] = [];
    const totalSections =
      WorldSpaces.sector.bounds.y / WorldSpaces.section.bounds.y;
    for (let i = 0; i < totalSections; i++) {
      sections[i] = Section.CreateNew(i, buffer);
    }

    return {
      position: [0, 0, 0],
      buffer,
      flagArray,
      timeStampArray,
      sections,
    };
  }

  sections: Section[] = [];
  bufferView: Uint8Array;

  constructor(data: SectorData) {
    this.position = data.position;
    this.flagArray = data.flagArray;
    this.timeStampArray = data.timeStampArray;
    this.buffer = data.buffer;
    this.bufferView = new Uint8Array(data.buffer);
    for (let i = 0; i < data.sections.length; i++) {
      this.sections[i] = new Section(this, i, data.sections[i]);
    }
  }

  getSection(y: number) {
    const ry = y - this.position[1];
    const index = ry / WorldSpaces.section.bounds.y;
    return this.sections[index];
  }

  setBitFlag(index: number, value: boolean) {
    setBitArrayIndex(this.flagArray, index, value ? 1 : 0);
  }

  getBitFlag(index: number) {
    return getBitArrayIndex(this.flagArray, index) == 1;
  }

  setTimeStamp(index: number, value: number) {
    this.timeStampArray[index] = value;
  }
  getTimeStamp(index: number) {
    return this.timeStampArray[index];
  }

  toJSON(): SectorData {
    const sections: SectionData[] = [];
    for (const section of this.sections) {
      sections.push(section.toJSON());
    }
    return {
      position: this.position,
      buffer: this.buffer,
      flagArray: this.flagArray,
      timeStampArray: this.timeStampArray,
      sections,
    };
  }
}

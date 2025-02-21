import { Section, SectionData } from "../Section/Section.js";
import { Vec3Array } from "@amodx/math";
import { WorldSpaces } from "../WorldSpaces";
import {
  getBitArrayIndex,
  getBitAtomicArrayIndex,
  setBitArrayIndex,
  setBitAtomicArrayIndex,
} from "../../Util/Binary/BinaryArrays.js";
import { SectorState, SectorStateDefaultBitFlags } from "./SectorState.js";
import { forceMultipleOf2,forceMultipleOf4 } from "../../Util/Binary/BinaryFunctions.js";
import { WorldRegister } from "../WorldRegister.js";

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
    return forceMultipleOf4(
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

  static CreateNewBuffer() {
    return new SharedArrayBuffer(this.GetBufferSize());
  }

  sections: Section[] = [];
  bufferView: Uint8Array;

  position: Vec3Array = [0, 0, 0];

  private _released = false;
  setReleased(released: boolean) {
    this._released = released;
  }
  isReleased() {
    return this._released;
  }

  setBuffer(buffer: ArrayBufferLike) {
    this.buffer = buffer;
    this.flagArray = new Uint8Array(buffer, 0, 12);
    this.timeStampArray = new Uint32Array(buffer, 12, 12);
    this.bufferView = new Uint8Array(buffer);
    const totalSections = WorldSpaces.sector.sectionVolumne;
    for (let i = 0; i < totalSections; i++) {
      this.sections[i] = WorldRegister._pools._sections.length
        ? WorldRegister._pools._sections.shift()!
        : new Section();

      this.sections[i].setBuffer(this, buffer, i);
    }
  }

  clear() {
    this.flagArray = null as any;
    this.timeStampArray = null as any;
    this.bufferView = null as any;
  }

  getSection(x: number, y: number, z: number) {
    return this.sections[WorldSpaces.section.getIndex(x, y, z)];
  }

  setBitFlag(index: number, value: boolean) {
    setBitAtomicArrayIndex(this.flagArray, index, value ? 1 : 0);
  }

  getBitFlag(index: number) {
    return getBitAtomicArrayIndex(this.flagArray, index) == 1;
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
}

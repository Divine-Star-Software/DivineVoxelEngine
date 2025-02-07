import { WorldSpaces } from "../WorldSpaces.js";
import { Sector } from "../Sector/Sector.js";
import { Vec3Array } from "@amodx/math";
import {
  getBitArrayIndex,
  setBitArrayIndex,
} from "../../Util/Binary/BinaryArrays.js";
import { VoxelDataArrays } from "Voxels/index.js";
import { SectionState, SectionStateDefaultFlags } from "./SectionState.js";
import { forceMultipleOf2 } from "../../Util/Binary/BinaryFunctions.js";

export interface SectionData extends VoxelDataArrays {
  /**Array of bit flags for the sector*/
  flagArray: Uint8Array;
  /**Y slice of the section to tell if there is voxels or not. Used for height maps. */
  voxelMap: Uint8Array;
  /**Y slice of the section to tell if the slice is dirty and voxelMap needs to be re-checked. */
  dirtyMap: Uint8Array;
  /**A bit array used to cache if a voxel is exposed or not. */
  buried: Uint8Array;
}
export interface Section extends SectionData {}

export class Section {
  static GetBufferSize() {
    const voxelSize = WorldSpaces.section.volumne;
    const height = WorldSpaces.section.bounds.y;
    return forceMultipleOf2(
      //----- state
      //2 bytes for flags
      2 +
        //voxelMap
        height / 8 +
        //dirtyMap
        height / 8 +
        //bureid
        voxelSize / 8 +
        //---- voxel data arrays
        //ids
        voxelSize * 2 +
        //light
        voxelSize * 2 +
        //level
        voxelSize +
        //state
        voxelSize * 2 +
        //mod
        voxelSize * 2 +
        //secondary
        voxelSize * 2
    );
  }
  static GetArrayStartIndex(index: number) {
    return index * Section.GetBufferSize() + Sector.GetHeaderSize();
  }

  static CreateNew(index: number, sectorBuffer: ArrayBufferLike): SectionData {
    const voxelSize = WorldSpaces.section.volumne;
    const height = WorldSpaces.section.bounds.y;
    let bufferStart = this.GetArrayStartIndex(index);

    const flagArray = new Uint8Array(sectorBuffer, bufferStart, 2);
    bufferStart += 2;
    const voxelMap = new Uint8Array(sectorBuffer, bufferStart, height / 8);
    bufferStart += height / 8;
    const dirtyMap = new Uint8Array(sectorBuffer, bufferStart, height / 8);
    bufferStart += height / 8;
    const buried = new Uint8Array(sectorBuffer, bufferStart, voxelSize / 8);
    bufferStart += voxelSize / 8;
    const ids = new Uint16Array(sectorBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;
    const light = new Uint16Array(sectorBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;
    const state = new Uint16Array(sectorBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;
    const mod = new Uint16Array(sectorBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;
    const secondary = new Uint16Array(sectorBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize * 2;
    const level = new Uint8Array(sectorBuffer, bufferStart, voxelSize);
    bufferStart += voxelSize;
    return {
      flagArray,
      voxelMap,
      dirtyMap,
      buried,
      ids,
      light,
      level,
      state,
      mod,
      secondary,
    };
  }

  static toObject(sector: Sector, index: number, data: SectionData) {
    return new Section(sector, index, data);
  }

  readonly position: Vec3Array;

  constructor(
    public sector: Sector,
    public index: number,
    data: SectionData
  ) {
    this.position = WorldSpaces.section.getPositionFromIndexVec3Array(
      this.index
    );
    this.position[0] =
      this.position[0] * WorldSpaces.section.bounds.x + this.sector.position[0];
    this.position[1] =
      this.position[1] * WorldSpaces.section.bounds.y + this.sector.position[1];
    this.position[2] =
      this.position[2] * WorldSpaces.section.bounds.z + this.sector.position[2];
    this.flagArray = data.flagArray;
    this.voxelMap = data.voxelMap;
    this.dirtyMap = data.dirtyMap;
    this.buried = data.buried;
    this.ids = data.ids;
    this.level = data.level;
    this.light = data.light;
    this.secondary = data.secondary;
    this.state = data.state;
    this.mod = data.mod;
  }

  getPosition(): Readonly<Vec3Array> {
    return this.position;
  }

  setBitFlag(index: number, value: boolean) {
    setBitArrayIndex(this.flagArray, index, value ? 1 : 0);
  }
  getBitFlag(index: number) {
    return getBitArrayIndex(this.flagArray, index) == 1;
  }

  isDirty() {
    return this.getBitFlag(SectionStateDefaultFlags.isDirty);
  }
  setDirty(dirty: boolean) {
    this.setBitFlag(SectionStateDefaultFlags.isDirty, dirty);
    if (dirty) this.sector.setStored(false);
  }

  isInProgress() {
    return this.getBitFlag(SectionStateDefaultFlags.inProgress);
  }
  setInProgress(inProgress: boolean) {
    this.setBitFlag(SectionStateDefaultFlags.inProgress, inProgress);
  }

  getBuried(index: number) {
    return getBitArrayIndex(this.buried, index) == 1;
  }
  setBuried(index: number, value: boolean) {
    return setBitArrayIndex(this.buried, index, value ? 1 : 0);
  }

  setHasVoxel(y: number, hasVoxel: boolean) {
    return setBitArrayIndex(this.voxelMap, y, hasVoxel ? 1 : 0);
  }
  getHasVoxel(y: number): boolean {
    return getBitArrayIndex(this.voxelMap, y) == 1;
  }
  setHasVoxelDirty(y: number, dirty: boolean) {
    return setBitArrayIndex(this.dirtyMap, y, dirty ? 1 : 0);
  }
  getHasVoxelDirty(y: number): boolean {
    return getBitArrayIndex(this.dirtyMap, y) == 1;
  }

  getMinMax() {
    let min = Infinity;
    let max = -Infinity;
    let i = WorldSpaces.section.bounds.y;
    while (i--) {
      if (this.getHasVoxel(i) || this.getHasVoxelDirty(i)) {
        if (i < min) min = i;
        if (i > max) max = i;
      }
    }
    return [min, max];
  }

  storeFlags() {
    const stored: Record<string, boolean> = {};
    for (const key in SectionState.StoredFlags) {
      stored[key] = this.getBitFlag(SectionState.StoredFlags[key]);
    }
    return stored;
  }
  loadFlags(flags: Record<string, boolean>) {
    for (const flag in flags) {
      const storedIndex = SectionState.StoredFlags[flag];
      if (storedIndex === undefined) {
        console.warn(`${flag} does not exist on stored flags for section`);
        continue;
      }
      this.setBitFlag(storedIndex, flags[flag]);
    }
  }
  toJSON(): SectionData {
    return {
      flagArray: this.flagArray,
      voxelMap: this.voxelMap,
      dirtyMap: this.dirtyMap,
      buried: this.buried,
      ids: this.ids,
      light: this.light,
      level: this.level,
      secondary: this.secondary,
      state: this.state,
      mod: this.mod,
    };
  }
}

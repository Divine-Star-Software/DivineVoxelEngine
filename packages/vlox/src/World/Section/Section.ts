import { WorldSpaces } from "../WorldSpaces.js";
import { Sector } from "../Sector/Sector.js";
import { Vec2Array, Vec3Array } from "@amodx/math";
import {
  getBitArrayIndex,
  getBitAtomicArrayIndex,
  setBitArrayIndex,
  setBitAtomicArrayIndex,
} from "../../Util/Binary/BinaryArrays.js";
import { VoxelDataArrays } from "../../Voxels/index.js";
import {
  SectionState,
  SectionStateDefaultFlags,
  SectionStateDefaultTicks,
} from "./SectionState.js";
import { forceMultipleOf4 } from "../../Util/Binary/BinaryFunctions.js";

export interface SectionData extends VoxelDataArrays {
  /**Array of bit ticks for the sector*/
  tickArray: Uint32Array;
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
const temp: Vec2Array = [0, 0];
export class Section {
  static GetBufferSize() {
    const voxelSize = WorldSpaces.section.volumne;
    const height = WorldSpaces.section.bounds.y;
    return forceMultipleOf4(
      //----- state
      //4 tick counters
      4 * 4 +
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
        //secondary
        voxelSize * 2
    );
  }
  static GetArrayStartIndex(index: number) {
    return index * Section.GetBufferSize() + Sector.GetHeaderSize();
  }

  position: Vec3Array = [0, 0, 0];
  readonly _Flags = SectionStateDefaultFlags;
  readonly _Ticks = SectionStateDefaultTicks;
  public index: number;
  public sector: Sector;

  view: Uint8Array;

  updatePosition() {
    const sector = this.sector;
    const index = this.index;
    this.position = WorldSpaces.section.getPositionFromIndexVec3Array(
      index,
      this.position
    );
    this.position[0] =
      this.position[0] * WorldSpaces.section.bounds.x + sector.position[0];
    this.position[1] =
      this.position[1] * WorldSpaces.section.bounds.y + sector.position[1];
    this.position[2] =
      this.position[2] * WorldSpaces.section.bounds.z + sector.position[2];
  }

  setBuffer(sector: Sector, buffer: ArrayBufferLike, index: number) {
    this.index = index;
    this.sector = sector;
    this.updatePosition();
    const voxelSize = WorldSpaces.section.volumne;
    const height = WorldSpaces.section.bounds.y;

    const startingIndex = Section.GetArrayStartIndex(index);
    this.view = new Uint8Array(buffer, startingIndex, Section.GetBufferSize());
    let bufferStart = startingIndex;

    this.tickArray = new Uint32Array(buffer, bufferStart, 4);
    bufferStart += 4 * Uint32Array.BYTES_PER_ELEMENT;

    this.flagArray = new Uint8Array(buffer, bufferStart, 2);
    bufferStart += 2;

    this.voxelMap = new Uint8Array(buffer, bufferStart, height / 8);
    bufferStart += height / 8;

    this.dirtyMap = new Uint8Array(buffer, bufferStart, height / 8);
    bufferStart += height / 8;

    this.buried = new Uint8Array(buffer, bufferStart, voxelSize / 8);
    bufferStart += voxelSize / 8;

    this.ids = new Uint16Array(buffer, bufferStart, voxelSize);
    bufferStart += voxelSize * Uint16Array.BYTES_PER_ELEMENT;

    this.light = new Uint16Array(buffer, bufferStart, voxelSize);
    bufferStart += voxelSize * Uint16Array.BYTES_PER_ELEMENT;

    this.secondary = new Uint16Array(buffer, bufferStart, voxelSize);
    bufferStart += voxelSize * Uint16Array.BYTES_PER_ELEMENT;

    this.level = new Uint8Array(buffer, bufferStart, voxelSize);
    bufferStart += voxelSize;
  }
  clear() {
    this.flagArray = null as any;
    this.voxelMap = null as any;
    this.dirtyMap = null as any;
    this.buried = null as any;

    this.ids = null as any;
    this.light = null as any;
    this.secondary = null as any;
    this.level = null as any;
  }

  getPosition(): Readonly<Vec3Array> {
    return this.position;
  }

  setBitFlag(index: number, value: boolean) {
    setBitAtomicArrayIndex(this.flagArray, index, value ? 1 : 0);
  }
  getBitFlag(index: number) {
    return getBitAtomicArrayIndex(this.flagArray, index) == 1;
  }

  isInProgress() {
    return this.getBitFlag(SectionStateDefaultFlags.inProgress);
  }
  setInProgress(inProgress: boolean) {
    this.setBitFlag(SectionStateDefaultFlags.inProgress, inProgress);
  }
  isLogicUpdateInProgress() {
    return this.getBitFlag(SectionStateDefaultFlags.logicUpdateInProgress);
  }
  setLogicUpdateInProgress(inProgress: boolean) {
    this.setBitFlag(SectionStateDefaultFlags.logicUpdateInProgress, inProgress);
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

  getTick(tick: number) {
    return this.tickArray[tick];
  }
  incrementTick(tick: number) {
    this.tickArray[tick]++;
  }

  canRender() {
    const [min, max] = this.getMinMax();
    return min !== Math.abs(Infinity) && max !== Math.abs(Infinity);
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
    temp[0] = min;
    temp[1] = max;
    return temp;
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
}

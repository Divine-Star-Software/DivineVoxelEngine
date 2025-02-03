import { RemoteBinaryStruct } from "@amodx/binary/";

import { WorldSpaces } from "../WorldSpaces.js";
import { Sector } from "../Sector/Sector.js";
import { Vec3Array } from "@amodx/math";
import {
  getBitArrayIndex,
  setBitArrayIndex,
} from "../../Util/Binary/BitArray.js";
export interface VoxelDataArrays {
  /**The runtime numeric voxel ids */
  ids: Uint16Array;
  /**The light data for voxels stored as 4 nibbles. 0 -> sun light 1 -> red light 2 -> green light 3 -> blue light */
  light: Uint16Array;
  /**The levels of the voxel. Used mainly for waterflow now. */
  level: Uint8Array;
  /**The state of the voxel. Used mainly be the voxel model system to get the model shape. */
  state: Uint16Array;
  /**The mod state of the voxel. Used mainly by the voxel model system to change model inputs. */
  mod: Uint16Array;
  /**The secondary state of the voxel. Can be set to a voxel id to make things like water logged voxels.
   * But the main voxel itself must not use state or mod because the secondary voxel will use the same state and mod.
   */
  secondary: Uint16Array;
}

export interface SectionData extends VoxelDataArrays {
  /**Y slice of the section to tell if there is voxels or not. Used for height maps. */
  voxelMap: Uint8Array;
  /**Y slice of the section to tell if the slice is dirty and voxelMap needs to be re-checked. */
  dirtyMap: Uint8Array;
  /**A bit array used to cache if a voxel is exposed or not. */
  buried: Uint8Array;
}
export interface Section extends SectionData {}

function forceMultipleOf2(n: number): number {
  return n % 2 === 0 ? n : n + 1;
}
const position: Vec3Array = [0, 0, 0];
export class Section {
  static GetBufferSize() {
    const voxelSize = WorldSpaces.section.volumne;
    const height = WorldSpaces.section.bounds.y;
    return forceMultipleOf2(
      //-----
      //voxelMap
      height / 8 +
        //dirtyMap
        height / 8 +
        //-----
        //cache
        voxelSize / 8 +
        //exposed
        voxelSize * 2 +
        //-----
        //voxel data

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
    let bufferStart = this.GetArrayStartIndex(index);
    const height = WorldSpaces.section.bounds.y;
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

  constructor(
    public sector: Sector,
    public index: number,
    data: SectionData
  ) {
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
    position[0] = this.sector.position[0];
    position[1] =
      this.sector.position[1] + this.index * WorldSpaces.section.bounds.y;
    position[2] = this.sector.position[2];
    return position;
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

  toJSON(): SectionData {
    return {
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

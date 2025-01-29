import { RemoteBinaryStruct } from "@amodx/binary/";

import { WorldSpaces } from "../WorldSpaces.js";
import { Sector } from "../Sector/Sector.js";
import { Vec3Array } from "@amodx/math";
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

export interface Section extends VoxelDataArrays {}
function forceMultipleOf2(n: number): number {
  return n % 2 === 0 ? n : n + 1;
}
const position: Vec3Array = [0, 0, 0];
export class Section {
  static GetBufferSize() {
    const voxelSize = WorldSpaces.section.getVolume();
    return forceMultipleOf2(
      forceMultipleOf2(Section.StateStruct.structSize) +
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
    return (
      index * Section.GetBufferSize() +
      Sector.GetHeaderSize() +
      forceMultipleOf2(Section.StateStruct.structSize)
    );
  }

  static CreateNew(
    index: number,
    sectorBuffer: ArrayBufferLike
  ): VoxelDataArrays {
    const voxelSize = WorldSpaces.section.getVolume();
    let bufferStart = this.GetArrayStartIndex(index);
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
      ids,
      light,
      level,
      state,
      mod,
      secondary,
    };
  }

  static toObject(sector: Sector, index: number, data: VoxelDataArrays) {
    return new Section(sector, index, data);
  }
  static StateStruct = new RemoteBinaryStruct("section-tags");
  sectionState: DataView;

  constructor(
    public sector: Sector,
    public index: number,
    data: VoxelDataArrays
  ) {
    this.sectionState = new DataView(
      sector.buffer,
      index * Section.GetBufferSize() + Sector.GetHeaderSize(),
      Section.StateStruct.structSize
    );
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

  serialize(): VoxelDataArrays {
    return {
      ids: this.ids,
      light: this.light,
      level: this.level,
      secondary: this.secondary,
      state: this.state,
      mod: this.mod,
    };
  }
}

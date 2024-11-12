import { RemoteBinaryStruct } from "@amodx/binary/";

import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
export interface VoxelDataArrays {
  ids: Uint16Array;
  light: Uint16Array;
  state: Uint16Array;
  secondary: Uint16Array;
  mod: Uint16Array;
}

export interface ChunkData extends VoxelDataArrays {
  stateBuffer: ArrayBuffer;
}

export interface Chunk extends ChunkData {}

export class Chunk {
  static CreateNew(): ChunkData {
    const stateBuffer = new SharedArrayBuffer(Chunk.StateStruct.structSize);
    Chunk.StateStruct.setBuffer(stateBuffer);

    const voxelSize = WorldSpaces.chunk.getVolume();

    const idsBuffers = new SharedArrayBuffer(voxelSize * 2);
    const ids = new Uint16Array(idsBuffers);

    const lightBuffers = new SharedArrayBuffer(voxelSize * 2);
    const light = new Uint16Array(lightBuffers);

    const stateBuffers = new SharedArrayBuffer(voxelSize * 2);
    const state = new Uint16Array(stateBuffers);

    const modBuffer = new SharedArrayBuffer(voxelSize * 2);
    const mod = new Uint16Array(modBuffer);

    const secondaryBuffers = new SharedArrayBuffer(voxelSize * 2);
    const secondary = new Uint16Array(secondaryBuffers);
    return {
      stateBuffer,
      ids,
      light,
      state,
      secondary,
      mod,
    };
  }


  static toObject(data: ChunkData) {
    return new Chunk(data);
  }
  static StateStruct = new RemoteBinaryStruct("chunk-tags");
  chunkState: DataView;

  constructor(data: ChunkData) {
    this.chunkState = new DataView(data.stateBuffer);
    return Object.assign(this, data);
  }

  serialize(): ChunkData {
    return {
      stateBuffer: this.stateBuffer,
      ids: this.ids,
      light: this.light,
      secondary: this.secondary,
      state: this.state,
      mod: this.mod,
    };
  }
}

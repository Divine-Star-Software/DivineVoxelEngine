import { RemoteTagManager } from "@divinestar/binary/";
import {
  DVEMessageHeader,
  WorldDataHeaders,
} from "../../Constants/DataHeaders.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
interface ChunkData {
  stateBuffer: ArrayBuffer;
  ids: Uint16Array;
  light: Uint16Array;
  state: Uint16Array;
  secondaryIds: Uint16Array;
}

export interface Chunk extends ChunkData {}

export class Chunk {
  static CreateNew() {
    const stateBuffer = new SharedArrayBuffer(Chunk.Tags.tagSize);
    Chunk.Tags.setBuffer(stateBuffer);
    Chunk.Tags.setTag("#dve_header", DVEMessageHeader);
    Chunk.Tags.setTag("#dve_data_type", WorldDataHeaders.chunk);
    const voxelSize = WorldSpaces.chunk.getVolume();
    const idsBuffers = new SharedArrayBuffer(voxelSize * 2);
    const ids = new Uint16Array(idsBuffers);
    const lightBuffers = new SharedArrayBuffer(voxelSize * 2);
    const light = new Uint16Array(lightBuffers);
    const stateBuffers = new SharedArrayBuffer(voxelSize * 2);
    const state = new Uint16Array(stateBuffers);
    const secondaryIdsBuffers = new SharedArrayBuffer(voxelSize * 2);
    const secondaryIds = new Uint16Array(secondaryIdsBuffers);
    return new Chunk({
      stateBuffer,
      ids,
      light,
      state,
      secondaryIds,
    });
  }
  static AddNew(data: ChunkData) {
    return new Chunk({
      ...data,
    });
  }
  static Tags = new RemoteTagManager("chunk-tags");
  chunkState: DataView;

  constructor(data: ChunkData) {
    this.chunkState = new DataView(data.stateBuffer);
    return Object.assign(this, data);
  }
}

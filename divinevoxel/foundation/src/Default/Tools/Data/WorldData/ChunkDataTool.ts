//objects
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";

import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { Chunk } from "../../../../Data/World/Classes/Chunk.js";
import { RawVoxelData } from "@divinevoxel/core";

export class ChunkDataTool extends EncodedPositionDataTool {
  struct = Chunk.StateStruct;

  constructor() {
    super();
  }

  _chunk: Chunk;

  loadIn() {
    WorldSpaces.chunk.updateLoaction(this.location);
    const chunk = WorldRegister.instance.chunk.get(this.location);
    if (!chunk) return false;

    this.struct.setBuffer(chunk.chunkState);
    this._c = chunk.chunkState;
    this._chunk = chunk;
    return true;
  }

  setChunk(chunk: Chunk) {
    this.struct.setBuffer(chunk.chunkState);
    this._c = chunk.chunkState;
    this._chunk = chunk;
    return this;
  }

  loadInRaw(index: number, raw: RawVoxelData) {
    raw[0] = this._chunk.ids[index];
    raw[1] = this._chunk.light[index];
    raw[2] = this._chunk.state[index];
    raw[3] = this._chunk.secondaryIds[index];
  }
  setRaw(index: number, raw: RawVoxelData) {
    this._chunk.ids[index] = raw[0];
    this._chunk.light[index] = raw[1];
    this._chunk.state[index] = raw[2];
    this._chunk.secondaryIds[index] = raw[3];
  }
}

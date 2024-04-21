//objects
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";

import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { Chunk } from "../../../../Data/World/Classes/Chunk.js";

export class ChunkDataTool extends EncodedPositionDataTool {
  tags = Chunk.Tags;

  constructor() {
    super();
  }

  _chunk: Chunk;

  loadIn() {
    WorldSpaces.chunk.updateLoaction(this.location);
    const chunk = WorldRegister.instance.chunk.get(this.location);
    if (!chunk) return false;

    this.tags.setBuffer(chunk.chunkState);
    this._c = chunk.chunkState;
    this._chunk = chunk;
    return true;
  }

  setChunk(chunk: Chunk) {
    this.tags.setBuffer(chunk.chunkState);
    this._c = chunk.chunkState;
    this._chunk = chunk;
    return this;
  }

  segments = {
    id: {
      get: (index: number) => {
        return this._chunk.ids[index];
      },
      set: (index: number, value: number) => {
        return (this._chunk.ids[index] = value);
      },
    },
    light: {
      get: (index: number) => {
        return this._chunk.light[index];
      },
      set: (index: number, value: number) => {
        return (this._chunk.light[index] = value);
      },
    },
    state: {
      get: (index: number) => {
        return this._chunk.state[index];
      },
      set: (index: number, value: number) => {
        return (this._chunk.state[index] = value);
      },
    },
    secondaryId: {
      get: (index: number) => {
        return this._chunk.secondaryIds[index];
      },
      set: (index: number, value: number) => {
        return (this._chunk.secondaryIds[index] = value);
      },
    },
  };
}

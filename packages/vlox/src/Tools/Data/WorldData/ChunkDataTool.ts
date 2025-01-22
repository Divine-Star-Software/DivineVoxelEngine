//objects
import { DataToolBase } from "../../Classes/DataToolBase.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";


import { Chunk } from "../../../Data/World/Classes/Chunk.js";
import { RawVoxelData } from "../../../VoxelData/Voxel.types.js";

export class ChunkDataTool extends DataToolBase {
  struct = Chunk.StateStruct;

  _chunk: Chunk;

  loadIn() {
    WorldRegister.instance.setDimension(this.dimension)
    const chunk = WorldRegister.instance.chunk.get(this.x,this.y,this.z);
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
    raw[3] = this._chunk.secondary[index];
    raw[4] = this._chunk.mod[index];
  }
  setRaw(index: number, raw: RawVoxelData) {
    this._chunk.ids[index] = raw[0];
    this._chunk.light[index] = raw[1];
    this._chunk.state[index] = raw[2];
    this._chunk.secondary[index] = raw[3];
    this._chunk.mod[index] = raw[4];
  }
}

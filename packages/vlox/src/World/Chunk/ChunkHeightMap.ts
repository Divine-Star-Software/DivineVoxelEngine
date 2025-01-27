import { WorldSpaces } from "../WorldSpaces";
import { Chunk } from "./Chunk";
import { ChunkStruct } from "./ChunkStruct";
import { ChunkStructProperties } from "./ChunkStructProperties";

export class ChunkHeightMap {
  private static _chunkState: ReturnType<
    typeof Chunk.StateStruct.instantiate<ChunkStruct>
  >;
  
  static setChunk(chunk: Chunk) {
    if (!this._chunkState)
      this._chunkState = Chunk.StateStruct.instantiate<ChunkStruct>();
    this._chunkState.setData(chunk.chunkState);
    return this;
  }

  static setVoxel(y: number, hasVoxel: boolean) {
    this._chunkState[ChunkStructProperties.heightMap][y] = hasVoxel ? 1 : 0;
  }
  static setDirty(y: number, dirty: boolean) {
    this._chunkState[ChunkStructProperties.dirtyMap][y] = dirty ? 1 : 0;
  }

  static getMinMax() {
    let min = Infinity;
    let max = -Infinity;
    let i = WorldSpaces.chunk.bounds.y;
    while (i--) {
      if (
        this._chunkState[ChunkStructProperties.heightMap][i] ||
        this._chunkState[ChunkStructProperties.dirtyMap][i]
      ) {
        if (i < min) min = i;
        if (i > max) max = i;
      }
    }
    return [min, max];
  }
}

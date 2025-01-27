import { Chunk } from "../Chunk/index";
import { ChunkStructProperties } from "../Chunk/ChunkStructProperties";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface";
import { WorldSectionCursorInterface } from "./WorldSectionCursor.interface";
export class WorldVoxelCursor extends VoxelCursorInterface {
  private _chunk: Chunk;

  get ids() {
    return this._chunk.ids;
  }
  get light() {
    return this._chunk.light;
  }
  get state() {
    return this._chunk.state;
  }
  get secondary() {
    return this._chunk.secondary;
  }
  get mod() {
    return this._chunk.mod;
  }

  constructor(public dataCursor: WorldSectionCursorInterface) {
    super();
  }

  loadIn() {
    if (!this.dataCursor._chunk) return;
    this._chunk = this.dataCursor._chunk;
    this._index = this.dataCursor._voxelIndex;
    this.process();
  }

  /**
   *
   * @param mode 0 for add 1 for remove
   * @param x
   * @param y
   * @param z
   * @returns
   */
  updateHeightMap(mode: 0 | 1) {
    Chunk.StateStruct.setData(this._chunk.chunkState);

    const voxelPos = this.dataCursor._voxelPosition;
    if (mode == 0) {
      Chunk.StateStruct.setArrayPropertyValue(
        ChunkStructProperties.heightMap,
        voxelPos.y,
        1
      );
      return true;
    }
    if (mode == 1) {
      Chunk.StateStruct.setArrayPropertyValue(
        ChunkStructProperties.dirtyMap,
        voxelPos.y,
        1
      );
      Chunk.StateStruct.setArrayPropertyValue(
        ChunkStructProperties.heightMap,
        voxelPos.y,
        0
      );
      return true;
    }
    return false;
  }
}

import { RemoteBinaryStruct } from "@amodx/binary/";
import { Chunk, ChunkData } from "./Chunk.js";
export interface ColumnData {
  stateBuffer: ArrayBufferLike;
  chunks: ChunkData[];
}
export interface Column extends ColumnData {}

export class Column {
  static StateStruct = new RemoteBinaryStruct("column-tags");
  static CreateNew(data: Partial<ColumnData>): ColumnData {
    const stateBuffer = new SharedArrayBuffer(Column.StateStruct.structSize);
    Column.StateStruct.setBuffer(stateBuffer);

    Column.StateStruct.setProperty("#dve_is_stored", 0);
    return {
      stateBuffer,
      chunks: [],
      ...data,
    };
  }
  static toObject(data: ColumnData) {
    return new Column(data);
  }
  chunks: Chunk[];
  columnState: DataView;

  constructor(data: ColumnData) {
    this.columnState = new DataView(data.stateBuffer);
    this.stateBuffer = data.stateBuffer;
    this.chunks = data.chunks.map((_) => _ && new Chunk(_));
  }


  toJSON(): ColumnData {
    return {
      stateBuffer: this.stateBuffer,
      chunks: this.chunks.map((_) => _.serialize()),
    };
  }
}

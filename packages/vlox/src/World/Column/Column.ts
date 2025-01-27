import { RemoteBinaryStruct } from "@amodx/binary/";
import { Chunk, ChunkData } from "../Chunk/Chunk.js";
import { Vec3Array } from "@amodx/math";
export interface ColumnData {
  position: Vec3Array;
  stateBuffer: ArrayBufferLike;
  chunks: ChunkData[];
}
export interface Column extends ColumnData {}

export class Column {
  static StateStruct = new RemoteBinaryStruct("column-tags");
  static CreateNew(data?: Partial<ColumnData>): ColumnData {
    const stateBuffer = new SharedArrayBuffer(Column.StateStruct.structSize);
    Column.StateStruct.setBuffer(stateBuffer);

    Column.StateStruct.setProperty("dve_is_stored", 0);
    return {
      position: data?.position ? data?.position : [0, 0, 0],
      stateBuffer,
      chunks: [],
      ...data,
    };
  }
  static toObject(data: ColumnData) {
    return new Column(data);
  }
  chunks: Chunk[] = [];
  columnState: DataView;
  position: Vec3Array;

  constructor(data: ColumnData) {
    this.position = data.position;
    this.columnState = new DataView(data.stateBuffer);
    this.stateBuffer = data.stateBuffer;
    for (let i = 0; i < data.chunks.length; i++) {
      this.chunks[i] = new Chunk(this, i, data.chunks[i]);
    }
  }

  toJSON(): ColumnData {
    return {
      position: this.position,
      stateBuffer: this.stateBuffer,
      chunks: this.chunks.map((_) => _.serialize()),
    };
  }
}

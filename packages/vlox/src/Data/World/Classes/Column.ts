import { RemoteBinaryStruct } from "@amodx/binary/";
import { Chunk, ChunkData } from "./Chunk.js";
import { LocationData } from "Math/index.js";
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

    Column.StateStruct.setProperty("dve_is_stored", 0);
    return {
      stateBuffer,
      chunks: [],
      ...data,
    };
  }
  static toObject(location: LocationData, data: ColumnData) {
    return new Column(location, data);
  }
  chunks: Chunk[] = [];
  columnState: DataView;

  constructor(
    public location: LocationData,
    data: ColumnData
  ) {
    this.columnState = new DataView(data.stateBuffer);
    this.stateBuffer = data.stateBuffer;
    for (let i = 0; i < data.chunks.length; i++) {
      this.chunks[i] = new Chunk(this, i, data.chunks[i]);
    }
  }

  toJSON(): ColumnData {
    return {
      stateBuffer: this.stateBuffer,
      chunks: this.chunks.map((_) => _.serialize()),
    };
  }
}

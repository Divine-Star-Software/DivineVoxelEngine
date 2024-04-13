import { RemoteTagManager } from "@divinestar/binary/";
import {
  DVEMessageHeader,
  WorldDataHeaders,
} from "../../Constants/DataHeaders.js";
import { Chunk } from "./Chunk.js";
interface ColumnData {
  stateBuffer: ArrayBuffer;
  chunks: Chunk[]
}
export interface Column extends ColumnData {}

export class Column {
  static Tags = new RemoteTagManager("column-tags");
  static CreateNew(data: Partial<ColumnData>) {
    const stateBuffer = new SharedArrayBuffer(Column.Tags.tagSize);
    Column.Tags.setBuffer(stateBuffer);
    Column.Tags.setTag("#dve_header", DVEMessageHeader);
    Column.Tags.setTag("#dve_data_type", WorldDataHeaders.column);
    return new Column({
      stateBuffer,
      chunks: [],
      ...data,
    });
  }
  static AddNew(data: ColumnData) {
    return new Column(
      {
        ...data
      }
    )
  }
  columnState: DataView;

  constructor(data: ColumnData) {
    this.columnState = new DataView(data.stateBuffer);
    return Object.assign(this, data);
  }
}

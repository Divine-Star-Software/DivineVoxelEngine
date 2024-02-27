import { RemoteTagManager } from "@divinestar/binary/";
import { Column } from "./Column";
import {
  DVEMessageHeader,
  WorldDataHeaders,
} from "../../Constants/DataHeaders.js";
interface RegionData {
  stateBuffer: ArrayBuffer;
  columns: Map<number, Column>;
}
export interface Region extends RegionData {}

export class Region {
  static CreateNew() {
    const stateBuffer = new SharedArrayBuffer(Region.Tags.tagSize);
    Region.Tags.setBuffer(stateBuffer);
    Region.Tags.setTag("#dve_header", DVEMessageHeader);
    Region.Tags.setTag("#dve_data_type", WorldDataHeaders.region);
    return new Region({
      stateBuffer,
      columns: new Map<number,Column>(),
    });
  }
  static AddNew(data: RegionData) {
    return new Region({
      ...data,
    });
  }
  static Tags = new RemoteTagManager("region-tags");
  regionState: DataView;
  constructor(data: RegionData) {
    this.regionState = new DataView(data.stateBuffer);
    return Object.assign(data, this);
  }

  *getColumns(): Generator<Column> {
    for (const [key, column] of this.columns) {
      yield column;
    }
  }
}

import { BinaryObject } from "@amodx/binary/";
import { RichColumnDataTool } from "./RichColumnDataTool.js";
import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { RichDataSegmentTool } from "../../../Tools/Classes/RichDataToolBase.js";
import { DivineVoxelEngineRichWorld as DVERW } from "../DivineVoxelEngineRichWorld.js";

export class RichDataTool extends RichDataSegmentTool {
  data: any;
  richColumn = new RichColumnDataTool();
  columnTool = new ColumnDataTool();
  loadIn() {
    const column = DVERW.instance.register.column.get(this.location);
    if (!column) return false;
    this.sceham = column.data;
    const segment = column.data[this.segment];
    if (!segment) return false;

    const data = segment[DVERW.instance.register.getKey(this.location)];
    if (!data) return false;
    this.data = data;
    return true;
  }

  setData<T = any>(data: T) {
    this.data = data;
    return this;
  }

  getData<T>(): T {
    return this.data;
  }

  delete() {
    const segment = this.getSegment();
    if (!segment) return false;
    delete segment[DVERW.instance.register.getKey(this.location)];
    this.data = null;
    const column = DVERW.instance.register.column.get(this.location);
    if (!column) return;
    let items = false;
    for (const segment in column.data) {
      const seg = column.data[segment];
      if (Object.keys(seg).length != 0) {
        items = true;
      }
    }
    if (!items) {
      DVERW.instance.register.column.remove(this.location);
      this.columnTool.loadInAtLocation(this.location);
      this.columnTool.setRichData(false);
    }
    return true;
  }

  commit() {
    const segment = this.getSegment();
    if (!segment) return false;
    segment[DVERW.instance.register.getKey(this.location)] = this.data;

    this.data = null;
    if (this.columnTool.loadInAtLocation(this.location)) {
      this.columnTool.markAsNotStored();
      this.columnTool.setRichData(true);
    }
    return true;
  }

  toBuffer() {
    if (!this.data) return false;
    return BinaryObject.objectToBuffer(this.data);
  }
}

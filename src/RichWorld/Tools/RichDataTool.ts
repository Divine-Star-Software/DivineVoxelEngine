import { RichDataRegister } from "../Register/RichDataRegister.js";
import { DBO } from "divine-binary-object";
import { RichDataSegmentTool } from "../../Tools/Classes/RichDataToolBase.js";
import { RichColumnDataTool } from "./RichColumnDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";

export class RichDataTool extends RichDataSegmentTool {
 data: any;
 static richColumn = new RichColumnDataTool();
 static columnTool = new ColumnDataTool();
 loadIn() {
  const column = RichDataRegister.column.get(this.location);
  if (!column) return false;
  this.sceham = column.data;
  const segment = column.data[this.segment];
  if (!segment) return false;

  const data = segment[RichDataRegister.getKey(this.location)];
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
  delete segment[RichDataRegister.getKey(this.location)];
  this.data = null;
  const column = RichDataRegister.column.get(this.location);
  if (!column) return;
  let items = false;
  for (const segment in column.data) {
   const seg = column.data[segment];
   if (Object.keys(seg).length != 0) {
    items = true;
   }
  }
  if (!items) {
   RichDataRegister.column.remove(this.location);
   RichDataTool.columnTool.loadInAtLocation(this.location);
   RichDataTool.columnTool.setRichData(false);
  }
  return true;
 }

 commit() {
  const segment = this.getSegment();
  if (!segment) return false;
  segment[RichDataRegister.getKey(this.location)] = this.data;

  this.data = null;
  if (RichDataTool.columnTool.loadInAtLocation(this.location)) {
   RichDataTool.columnTool.markAsNotStored();
   RichDataTool.columnTool.setRichData(true);
  }
  return true;
 }

 toBuffer() {
  if (!this.data) return false;
  return DBO.toBuffer(this.data);
 }
}

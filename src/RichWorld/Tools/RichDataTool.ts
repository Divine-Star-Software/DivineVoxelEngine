import { RichDataRegister } from "../Register/RichDataRegister.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { DBO } from "divine-binary-object";
import { RichDataToolBase } from "./Classes/RichDataToolBase.js";
import { RichColumnDataTool } from "./RichColumnDataTool.js";

export class RichDataTool extends RichDataToolBase {
 data: any;
 static columnTool = new RichColumnDataTool();
 loadIn() {
  if (RichDataTool.columnTool.loadInAtLocation(this.location)) {
   this.segment = RichDataTool.columnTool.segment;
   const segment = this.getSegment();
   if (!segment) return false;
   const key = WorldSpaces.voxel.getKeyLocation(this.location);
   const data = segment[key];
   if (!data) return false;
   this.data = data;
   return true;
  }

  return false;
 }

 create<T = any>(data: T) {
  this.data = data;
  if (!RichDataRegister.column.get(this.location)) {
   RichDataRegister.column.add(this.location);
  }
  this.loadIn();
  this.commit();
 }

 setData<T = any>(data: T) {
  this.data = data;
 }

 getData<T>(): T{
  return this.data;
 }

 commit() {
  const segment = this.getSegment();
  if (!segment) return false;
  segment[RichDataRegister.getKey(this.location)] = this.data;
  return true;
 }

 toBuffer() {
  if (!this.data) return false;
  return DBO.toBuffer(this.data);
 }
}

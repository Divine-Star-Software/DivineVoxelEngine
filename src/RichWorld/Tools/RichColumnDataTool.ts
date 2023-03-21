import { DBO } from "divine-binary-object";
import { RichDataRegister } from "../Register/RichDataRegister.js";
import { RichDataSegmentTool } from "../../Tools/Classes/RichDataToolBase.js";
import type { RichColumn } from "Meta/Data/RichWorldData.types.js";

export class RichColumnDataTool extends RichDataSegmentTool {
 column: RichColumn;
 loadIn() {
  let column = RichDataRegister.column.get(this.location);
  if (!column) {
   column = RichDataRegister.column.add(this.location);
  }

  this.sceham = column.data;
  this.column = column;
  return true;
 }

 toBuffer() {
  return DBO.objectToBuffer(this.sceham);
 }


}

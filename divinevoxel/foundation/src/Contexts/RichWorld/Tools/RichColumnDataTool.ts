import { DBO } from "@divinestar/binary/";
import { RichDataRegister } from "../Register/RichDataRegister.js";
import { RichColumn } from "../../../Data/Types/RichWorldData.types.js";
import { RichDataSegmentTool } from "../../../Default/Tools/Classes/RichDataToolBase.js";

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

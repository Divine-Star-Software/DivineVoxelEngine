import { BinaryObject } from "@divinestar/binary/";
import { RichColumn } from "../../../Data/Types/RichWorldData.types.js";
import { RichDataSegmentTool } from "../../../Default/Tools/Classes/RichDataToolBase.js";
import { DivineVoxelEngineRichWorld as DVERW } from "../DivineStarVoxelEngineRichWorld.js";
export class RichColumnDataTool extends RichDataSegmentTool {
  column: RichColumn;
  loadIn() {
    let column = DVERW.instance.register.column.get(this.location);
    if (!column) {
      column = DVERW.instance.register.column.add(this.location);
    }

    this.sceham = column.data;
    this.column = column;
    return true;
  }

  toBuffer() {
    return BinaryObject.objectToBuffer(this.sceham);
  }
}

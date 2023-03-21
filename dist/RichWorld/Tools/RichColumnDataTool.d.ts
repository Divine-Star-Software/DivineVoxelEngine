import { RichDataSegmentTool } from "../../Tools/Classes/RichDataToolBase.js";
import type { RichColumn } from "Meta/Data/RichWorldData.types.js";
export declare class RichColumnDataTool extends RichDataSegmentTool {
    column: RichColumn;
    loadIn(): boolean;
    toBuffer(): ArrayBuffer;
}

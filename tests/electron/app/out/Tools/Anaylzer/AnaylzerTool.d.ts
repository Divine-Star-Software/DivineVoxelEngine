import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
export declare class AnaylzerTool extends LocationBoundTool {
    static columnDataTool: ColumnDataTool;
    runUpdate(radius: number, onDone: Function): void;
}

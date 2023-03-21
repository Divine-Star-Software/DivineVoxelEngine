import { RichDataSegmentTool } from "../../Tools/Classes/RichDataToolBase.js";
import { RichColumnDataTool } from "./RichColumnDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
export declare class RichDataTool extends RichDataSegmentTool {
    data: any;
    static richColumn: RichColumnDataTool;
    static columnTool: ColumnDataTool;
    loadIn(): boolean;
    setData<T = any>(data: T): this;
    getData<T>(): T;
    delete(): boolean | undefined;
    commit(): boolean;
    toBuffer(): false | ArrayBuffer;
}

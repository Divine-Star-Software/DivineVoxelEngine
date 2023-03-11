import { RichDataToolBase } from "./Classes/RichDataToolBase.js";
import { RichColumnDataTool } from "./RichColumnDataTool.js";
export declare class RichDataTool extends RichDataToolBase {
    data: any;
    static columnTool: RichColumnDataTool;
    loadIn(): boolean;
    create<T = any>(data: T): void;
    setData<T = any>(data: T): void;
    getData<T>(): T;
    commit(): boolean;
    toBuffer(): false | ArrayBuffer;
}

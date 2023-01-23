import { RichDataToolBase } from "./Classes/RichDataToolBase.js";
import type { RichColumn } from "Meta/Data/RichWorldData.types.js";
export declare class RichColumnDataTool extends RichDataToolBase {
    column: RichColumn;
    loadIn(): boolean;
    toBuffer(): ArrayBuffer;
    create(): void;
}

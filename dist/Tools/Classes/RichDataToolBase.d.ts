import type { RichDataSchema } from "Meta/Data/RichWorldData.types";
import { DataToolBase } from "./DataToolBase.js";
export declare abstract class RichDataSegmentTool extends DataToolBase {
    sceham: RichDataSchema;
    segment: string;
    constructor();
    setSegment(segment: string): this;
    getSegment(): false | Record<string, any>;
    getAll(): false | RichDataSchema;
}

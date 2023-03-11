import type { RichDataSchema } from "Meta/Data/RichWorldData.types";
import { DataToolBase } from "Tools/Classes/DataToolBase";
export declare abstract class RichDataToolBase extends DataToolBase {
    sceham: RichDataSchema;
    segment: string;
    setSegment(segment: string): void;
    getSegment(): false | Record<string, any>;
    getAll(): false | RichDataSchema;
}

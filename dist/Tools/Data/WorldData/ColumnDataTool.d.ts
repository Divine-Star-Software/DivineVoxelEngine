import type { Column } from "Meta/Data/WorldData.types.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
export declare class ColumnDataTool extends EncodedPositionDataTool {
    tags: any;
    _column: Column;
    loadIn(): boolean;
    setColumn(column: Column): this;
    getColumn(): Column;
    getNumChunks(): number;
    getBufferSizeForWholeColumn(): any;
    isStored(): boolean;
    markAsNotStored(): this;
    markAsStored(): this;
    isPersistent(): boolean;
    setPersistence(value: boolean): void;
    isDirty(): boolean;
    setDirty(value: boolean): void;
    getLastSaveTimestamp(): any;
    setLastSaveTimestamp(): any;
    getLastAnalyzerUpdateTimestamp(): any;
    setLastAnalyzerUpdateTimestamp(): any;
}

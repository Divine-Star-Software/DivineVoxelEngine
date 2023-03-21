import type { Column } from "Meta/Data/WorldData.types.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
export declare class ColumnDataTool extends EncodedPositionDataTool {
    tags: import("divine-binary-tags").RemoteTagManager;
    _column: Column;
    loadIn(): boolean;
    setColumn(column: Column): this;
    getColumn(): Column;
    getNumChunks(): number;
    getBufferSizeForWholeColumn(): number;
    isStored(): boolean;
    markAsNotStored(): this;
    markAsStored(): this;
    isPersistent(): boolean;
    setPersistence(value: boolean): void;
    isDirty(): boolean;
    setDirty(value: boolean): void;
    getLastSaveTimestamp(): number;
    setLastSaveTimestamp(): boolean;
    getLastAnalyzerUpdateTimestamp(): number;
    setLastAnalyzerUpdateTimestamp(): boolean;
    hasRichData(): boolean;
    setRichData(value: boolean): void;
    hasEntityData(): boolean;
    setEntityData(value: boolean): void;
}

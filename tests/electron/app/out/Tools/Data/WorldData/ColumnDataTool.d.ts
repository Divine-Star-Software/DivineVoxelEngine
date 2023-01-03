import type { Column } from "Meta/Data/WorldData.types.js";
import { PositionBoundDataTool } from "../Classes/DataToolBase.js";
import { LocationData } from "Meta/Data/CommonTypes.js";
export declare class ColumnDataTool extends PositionBoundDataTool {
    tags: import("../../../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    _column: Column;
    loadIn(x: number, y: number, z: number): boolean;
    loadInAt(location: LocationData): boolean;
    setColumn(column: Column): this;
    getColumn(): Column;
    getNumChunks(): number;
    getBufferSizeForWholeColumn(): number;
    isStored(): boolean;
    markAsNotStored(): boolean;
    markAsStored(): boolean;
}

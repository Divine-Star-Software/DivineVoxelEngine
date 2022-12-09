import type { Column } from "Meta/Data/WorldData.types.js";
import { PositionBoundDataTool } from "./DataToolBase.js";
export declare class ColumnDataTool extends PositionBoundDataTool {
    tags: import("../../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    loadIn(x: number, y: number, z: number): boolean;
    setColumn(chunk: Column): this;
}

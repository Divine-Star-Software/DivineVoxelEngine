import type { Region } from "Meta/Data/WorldData.types.js";
import { PositionBoundDataTool } from "./DataToolBase.js";
export declare class RegionDataTool extends PositionBoundDataTool {
    tags: import("../../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    loadIn(x: number, y: number, z: number): boolean;
    setRegion(region: Region): this;
}

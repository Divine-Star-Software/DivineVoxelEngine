import type { Region } from "Meta/Data/WorldData.types.js";
import { PositionBoundDataTool } from "../Classes/DataToolBase.js";
export declare class RegionDataTool extends PositionBoundDataTool {
    tags: import("../../../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    _region: Region;
    loadIn(x: number, y: number, z: number): boolean;
    setRegion(region: Region): this;
    getRegion(): Region;
    getRegionDataCount(): {
        chunks: number;
        columns: number;
    };
}

import type { Region } from "Meta/Data/WorldData.types.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
export declare class RegionDataTool extends EncodedPositionDataTool {
    tags: import("../../../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    _region: Region;
    loadIn(): boolean;
    setRegion(region: Region): this;
    getRegion(): Region;
    getRegionDataCount(): {
        chunks: number;
        columns: number;
    };
}

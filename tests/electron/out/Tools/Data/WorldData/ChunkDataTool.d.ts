import type { ChunkData } from "Meta/Data/WorldData.types.js";
import { PositionBoundDataTool } from "../../Classes/DataToolBase.js";
export declare class ChunkDataTool extends PositionBoundDataTool {
    tags: import("../../../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    loadIn(): boolean;
    setChunk(chunk: ChunkData): this;
}

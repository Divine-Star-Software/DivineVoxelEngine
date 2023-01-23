import type { ChunkData } from "Meta/Data/WorldData.types.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
export declare class ChunkDataTool extends EncodedPositionDataTool {
    tags: import("../../../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
    loadIn(): boolean;
    setChunk(chunk: ChunkData): this;
}

import type { ChunkData } from "Meta/Data/WorldData.types.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
export declare class ChunkDataTool extends EncodedPositionDataTool {
    tags: import("divine-binary-tags").RemoteTagManager;
    constructor();
    loadIn(): boolean;
    setChunk(chunk: ChunkData): this;
    segments: {
        id: {
            _s: ChunkDataTool;
            get(index: number): number;
            set(index: number, value: number): number | void;
        };
        light: {
            _s: ChunkDataTool;
            get(index: number): number;
            set(index: number, value: number): number | void;
        };
        state: {
            _s: ChunkDataTool;
            get(index: number): number;
            set(index: number, value: number): number | void;
        };
        secondaryId: {
            _s: ChunkDataTool;
            get(index: number): number;
            set(index: number, value: number): number | void;
        };
    };
}

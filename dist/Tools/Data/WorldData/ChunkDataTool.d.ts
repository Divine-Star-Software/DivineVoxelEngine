import type { ChunkData } from "Meta/Data/WorldData.types.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
export declare class ChunkDataTool extends EncodedPositionDataTool {
    tags: any;
    constructor();
    loadIn(): boolean;
    setChunk(chunk: ChunkData): this;
    segments: {
        id: {
            _s: ChunkDataTool;
            get(index: number): any;
            set(index: number, value: number): any;
        };
        light: {
            _s: ChunkDataTool;
            get(index: number): any;
            set(index: number, value: number): any;
        };
        state: {
            _s: ChunkDataTool;
            get(index: number): any;
            set(index: number, value: number): any;
        };
        secondaryId: {
            _s: ChunkDataTool;
            get(index: number): any;
            set(index: number, value: number): any;
        };
    };
}

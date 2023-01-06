import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
export declare class BuilderTool extends LocationBoundTool {
    static _chunkTool: ChunkDataTool;
    data: {
        LOD: number;
    };
    setLOD(lod: number): this;
    buildChunk(): this;
    buildColumn(): this;
    removeColumn(): false | this;
    fillColumn(): this;
    removeColumnsOutsideRadius(radius: number): void;
}

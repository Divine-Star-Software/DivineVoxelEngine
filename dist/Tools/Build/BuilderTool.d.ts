import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
export declare class BuilderTool extends LocationBoundTool {
    static _chunkTool: ChunkDataTool;
    tasks: import("../../Tools/Tasks/TasksTool.js").TaskTool;
    data: {
        LOD: number;
    };
    setLOD(lod: number): this;
    buildChunk(): this;
    buildColumn(onDone?: (data: any) => void): this;
    removeColumn(): false | this;
    fillColumn(): this;
    removeColumnsOutsideRadius(radius: number): void;
}

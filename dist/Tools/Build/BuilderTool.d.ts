import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { TaskTool } from "../../Tools/Tasks/TasksTool.js";
export declare class BuilderTool extends LocationBoundTool {
    static _chunkTool: ChunkDataTool;
    tasks: TaskTool;
    data: {
        LOD: number;
    };
    setLOD(lod: number): this;
    clearAll(): void;
    buildChunk(runQueue?: boolean): this;
    buildColumn(onDone?: (data: any) => void): this;
    removeColumn(): false | this;
    fillColumn(): this;
    removeColumnsOutsideRadius(radius: number): void;
}

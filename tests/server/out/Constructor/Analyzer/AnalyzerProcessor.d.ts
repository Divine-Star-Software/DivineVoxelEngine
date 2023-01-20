import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
export declare const AnalyzerProcessor: {
    columnTool: ColumnDataTool;
    chunkTool: ChunkDataTool;
    goThroughColumn<T>(location: LocationData, run: (x: number, y: number, z: number, column: ColumnDataTool) => void): void;
};

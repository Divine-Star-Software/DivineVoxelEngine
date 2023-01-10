import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import type { UpdateTasksO } from "Meta/Tasks/Tasks.types.js";
export declare const AnalyzerProcessor: {
    anaylzeColumn(location: LocationData, options: {
        light?: boolean;
    }): {
        light: UpdateTasksO[];
    } | undefined;
};

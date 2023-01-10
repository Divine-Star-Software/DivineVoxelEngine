import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const Analyzer: {
    processor: {
        anaylzeColumn(location: LocationData, options: {
            light?: boolean | undefined;
        }): {
            light: import("../../Meta/Tasks/Tasks.types.js").UpdateTasksO[];
        } | undefined;
    };
    findAndRunLightUpdates(data: LocationData): void;
};

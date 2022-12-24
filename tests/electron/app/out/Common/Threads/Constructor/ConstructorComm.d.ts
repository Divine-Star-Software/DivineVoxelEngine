import { BuildTasks } from "Meta/Tasks/Tasks.types.js";
export declare const CCM: import("../../../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
    tasks: {
        build: {
            chunk: (data: BuildTasks) => number;
            column: (data: BuildTasks) => number;
            entity: (x: number, y: number, z: number, width: number, depth: number, height: number, composed: number, voxelData: Uint32Array[], voxelStateData: Uint32Array[]) => number;
            item: (data: any) => number;
        };
    };
};

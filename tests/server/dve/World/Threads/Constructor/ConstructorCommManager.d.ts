import { BuildTasks } from "Meta/Tasks/Tasks.types.js";
export declare const CCM: import("../../../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
    tasks: {
        build: {
            chunk: (data: BuildTasks) => number;
            entity: (x: number, y: number, z: number, width: number, depth: number, height: number, composed: number, voxelData: Uint32Array[], voxelStateData: Uint32Array[]) => number;
            item: (data: any) => number;
        };
        rgb: {
            update: (data: any) => number;
            remove: (data: any) => number;
        };
        worldSun: {
            fillWorldColumn: (data: any) => number;
            updateAtMaxY: (data: any) => number;
            floodAtMaxY: (data: any, threadNumber: number) => number;
        };
        sun: {
            update: (data: any) => number;
            remove: (data: any) => number;
        };
        flow: {
            update: (data: any) => number;
            remove: (data: any) => number;
        };
        worldGen: {
            generate: (data: any) => number;
        };
    };
};

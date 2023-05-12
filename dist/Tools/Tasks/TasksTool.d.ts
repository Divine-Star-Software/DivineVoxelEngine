import { BuildTasks, GenerateTasks, Priorities } from "Meta/Tasks/Tasks.types.js";
import { LocationData } from "voxelspaces";
import type { RawVoxelData } from "Meta/Data/Voxels/Voxel.types.js";
export type TaskRunModes = "async" | "sync";
export declare class TaskTool {
    _data: {
        dimension: string;
        queue: string;
    };
    _thread: string;
    _priority: Priorities;
    constructor();
    setPriority(priority: Priorities): this;
    setFocalPoint(location: LocationData): this;
    voxelUpdate: {
        update: {
            run: (location: LocationData, raw: RawVoxelData, onDone: (data: any) => void, mode?: TaskRunModes) => void;
        };
        erase: {
            run: (location: LocationData, onDone: (data: any) => void, mode?: TaskRunModes) => void;
        };
        paint: {
            run: (location: LocationData, raw: RawVoxelData, onDone: (data: any) => void, mode?: TaskRunModes) => void;
        };
    };
    build: {
        chunk: {
            deferred: {
                run: (buildTasks: BuildTasks, onDone: (data: any) => void) => void;
            };
            queued: {
                add: (location: LocationData) => void;
                run: (onDone: Function) => void;
                runAndAwait: () => Promise<void>;
            };
        };
        column: {
            queued: {};
            deferred: {
                run: (location: LocationData, onDone: (data: any) => void) => void;
            };
        };
    };
    explosion: {
        run: (location: LocationData, radius: number, onDone: (data: any) => void) => void;
    };
    anaylzer: {
        update: {
            run: (location: LocationData, onDone: (data: any) => void) => void;
        };
    };
    propagation: {
        deferred: {
            run: (location: LocationData, onDone: (data: any) => void) => void;
        };
        queued: {
            add: (location: LocationData) => void;
            run: (onDone: Function) => void;
            runAndAwait: () => Promise<void>;
        };
    };
    generate: {
        deferred: {
            run(location: LocationData, data: any, onDone: (data: any) => void): void;
        };
        queued: {
            add: (data: GenerateTasks) => void;
            run: (onDone: Function) => void;
            runAndAwait: () => Promise<void>;
        };
    };
    decorate: {
        deferred: {
            run: (location: LocationData, data: any, onDone: (data: any) => void) => void;
        };
        queued: {
            add: (data: GenerateTasks) => Promise<void>;
            run: (onDone: Function) => void;
            runAndAwait: () => Promise<void>;
        };
    };
    worldSun: {
        deferred: {
            run: (location: LocationData, onDone: (data: any) => void) => void;
        };
        queued: {
            add: (location: LocationData) => void;
            run: (onDone: Function) => void;
            runAndAwait: () => Promise<void>;
        };
    };
}

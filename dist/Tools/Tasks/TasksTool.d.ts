import { BuildTasks, GenerateTasks, Priorities } from "Meta/Tasks/Tasks.types.js";
import { LocationData } from "voxelspaces";
import type { RawVoxelData } from "Meta/Data/Voxels/Voxel.types.js";
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
            _s: TaskTool;
            run(location: LocationData, onDone: (data: any) => void): void;
        };
        erase: {
            _s: TaskTool;
            run(location: LocationData, onDone: (data: any) => void): void;
        };
        paint: {
            _s: TaskTool;
            run(location: LocationData, raw: RawVoxelData, onDone: (data: any) => void): void;
        };
    };
    build: {
        chunk: {
            deferred: {
                _s: TaskTool;
                run(buildTasks: BuildTasks, onDone: (data: any) => void): void;
            };
            queued: {
                _s: TaskTool;
                add(location: LocationData): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        column: {
            queued: {};
            deferred: {
                _s: TaskTool;
                run(location: LocationData, onDone: (data: any) => void): void;
            };
        };
    };
    explosion: {
        _s: TaskTool;
        run(location: LocationData, radius: number, onDone: (data: any) => void): void;
    };
    anaylzer: {
        update: {
            _s: TaskTool;
            run(location: LocationData, onDone: (data: any) => void): void;
        };
    };
    propagation: {
        deferred: {
            _s: TaskTool;
            run(location: LocationData, onDone: (data: any) => void): void;
        };
        queued: {
            _s: TaskTool;
            add(location: LocationData): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    generate: {
        deferred: {
            _s: TaskTool;
            run(location: LocationData, data: any, onDone: (data: any) => void): void;
        };
        queued: {
            _s: TaskTool;
            add(data: GenerateTasks): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    worldSun: {
        deferred: {
            _s: TaskTool;
            run(location: LocationData, onDone: (data: any) => void): void;
        };
        queued: {
            _s: TaskTool;
            add(location: LocationData): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
}
export declare const GetTasksTool: () => TaskTool;

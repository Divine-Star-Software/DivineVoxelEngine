import { BuildTasks, Priorities } from "Meta/Tasks/Tasks.types.js";
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
    generate: {
        async: {
            _s: TaskTool;
            add(x: number, y: number, z: number, data?: any): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
        deferred: {
            _s: TaskTool;
            run(x: number, y: number, z: number, data: any, onDone: (data: any) => void): void;
        };
    };
    voxelUpdate: {
        erase: {
            deferred: {
                _s: TaskTool;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
            async: {
                _s: TaskTool;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        paint: {
            deferred: {
                _s: TaskTool;
                run(x: number, y: number, z: number, raw: RawVoxelData, onDone: (data: any) => void): void;
            };
            async: {
                _s: TaskTool;
                add(x: number, y: number, z: number, raw: RawVoxelData): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
    };
    build: {
        chunk: {
            deferred: {
                _s: TaskTool;
                run(buildTasks: BuildTasks, onDone: (data: any) => void): void;
            };
            async: {
                _s: TaskTool;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        column: {
            async: {};
            deferred: {
                _s: TaskTool;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
        };
    };
    explosion: {
        run: {
            _s: TaskTool;
            add(x: number, y: number, z: number, radius: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    flow: {
        update: {
            _s: TaskTool;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
        remove: {
            _s: TaskTool;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    anaylzer: {
        propagation: {
            _s: TaskTool;
            run(x: number, y: number, z: number, onDone: (data: any) => void): void;
        };
        update: {
            _s: TaskTool;
            run(x: number, y: number, z: number, onDone: (data: any) => void): void;
        };
    };
    light: {
        rgb: {
            update: {
                _s: TaskTool;
                add(x: number, y: number, z: number, queue?: string | null): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: TaskTool;
                add(x: number, y: number, z: number, queue?: string | null): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        sun: {
            update: {
                _s: TaskTool;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: TaskTool;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        worldSun: {
            _s: TaskTool;
            deferred: {
                _s: TaskTool;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
            add(x: number, z: number, y?: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
}
export declare const GetTasksTool: () => TaskTool;

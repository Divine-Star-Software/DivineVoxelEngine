import { BuildTasks, Priorities } from "Meta/Tasks/Tasks.types.js";
import { RawVoxelData } from "Meta/index.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
declare class TasksBase {
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
            _s: TasksBase;
            add(x: number, y: number, z: number, data?: any): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
        deferred: {
            _s: TasksBase;
            run(x: number, y: number, z: number, data: any, onDone: (data: any) => void): void;
        };
    };
    voxelUpdate: {
        erase: {
            deferred: {
                _s: TasksBase;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
            async: {
                _s: TasksBase;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        paint: {
            deferred: {
                _s: TasksBase;
                run(x: number, y: number, z: number, raw: RawVoxelData, onDone: (data: any) => void): void;
            };
            async: {
                _s: TasksBase;
                add(x: number, y: number, z: number, raw: RawVoxelData): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
    };
    build: {
        chunk: {
            deferred: {
                _s: TasksBase;
                run(buildTasks: BuildTasks, onDone: (data: any) => void): void;
            };
            async: {
                _s: TasksBase;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        column: {
            async: {};
            deferred: {
                _s: TasksBase;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
        };
    };
    explosion: {
        run: {
            _s: TasksBase;
            add(x: number, y: number, z: number, radius: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    flow: {
        update: {
            _s: TasksBase;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
        remove: {
            _s: TasksBase;
            add(x: number, y: number, z: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
    anaylzer: {
        propagation: {
            _s: TasksBase;
            run(x: number, y: number, z: number, onDone: (data: any) => void): void;
        };
        update: {
            _s: TasksBase;
            run(x: number, y: number, z: number, onDone: (data: any) => void): void;
        };
    };
    light: {
        rgb: {
            update: {
                _s: TasksBase;
                add(x: number, y: number, z: number, queue?: string | null): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: TasksBase;
                add(x: number, y: number, z: number, queue?: string | null): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        sun: {
            update: {
                _s: TasksBase;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: TasksBase;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        worldSun: {
            _s: TasksBase;
            deferred: {
                _s: TasksBase;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
            add(x: number, z: number, y?: number): void;
            run(onDone: Function): void;
            runAndAwait(): Promise<void>;
        };
    };
}
export declare const TasksTool: () => TasksBase;
export {};

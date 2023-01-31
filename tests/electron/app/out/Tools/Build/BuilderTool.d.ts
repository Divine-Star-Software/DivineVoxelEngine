import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
export declare class BuilderTool extends LocationBoundTool {
    static _chunkTool: ChunkDataTool;
    tasks: {
        _data: {
            dimension: string;
            queue: string;
        };
        _thread: string;
        _priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
        setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
        setFocalPoint(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): any;
        generate: {
            async: {
                _s: any;
                add(x: number, y: number, z: number, data?: any): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            deferred: {
                _s: any;
                run(x: number, y: number, z: number, data: any, onDone: (data: any) => void): void;
            };
        };
        voxelUpdate: {
            erase: {
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
                async: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            paint: {
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, raw: import("../../Meta/index.js").RawVoxelData, onDone: (data: any) => void): void;
                };
                async: {
                    _s: any;
                    add(x: number, y: number, z: number, raw: import("../../Meta/index.js").RawVoxelData): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
        };
        build: {
            chunk: {
                deferred: {
                    _s: any;
                    run(buildTasks: import("../../Meta/Tasks/Tasks.types.js").BuildTasks, onDone: (data: any) => void): void;
                };
                async: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            column: {
                async: {};
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
            };
        };
        explosion: {
            run: {
                _s: any;
                add(x: number, y: number, z: number, radius: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        flow: {
            update: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        anaylzer: {
            propagation: {
                _s: any;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
            update: {
                _s: any;
                run(x: number, y: number, z: number, onDone: (data: any) => void): void;
            };
        };
        light: {
            rgb: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            sun: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            worldSun: {
                _s: any;
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
                add(x: number, z: number, y?: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
    };
    data: {
        LOD: number;
    };
    setLOD(lod: number): this;
    buildChunk(): this;
    buildColumn(onDone?: (data: any) => void): this;
    removeColumn(): false | this;
    fillColumn(): this;
    removeColumnsOutsideRadius(radius: number): void;
}

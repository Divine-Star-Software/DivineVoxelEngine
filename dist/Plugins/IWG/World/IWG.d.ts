import type { IWGData } from "./Types/IWG.types";
import type { Vec3Array } from "Math/Types/Math.types";
import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { BuilderTool } from "../../../Tools/Build/BuilderTool.js";
import { DataLoaderTool } from "../../../Tools/Data/DataLoaderTool.js";
import { AnaylzerTool } from "../../../Tools/Anaylzer/AnaylzerTool.js";
import { VisitedMap } from "../../../Global/Util/VisistedMap.js";
declare class IWGTasks {
    run: (x: number, y: number, z: number) => void;
    iwg: IWG;
    queue: [x: number, y: number, z: number][];
    map: VisitedMap;
    waitingFor: number;
    constructor(run: (x: number, y: number, z: number) => void, iwg: IWG);
    add(x: number, y: number, z: number): void;
    substact(): void;
    cancelAll(): void;
    runTasks(max?: number): void;
}
/**# Infinite World Generator
 *
 */
export declare class IWG {
    data: IWGData;
    _anaylzerDone: boolean;
    anaylzer: AnaylzerTool;
    columnTool: ColumnDataTool;
    nColumnTool: ColumnDataTool;
    builder: BuilderTool;
    dataLoader: DataLoaderTool;
    tasks: {
        _data: {
            dimension: string;
            queue: string;
        };
        _thread: string;
        _priority: import("../../../Meta/Tasks/Tasks.types").Priorities;
        setPriority(priority: import("../../../Meta/Tasks/Tasks.types").Priorities): any;
        setFocalPoint(location: import("../../../Libs/voxelSpaces/Types/VoxelSpaces.types").LocationData): any;
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
                    run(x: number, y: number, z: number, raw: import("../../../Meta/index").RawVoxelData, onDone: (data: any) => void): void;
                };
                async: {
                    _s: any;
                    add(x: number, y: number, z: number, raw: import("../../../Meta/index").RawVoxelData): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
        };
        build: {
            chunk: {
                deferred: {
                    _s: any;
                    run(buildTasks: import("../../../Meta/Tasks/Tasks.types").BuildTasks, onDone: (data: any) => void): void;
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
    dimension: string;
    _cachedPosition: Vec3Array;
    _inProgressMap: Map<string, boolean>;
    _searchQueue: number[][];
    _visitedMap: Map<string, boolean>;
    _activeColumns: Map<string, number[]>;
    _loadTaskss: IWGTasks;
    _generateTasks: IWGTasks;
    _worldSunTasks: IWGTasks;
    _propagationTasks: IWGTasks;
    _buildTasks: IWGTasks;
    _saveTasks: IWGTasks;
    _saveAndUnloadTasks: IWGTasks;
    constructor(data: IWGData);
    setDimension(id: string): void;
    saveUpdate(): void;
    _logTasks(): string;
    anaylzerUpdate(): void;
    tasksUpdate(): void;
    searchUpdate(): void;
}
export {};

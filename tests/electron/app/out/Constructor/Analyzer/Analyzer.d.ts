import type { UpdateTasksO } from "Meta/Tasks/Tasks.types.js";
export declare const Analyzer: {
    processor: {
        _flowChecnks: number[][];
        anaylzeColumn(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, options: {
            light?: boolean | undefined;
            flow?: boolean | undefined;
        }): {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "async" | "sync";
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: {
                            _map: Map<string, boolean>;
                            _getKey(x: number, y: number, z: number): string;
                            inMap(x: number, y: number, z: number): boolean;
                            add(x: number, y: number, z: number): void;
                            clear(): void;
                        };
                    };
                    rmeove: {
                        queue: number[][];
                        map: {
                            _map: Map<string, boolean>;
                            _getKey(x: number, y: number, z: number): string;
                            inMap(x: number, y: number, z: number): boolean;
                            add(x: number, y: number, z: number): void;
                            clear(): void;
                        };
                        noRemoveMap: {
                            _map: Map<string, boolean>;
                            _getKey(x: number, y: number, z: number): string;
                            inMap(x: number, y: number, z: number): boolean;
                            add(x: number, y: number, z: number): void;
                            clear(): void;
                        };
                    };
                };
                rgb: {
                    update: [x: number, y: number, z: number][];
                    rmeove: [x: number, y: number, z: number][];
                };
                sun: {
                    update: [x: number, y: number, z: number][];
                    rmeove: [x: number, y: number, z: number][];
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): null;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        } | undefined;
    };
    runWorldPropagation(data: UpdateTasksO): Promise<false | undefined>;
};

export declare const Propagation: {
    $INIT(): void;
    expolosion: {
        run(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: number;
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
                queue: [x: number, y: number, z: number][];
                map: {
                    _map: Map<string, boolean>;
                    _getKey(x: number, y: number, z: number): string;
                    inMap(x: number, y: number, z: number): boolean;
                    add(x: number, y: number, z: number): void;
                    clear(): void;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): number;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
    };
    flow: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
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
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): null;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
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
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): null;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
    };
    worldSun: {
        run(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                sun: [x: number, y: number, z: number][];
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): null;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
    };
    rgb: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
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
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
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
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
    };
    sun: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
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
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
            buildMode: "sync" | "async";
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
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
            setPriority(priority: import("../../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
            getOriginThread(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "sync" | "async"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
            runRebuildQueue(): any;
        }): void;
    };
};

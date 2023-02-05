export declare const Propagation: {
    expolosion: {
        run(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: number;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    rmeove: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    rmeove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    rmeove: number[];
                };
                queue: [x: number, y: number, z: number][];
                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): void;
    };
    flow: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    rmeove: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    rmeove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    rmeove: number[];
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): Promise<void>;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    rmeove: {
                        queue: number[][];
                        map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    rmeove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    rmeove: number[];
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): Promise<void>;
    };
    worldSun: {
        run(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                sun: number[];
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): void;
    };
    rgb: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    rmeove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    rmeove: number[];
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): void;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    rmeove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    rmeove: number[];
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): void;
    };
    sun: {
        update(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    rmeove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    rmeove: number[];
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): void;
        remove(tasks: {
            rebuildQueMap: Map<string, boolean>;
            comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
            priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            aSyncQueue: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../../Meta/Tasks/Tasks.types.js").PriorityTask<import("../../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    rmeove: number[];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    rmeove: number[];
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
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        }): void;
    };
};

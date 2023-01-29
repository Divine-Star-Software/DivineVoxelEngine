export declare const ExplosionManager: {
    runExplosion(tasks: {
        rebuildQueMap: Map<string, boolean>;
        comm: import("../../../Libs/ThreadComm/Comm/Comm.js").CommBase;
        priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities;
        LOD: number;
        syncQueue: import("../../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData[];
        buildMode: "async" | "sync";
        rebuildTasks: import("../../../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
        tasksType: string;
        origin: import("../../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
        data: number;
        buildQueue: string;
        originThread: string;
        queues: {
            flow: {
                update: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
                rmeove: {
                    queue: number[][];
                    map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                    noRemoveMap: import("../../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            rgb: {
                update: [x: number, y: number, z: number][];
                rmeove: [x: number, y: number, z: number][];
                map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
            };
            sun: {
                update: [x: number, y: number, z: number][];
                rmeove: [x: number, y: number, z: number][];
            };
            queue: [x: number, y: number, z: number][];
            map: import("../../../Global/Util/VisistedMap.js").VisitedMap;
        };
        start(): any;
        stop(): any;
        setPriority(priority: import("../../../Meta/Tasks/Tasks.types.js").Priorities): any;
        getData(): number;
        getOriginThread(): import("../../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
        getBuildQueue(): string;
        getOrigin(): import("../../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData;
        needsRebuild(): boolean;
        needsToUpdateOriginThread(): boolean;
        setBuldMode(mode: "async" | "sync"): any;
        addToRebuildQueue(x: number, y: number, z: number): boolean;
        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
        runRebuildQueue(): any;
    }): void;
};

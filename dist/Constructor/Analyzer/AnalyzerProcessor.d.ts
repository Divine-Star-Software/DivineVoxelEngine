import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
export declare const AnalyzerProcessor: {
    _flowChecnks: number[][];
    anaylzeColumn(location: LocationData, options: {
        light?: boolean;
        flow?: boolean;
    }): {
        rebuildQueMap: Map<string, boolean>;
        comm: import("../../Libs/ThreadComm/Comm/Comm.js").CommBase;
        priority: import("../../Meta/Tasks/Tasks.types.js").Priorities;
        LOD: number;
        syncQueue: [chunkX: number, chunkY: number, chunkZ: number][];
        buildMode: "async" | "sync";
        tasksType: string;
        origin: LocationData;
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
        getOriginThread(): LocationData;
        getBuildQueue(): string;
        getOrigin(): LocationData;
        needsRebuild(): boolean;
        needsToUpdateOriginThread(): boolean;
        setBuldMode(mode: "async" | "sync"): any;
        addToRebuildQueue(x: number, y: number, z: number): boolean;
        addNeighborsToRebuildQueue(x: number, y: number, z: number): any;
        runRebuildQueue(): any;
    } | undefined;
};

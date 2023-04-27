import type { Vec3Array } from "Math/index.js";
import { BrushTool } from "../../Tools/Brush/Brush.js";
import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
export declare class WorldGenBrush extends BrushTool {
    constructor();
    requestsId: "";
    tasks: {
        rebuildQueMap: Map<string, boolean>;
        comm: import("threadcomm").CommBase;
        priority: import("Meta/Tasks/Tasks.types.js").Priorities;
        LOD: number;
        syncQueue: import("voxelspaces").LocationData[];
        aSyncQueue: import("voxelspaces").LocationData[];
        buildMode: "async" | "sync";
        buildTasks: import("Meta/Tasks/Tasks.types.js").PriorityTask<import("Meta/Tasks/Tasks.types.js").BuildTasks>;
        rebuildTasks: import("Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
        tasksType: string;
        origin: import("voxelspaces").LocationData;
        data: null;
        buildQueue: string;
        originThread: string;
        queues: {
            flow: {
                update: {
                    queue: number[][];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
                remove: {
                    queue: number[][];
                    map: import("../../Global/Util/VisistedMap.js").VisitedMap;
                    noRemoveMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            rgb: {
                update: number[];
                remove: number[];
                map: import("../../Global/Util/VisistedMap.js").VisitedMap;
            };
            sun: {
                update: number[];
                remove: number[];
                updateMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
                remvoeMap: import("../../Global/Util/VisistedMap.js").VisitedMap;
            };
        };
        start(): any;
        stop(): any;
        setPriority(priority: import("Meta/Tasks/Tasks.types.js").Priorities): any;
        getData(): null;
        getOriginThread(): import("voxelspaces").LocationData;
        getBuildQueue(): string;
        getOrigin(): import("voxelspaces").LocationData;
        needsRebuild(): boolean;
        needsToUpdateOriginThread(): boolean;
        setBuldMode(mode: "async" | "sync"): any;
        addToRebuildQueue(x: number, y: number, z: number): boolean;
        addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
        runRebuildQueue(): any;
    };
    richData: RichDataTool;
    paint(): this;
    erease(): void;
    runUpdates(): void;
    worldAlloc(start: Vec3Array, end: Vec3Array): Promise<boolean>;
    worldDealloc(start: Vec3Array, end: Vec3Array): Promise<boolean>;
}

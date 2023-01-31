import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import type { AddToRebuildQueue, BuildTasks, Priorities, PriorityTask } from "Meta/Tasks/Tasks.types";
import type { CommBase } from "../../Libs/ThreadComm/Comm/Comm";
import { VisitedMap } from "../../Global/Util/VisistedMap.js";
declare type RebuildModes = "sync" | "async";
declare class Request<T, Q> {
    tasksType: string;
    origin: LocationData;
    data: T;
    buildQueue: string;
    originThread: string;
    queues: Q;
    rebuildQueMap: Map<string, boolean>;
    comm: CommBase;
    priority: Priorities;
    LOD: number;
    syncQueue: LocationData[];
    aSyncQueue: LocationData[];
    buildMode: RebuildModes;
    buildTasks: PriorityTask<BuildTasks>;
    rebuildTasks: AddToRebuildQueue;
    constructor(tasksType: string, origin: LocationData, data: T, buildQueue: string, originThread: string, queues: Q);
    start(): this;
    stop(): this;
    setPriority(priority: Priorities): this;
    getData(): T;
    getOriginThread(): LocationData;
    getBuildQueue(): string;
    getOrigin(): LocationData;
    needsRebuild(): boolean;
    needsToUpdateOriginThread(): boolean;
    setBuldMode(mode: RebuildModes): this;
    addToRebuildQueue(x: number, y: number, z: number): boolean;
    addNeighborsToRebuildQueue(x: number, y: number, z: number): false | this | undefined;
    runRebuildQueue(): this;
}
declare type Vec3Array = [x: number, y: number, z: number][];
declare type FlowVec3Array = number[][];
export declare const TasksRequest: {
    getLightUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): Request<any, {
        rgb: {
            update: number[];
            rmeove: number[];
            map: VisitedMap;
        };
        sun: {
            update: number[];
            rmeove: number[];
        };
    }>;
    getFlowUpdateRequest(origin: LocationData, buildQueue?: string, originThread?: string): Request<null, {
        flow: {
            update: {
                queue: FlowVec3Array;
                map: VisitedMap;
            };
            rmeove: {
                queue: FlowVec3Array;
                map: VisitedMap;
                noRemoveMap: VisitedMap;
            };
        };
        rgb: {
            update: number[];
            rmeove: number[];
            map: VisitedMap;
        };
        sun: {
            update: number[];
            rmeove: number[];
        };
    }>;
    getVoxelUpdateRequests(origin: LocationData, buildQueue?: string, originThread?: string): Request<null, {
        flow: {
            update: {
                queue: FlowVec3Array;
                map: VisitedMap;
            };
            rmeove: {
                queue: FlowVec3Array;
                map: VisitedMap;
                noRemoveMap: VisitedMap;
            };
        };
        rgb: {
            update: number[];
            rmeove: number[];
            map: VisitedMap;
        };
        sun: {
            update: number[];
            rmeove: number[];
        };
    }>;
    getWorldSunRequests(origin: LocationData, buildQueue?: string, originThread?: string): Request<null, {
        sun: number[];
    }>;
    getExplosionRequests(origin: LocationData, radius: number, buildQueue?: string, originThread?: string): Request<number, {
        flow: {
            update: {
                queue: FlowVec3Array;
                map: VisitedMap;
            };
            rmeove: {
                queue: FlowVec3Array;
                map: VisitedMap;
                noRemoveMap: VisitedMap;
            };
        };
        rgb: {
            update: number[];
            rmeove: number[];
            map: VisitedMap;
        };
        sun: {
            update: number[];
            rmeove: number[];
        };
        queue: Vec3Array;
        map: VisitedMap;
    }>;
};
export declare type ExplosionTaskRequests = ReturnType<typeof TasksRequest.getExplosionRequests>;
export declare type VoxelUpdateTaskRequest = ReturnType<typeof TasksRequest.getVoxelUpdateRequests>;
export declare type FlowTaskRequests = ReturnType<typeof TasksRequest.getFlowUpdateRequest>;
export declare type LightTaskRequest = ReturnType<typeof TasksRequest.getLightUpdateRequest>;
export declare type WorldSunTaskRequest = ReturnType<typeof TasksRequest.getWorldSunRequests>;
export {};

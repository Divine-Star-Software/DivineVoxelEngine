import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import { RawVoxelData } from "Meta/index";
export declare type Priorities = 0 | 1 | 2 | 3;
export declare type PriorityTask<T> = {
    data: T;
    priority: Priorities;
};
export declare type LightUpdateTask = [number, number, number];
export declare type WorldSunTask = [location: LocationData, originThread: string];
export declare type UpdateTasks = [
    location: LocationData,
    buildQueue: string,
    originThread: string
];
export declare type PaintTasks = [
    location: LocationData,
    raw: RawVoxelData,
    buildQueue: string,
    originThread: string
];
export declare type UpdateTasksO = [
    location: LocationData,
    buildQueue: string,
    originThread: string
];
export declare type AddToRebuildQueue = [
    location: LocationData,
    buildQueue: string,
    priority: Priorities
];
export declare type RunRebuildTasks = [buildQueue: string];
export declare type BuildTasks = [location: LocationData, LOD: number];
export declare type GenerateTasks = [location: LocationData, data: any];
export declare type ExplosionTasks = [
    location: LocationData,
    radius: number,
    buildQueue: string,
    originThread: string
];
export declare type LoadWorldDataTasks = [data: SharedArrayBuffer];
export declare type LoadRegionHeadertasks = [
    location: LocationData,
    data: SharedArrayBuffer
];
export declare type RequestLightUpdateQueueData = {
    rgb: {
        update: number[][];
        rmeove: number[][];
    };
    sun: {
        update: number[][];
        rmeove: number[][];
    };
};
export declare type RequestFlowUpdateQueueData = {
    flow: {
        update: number[][];
        rmeove: number[][];
    };
} & RequestLightUpdateQueueData;
export declare type RequestsVoxelUpdateQueuesData = {
    flow: {
        update: number[][];
        rmeove: number[][];
    };
} & RequestLightUpdateQueueData;

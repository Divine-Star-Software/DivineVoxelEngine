import { LocationData } from "Meta/Data/CommonTypes";
import { RawVoxelData } from "Meta/index";
export declare type LightUpdateTask = [number, number, number];
export declare type WorldSunTask = [
    dimension: string,
    x: number,
    z: number,
    y: number,
    originThread: string
];
export declare type UpdateTasksO = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    buildQueue: string,
    originThread: string
];
export declare type PaintTasks = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    raw: RawVoxelData,
    buildQueue: string,
    originThread: string
];
export declare type ReBuildTasks = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    buildQueue: string
];
export declare type RunRebuildTasks = [buildQueue: string];
export declare type BuildTasks = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    LOD: number
];
export declare type GenerateTasks = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    data: any
];
export declare type ExplosionTasks = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    radius: number,
    buildQueue: string,
    originThread: string
];
export declare type LoadWorldDataTasks = [data: SharedArrayBuffer];
export declare type LoadRegionHeadertasks = [
    location: LocationData,
    data: SharedArrayBuffer
];

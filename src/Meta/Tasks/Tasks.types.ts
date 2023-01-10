import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import { RawVoxelData } from "Meta/index";

export type Priorities = 0 | 1 | 2 | 3;
export type PriorityTask<T> = {
 data: T;
 priority: Priorities;
};

export type LightUpdateTask = [number, number, number];
export type WorldSunTask = [location: LocationData, originThread: string];
export type UpdateTasks = [
 location: LocationData,
 buildQueue: string,
 originThread: string
];
export type PaintTasks = [
 location: LocationData,
 raw: RawVoxelData,
 buildQueue: string,
 originThread: string
];

export type UpdateTasksO = [
 location: LocationData,
 buildQueue: string,
 originThread: string
];

export type AddToRebuildQueue = [
 location: LocationData,
 buildQueue: string,
 priority: Priorities
];

export type RunRebuildTasks = [buildQueue: string];

export type BuildTasks = [location: LocationData, LOD: number];

export type GenerateTasks = [location: LocationData, data: any];

export type ExplosionTasks = [
 location: LocationData,
 radius: number,
 buildQueue: string,
 originThread: string
];

export type LoadWorldDataTasks = [data: SharedArrayBuffer];

export type LoadRegionHeadertasks = [
 location: LocationData,
 data: SharedArrayBuffer
];

export type RequestLightUpdateQueueData = {
 rgb: {
  update: number[][];
  rmeove: number[][];
 };
 sun: {
  update: number[][];
  rmeove: number[][];
 };
};

export type RequestFlowUpdateQueueData = {
 flow: {
  update: number[][];
  rmeove: number[][];
 };
} & RequestLightUpdateQueueData;

export type RequestsVoxelUpdateQueuesData = {
 flow: {
  update: number[][];
  rmeove: number[][];
 };
} & RequestLightUpdateQueueData;

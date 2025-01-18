import type { LocationData } from "../Math/index.js";
import type { Vec3Array } from "@amodx/math";
import type { RawVoxelData } from "../Data/Types/VoxelData.types";
import { ChunkData, ColumnData, RegionData } from "Data/World/Classes";

export type Priorities = 0 | 1 | 2 | 3;
export type PriorityTask<T> = {
  data: T;
  priority: Priorities;
};

export type WorldLockTasks = [
  dimension: string,
  start: Vec3Array,
  end: Vec3Array
];

export type LightUpdateTask = [number, number, number];
export type WorldSunTask = [location: LocationData, originThread: string];
export type UpdateTasks = [
  location: LocationData,
  buildQueue: string,
  originThread: string
];
export type VoxelUpdateTasks = [
  location: LocationData,
  raw: RawVoxelData,
  buildQueue: string,
  originThread: string
];

export type AnaylzerTask = [
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

export type RunBuildQueue = [dimension: string, chunks: Vec3Array[]];

export type BuildTasks = [location: LocationData, LOD: number];

export type GenerateTasks = [location: LocationData, data: any];

export type ExplosionTasks = [
  location: LocationData,
  radius: number,
  buildQueue: string,
  originThread: string
];

export type LoadChunkDataTasks = [location: LocationData, chunk: ChunkData];

export type LoadColumnDataTasks = [location: LocationData, column: ColumnData];

export type LoadRegionDataTasks = [location: LocationData, region: RegionData];

export type LoadRegionHeadertasks = [
  location: LocationData,
  data: SharedArrayBuffer
];

export type GetRichDataTasks = [location: LocationData, segment: string];
export type SetRichDataTasks = [
  location: LocationData,
  segment: string,
  objectBuffer: ArrayBuffer
];

export type SetRichColumnTasks = [
  location: LocationData,
  objectBuffer: ArrayBuffer
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

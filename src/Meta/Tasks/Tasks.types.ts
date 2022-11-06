export type LightUpdateTask = [number, number, number];
export type WorldSunTask = [
 dimension: string,
 x: number,
 z: number,
 y: number,
 originThread: string
];
export type UpdateTasksO = [
 dimension: string,
 x: number,
 y: number,
 z: number,
 buildQueue: string,
 originThread: string
];
export type PaintTasks = [
 dimension: string,
 x: number,
 y: number,
 z: number,
 raw: number[],
 buildQueue: string,
 originThread: string
];
export type ReBuildTasks = [
 dimension: string | number,
 x: number,
 y: number,
 z: number,
 buildQueue: string
];
export type RunRebuildTasks = [buildQueue: string];

export type BuildTasks = [
 dimension: string | number,
 x: number,
 y: number,
 z: number,
 LOD: number
];

export type ExplosionTasks = [
 dimension: string,
 x: number,
 y: number,
 z: number,
 radius: number,
 buildQueue: string,
 originThread: string
];

export declare type LightUpdateTask = [number, number, number];
export declare type UpdateTasks = [
    dimension: string,
    x: number,
    y: number,
    z: number,
    buildQueue: string,
    originThread: string
];
export declare type ReBuildTasks = [
    dimension: string | number,
    x: number,
    y: number,
    z: number,
    buildQueue: string
];
export declare type RunRebuildTasks = [buildQueue: string];
export declare type BuildTasks = [
    dimension: string | number,
    x: number,
    y: number,
    z: number,
    LOD: number
];

export type LightUpdateTask = [number, number, number];

export type UpdateTasks = [
    dimension : string,
    x : number,
    y : number,
    z : number,
    buildQueue : string,
    originThread : string
]
export type BuildTasks = [
    dimension : string | number,
    x : number,
    y : number,
    z : number,
    LOD : number
]
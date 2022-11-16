export declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};
export declare type Vector2 = {
    x: number;
    z: number;
};
export declare type UV3Matrix = {
    u: number;
    v: number;
    index: number;
};
export declare type UV2Matrix = {
    u: number;
    v: number;
};
export declare type Light4Matrix = {
    s: number;
    r: number;
    g: number;
    b: number;
};
export declare type Light3Matrix = {
    r: number;
    g: number;
    b: number;
};
export declare type DirectionNames = "top" | "bottom" | "west" | "east" | "north" | "south";
export declare type MeshData = {
    positions: number[];
    indices: number[];
    colors: number[];
    uvs: number[];
};
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

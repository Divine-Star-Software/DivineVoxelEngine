export declare type UVCords = {
    start: number;
    end: number;
};
export declare type Rotations = 0 | 90 | 180 | 270 | 360;
export declare type Vertexes = 1 | 2 | 3 | 4;
export declare type DimenionsMatrix = {
    width: number;
    height: number;
    depth: number;
};
export declare type UVFunctionData = {
    uvs: number[];
    uv: number;
    width: UVCords;
    height: UVCords;
    flipped: boolean;
    rotoate: Rotations;
};

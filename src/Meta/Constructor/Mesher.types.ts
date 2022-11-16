export type UVCords = { start: number; end: number };
export type Rotations = 0 | 90 | 180 | 270 | 360;
export type Vertexes = 1 | 2 | 3 | 4;
export type DimenionsMatrix = { width: number; height: number; depth: number };

export type UVFunctionData = {
 uvs: number[];
 uv: number;
 width: UVCords;
 height: UVCords;
 flipped: boolean;
 rotoate: Rotations;
};


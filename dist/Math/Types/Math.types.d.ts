export type BoundsObject = {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
    minY: number;
    maxY: number;
};
export type Position3Matrix = {
    x: number;
    y: number;
    z: number;
};
export type Position2Matrix = {
    x: number;
    z: number;
};
export type Dimension2Matrix = {
    width: number;
    height: number;
};
export type Dimension3Matrix = {
    width: number;
    height: number;
    depth: number;
};
export type DimensionsVector3 = {
    w: number;
    h: number;
    d: number;
};
export type Dimension2DArray = [width: number, height: number];
export type Dimension3DArray = [width: number, height: number, depth: number];
export type Vec2Array = [x: number, y: number];
export type Vec3Array = [x: number, y: number, z: number];

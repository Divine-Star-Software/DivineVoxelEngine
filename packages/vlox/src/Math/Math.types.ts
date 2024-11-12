
export type BoundsObject = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  minY: number;
  maxY: number;
};

export type Size2D = { width: number; height: number };
export type Size3D = { width: number; height: number; depth: number };
export type VolumeDimensions = { w: number; h: number; d: number };

export type Dimension2DArray = [width: number, height: number];
export type Dimension3DArray = [width: number, height: number, depth: number];

export type CompassDirectionNames =
  | "north"
  | "south"
  | "east"
  | "west"
  | "north-west"
  | "north-east"
  | "south-west"
  | "south-east";

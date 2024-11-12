import { CompassDirectionNames } from "../Math/Math.types";

export type DirectionNames =
 | "up"
 | "down"
 | Exclude<
    CompassDirectionNames,
    "north-west" | "north-east" | "south-west" | "south-east"
   >;

export type RecursivePartial<T> = {
 [P in keyof T]?: RecursivePartial<T[P]>;
};

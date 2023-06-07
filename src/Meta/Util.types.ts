import { CompassDirectionNames } from "Math";

export type DirectionNames =
 | "top"
 | "bottom"
 | Exclude<
    CompassDirectionNames,
    "north-west" | "north-east" | "south-west" | "south-east"
   >;

export type RecursivePartial<T> = {
 [P in keyof T]?: RecursivePartial<T[P]>;
};

import type { DirectionNames } from "Meta/Util.types";

export const FaceMap: DirectionNames[] = [
 "top",
 "bottom",
 "east",
 "west",
 "south",
 "north",
];

export const FaceRecord: Record<DirectionNames, number> = {
 top: 0,
 bottom: 1,
 east: 2,
 west: 3,
 south: 4,
 north: 5,
};

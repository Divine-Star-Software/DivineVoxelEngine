import { Vec3Array } from "Math";
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

export const FaceNormals: Record<DirectionNames, Vec3Array> = {
 top: [0, 1, 0],
 bottom: [0, -1, 0],
 east: [1, 0, 0],
 west: [-1, 0, 0],
 south: [0, 0, -1],
 north: [0, 0, 1],
};

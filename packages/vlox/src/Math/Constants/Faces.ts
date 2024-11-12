import type { DirectionNames } from "Types/Util.types";
import type { CompassDirectionNames } from "Math/Math.types";
export const FaceMap: DirectionNames[] = [
 "up",
 "down",
 "east",
 "west",
 "south",
 "north",
];

export const FaceRecord: Record<DirectionNames, number> = {
 up: 0,
 down: 1,
 east: 2,
 west: 3,
 south: 4,
 north: 5,
};


export const FaceNormals: Record<DirectionNames|  CompassDirectionNames, number[]> = {
    up: [0, 1, 0],
    down: [0, -1, 0],
    east: [1, 0, 0],
    west: [-1, 0, 0],
    north: [0, 0, 1],
    south: [0, 0, -1],

    "north-east": [1,0,1],
    "north-west": [-1,0,1],
    "south-east": [1,0,-1],
    "south-west": [-1,0,-1],
  };
  

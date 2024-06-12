import { LocationData } from "Math/index.js";
import type { Vec3Array } from "../Math.types.js";
import { Distance3D } from "./Distance3d.js";
export function Vec3ArrayDistanceSort(origin: Vec3Array, array: Vec3Array[]) {
  return array.sort((a, b) => {
    const aDistance = Distance3D(
      a[0],
      a[1],
      a[2],
      origin[0],
      origin[1],
      origin[2]
    );
    const bDistance = Distance3D(
      b[0],
      b[1],
      b[2],
      origin[0],
      origin[1],
      origin[2]
    );
    return aDistance - bDistance;
  });
}
export function LocationDataDistanceSort(
  origin: LocationData,
  array: LocationData[]
) {
  return array.sort((a, b) => {
    const aDistance = Distance3D(
      a[1],
      a[2],
      a[3],
      origin[1],
      origin[2],
      origin[3]
    );
    const bDistance = Distance3D(
      b[1],
      b[2],
      b[3],
      origin[1],
      origin[2],
      origin[3]
    );
    return aDistance - bDistance;
  });
}

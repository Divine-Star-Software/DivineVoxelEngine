import type { LocationData } from "@divinestar/voxelspaces";
import { PixelEntityData, } from "./PixelEntityData.types";

export type CreatePixelEntityShapeTask = [location: LocationData];
export type CreatePixelEntityTask = [
  location: LocationData,
  data: PixelEntityData,
  forceRerender: boolean
];
export type CreatePixelEntityReturn = [
  id: string,
  matrixArray: ArrayBuffer,
  voxelDataArray: ArrayBuffer,
  faceDataArray: ArrayBuffer
];

export type DestroyPixelEntityTasks = [id: string];
export type DestroyPixelEntityTypeTasks = [id: string];

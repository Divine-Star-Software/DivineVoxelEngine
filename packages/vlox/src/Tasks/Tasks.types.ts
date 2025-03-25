import type { Vec3Array } from "@amodx/math";
import type { LocationData } from "../Math/index.js";
import type { RawVoxelData } from "../Voxels/Types/Voxel.types.js";
import { IVoxelTemplateData } from "../Templates/VoxelTemplates.types.js";
import { VoxelPathData } from "../Templates/Path/VoxelPath.types.js";

export type VoxelUpdateData = {
  /**An array of allowed areas to update in. If not set will be ignored.*/
  includedAreas?: [min: Vec3Array, max: Vec3Array][];
  /**An array of excluded areas to update in. If not set will be ignored.*/
  excludeAreas?: [min: Vec3Array, max: Vec3Array][];
  /**Define what happens when painting a voxel and must replace it. Default is destory which will replace the voxel. Keep will keep the current voxel and not update. */
  paintMode?: "keep" | "destory";
};

export type PaintVoxelTask = [
  location: LocationData,
  raw: RawVoxelData,
  datA: VoxelUpdateData,
];
export type PaintVoxelTemplateTask = [
  dimension: number,
  start: Vec3Array,
  templateData: IVoxelTemplateData<any>,
  data: VoxelUpdateData,
];
export type PaintVoxelPathTask = [
  dimension: number,
  start: Vec3Array,
  pathData: VoxelPathData,
  data: VoxelUpdateData,
];

export type EraseVoxelTask = [location: LocationData, data: VoxelUpdateData];
export type EraseVoxelTemplateTask = [
  dimension: number,
  start: Vec3Array,
  templateData: IVoxelTemplateData<any>,
  data: VoxelUpdateData,
];
export type EraseVoxelPathTask = [
  dimension: number,
  start: Vec3Array,
  pathData: VoxelPathData,
  data: VoxelUpdateData,
];

export type WorldLockTasks = [
  dimension: number,
  start: Vec3Array,
  end: Vec3Array,
];

export type ExplosionTasks = [location: LocationData, radius: number];

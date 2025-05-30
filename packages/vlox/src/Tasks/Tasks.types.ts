import type { Vec3Array } from "@amodx/math";
import type { LocationData } from "../Math/index.js";
import type { RawVoxelData } from "../Voxels/Types/Voxel.types.js";
import type { IVoxelTemplateData } from "../Templates/VoxelTemplates.types.js";
import type { VoxelPathData } from "../Templates/Path/VoxelPath.types.js";
import type { EraseVoxel } from "./Paint/Erase/EraseVoxel.js";
import type EraseVoxelTemplate from "./Paint/Erase/EraseVoxelTemplate.js";
import type EraseVoxelPath from "./Paint/Erase/EraseVoxelPath.js";
import { PaintVoxel } from "./Paint/Paint/PaintVoxel.js";
import PaintVoxelTemplate from "./Paint/Paint/PaintVoxelTemplate.js";

export type VoxelUpdateData = {
  /**An array of allowed areas to update in. If not set will be ignored.*/
  includedAreas?: [min: Vec3Array, max: Vec3Array][];
  /**An array of excluded areas to update in. If not set will be ignored.*/
  excludeAreas?: [min: Vec3Array, max: Vec3Array][];
  /**Define what happens when painting a voxel and must replace it. Default is destory which will replace the voxel. Keep will keep the current voxel and not update. */
  paintMode?: "keep" | "destory";
};

export type PaintVoxelTask = Parameters<typeof PaintVoxel>;
export type PaintVoxelTemplateTask = Parameters<typeof PaintVoxelTemplate>
export type PaintVoxelPathTask = [
  dimension: number,
  start: Vec3Array,
  pathData: VoxelPathData,
  data: VoxelUpdateData,
];

export type EraseVoxelTask = Parameters<typeof EraseVoxel>;
export type EraseVoxelTemplateTask = Parameters<typeof EraseVoxelTemplate>;
export type EraseVoxelPathTask = Parameters<typeof EraseVoxelPath>;

export type WorldLockTasks = [
  dimension: number,
  start: Vec3Array,
  end: Vec3Array,
];



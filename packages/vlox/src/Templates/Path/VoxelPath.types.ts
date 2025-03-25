import { Vec3Array } from "@amodx/math";
import { PaintVoxelData } from "../../Voxels";

export type VoxelPathSegmentData = {
  start: Vec3Array;
  end: Vec3Array;
  voxel: PaintVoxelData;
};

export type VoxelPathData = {
  segments: VoxelPathSegmentData[];
};

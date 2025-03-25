import { TypedEventTarget } from "../../Util/TypedEventTarget";
import { PaintVoxelData } from "../../Voxels/Types/PaintVoxelData";
import type { VoxelPathData, VoxelPathSegmentData } from "./VoxelPath.types";
import type { Vec3Array } from "@amodx/math";

export interface VoxelPathSegmentsEvents {
  updated: {};
}

export class VoxelPathSegment
  extends TypedEventTarget<VoxelPathSegmentsEvents>
  implements VoxelPathSegmentData
{
  static CreateNew(data: Partial<VoxelPathSegmentData>): VoxelPathSegmentData {
    return {
      start: data.start ? data.start : [0, 0, 0],
      end: data.end ? data.end : [0, 0, 0],
      voxel: data.voxel ? data.voxel : PaintVoxelData.Create(),
    };
  }
  start: Vec3Array;
  end: Vec3Array;
  voxel: PaintVoxelData;
  constructor(data: VoxelPathSegmentData) {
    super();
    this.start = data.start;
    this.end = data.end;
    this.voxel = data.voxel;
  }

  setPoints(
    sx: number,
    sy: number,
    sz: number,
    ex: number,
    ey: number,
    ez: number
  ): void;
  setPoints(start: Vec3Array, end: Vec3Array): void;
  setPoints(
    sxOrStart: number | Vec3Array,
    syOrEnd: number | Vec3Array,
    sz: number = 0,
    ex: number = 0,
    ey: number = 0,
    ez: number = 0
  ) {
    let sx = 0;
    let sy = 0;
    if (Array.isArray(sxOrStart)) {
      const [x, y, z] = sxOrStart;
      sx = x;
      sy = y;
      sz = z;
    }
    if (Array.isArray(syOrEnd)) {
      const [x, y, z] = syOrEnd;
      ex = x;
      ey = y;
      ez = z;
    }
    let updated = false;
    if (this.start[0] != sx || this.start[1] != sy || this.start[2] != sz) {
      updated = true;
    }
    this.start[0] = sx;
    this.start[1] = sy;
    this.start[2] = sz;

    if (this.end[0] != ex || this.end[1] != ey || this.end[2] != ez) {
      updated = true;
    }
    this.end[0] = ex;
    this.end[1] = ey;
    this.end[2] = ez;
    if (updated) {
      this.dispatch("updated", {});
    }
  }

  toJSON(): VoxelPathSegmentData {
    return {
      start: [...this.start],
      end: [...this.end],
      voxel: { ...this.voxel },
    };
  }
}

export interface VoxelPathEvents {
  segmentAdded: VoxelPathSegment;
  segmentRemoved: VoxelPathSegment;
}

export class VoxelPath extends TypedEventTarget<VoxelPathEvents> {
  static CreateNew(data: Partial<VoxelPathData>): VoxelPathData {
    return {
      segments: data.segments ? data.segments : [],
    };
  }
  segments: VoxelPathSegment[] = [];

  constructor(public data: VoxelPathData) {
    super();
    for (let i = 0; i < data.segments.length; i++) {
      this.segments.push(new VoxelPathSegment(data.segments[i]));
    }
  }

  addSegment(data: VoxelPathSegmentData) {
    const segment = new VoxelPathSegment(data);
    this.segments.push(segment);
    this.dispatch("segmentAdded", segment);
    return true;
  }

  removeSegment(segment: VoxelPathSegment) {
    for (let i = 0; i < this.segments.length; i++) {
      if (this.segments[i] == segment) {
        this.segments.splice(i, 1);
        this.dispatch("segmentRemoved", segment);
        return true;
      }
    }
    return false;
  }

  toJSON(): VoxelPathData {
    const segments: VoxelPathSegmentData[] = [];
    for (let i = 0; i < this.segments.length; i++) {
      segments.push(this.segments[i].toJSON());
    }
    return {
      segments,
    };
  }
}

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
  constructor(
    public path: VoxelPath,
    public index: number,
    data: VoxelPathSegmentData
  ) {
    super();
    this.start = data.start;
    this.end = data.end;
    this.voxel = data.voxel;
  }

  setPoints([sx, sy, sz]: Vec3Array, [ex, ey, ez]: Vec3Array): void {
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

  getPoint(point: 0 | 1) {
    if (point == 0) return this.start;
    if (point == 1) return this.end;
    throw new Error(`Point must be 0 or 1 get ${point}`);
  }

  setPoint(point: 0 | 1, vec: Vec3Array) {
    if (point == 0) {
      return this.setPoints(vec, this.end);
    }
    if (point == 1) {
      return this.setPoints(this.start, vec);
    }
    throw new Error(`Point must be 0 or 1 get ${point}`);
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
      this.segments.push(new VoxelPathSegment(this, i, data.segments[i]));
    }
  }

  addSegment(data: VoxelPathSegmentData) {
    const segment = new VoxelPathSegment(this, this.segments.length, data);
    this.segments.push(segment);
    this.dispatch("segmentAdded", segment);
    return true;
  }

  removeSegment(segment: VoxelPathSegment) {
    for (let i = this.segments.length - 1; i > -1; i--) {
      this.segments[i].index--;
      if (this.segments[i] == segment) {
        this.segments.splice(i, 1);
        break;
      }
    }
    this.dispatch("segmentRemoved", segment);
    return false;
  }

  removePoint(segmentIndex: number, pointIndex: 0 | 1) {
    if (!this.segments.length) return false;
    if (!this.segments[segmentIndex]) return false;
    if (segmentIndex > 0) {
      const segment = this.segments[segmentIndex];
      const previousSegment = this.segments.at(segmentIndex - 1)!;

      if (pointIndex == 0) {
        previousSegment.setPoints(previousSegment.start, segment.end);
      }
      if (pointIndex == 1) {
        previousSegment.setPoints(previousSegment.start, segment.start);
      }

      this.removeSegment(segment);
    } else {
      this.removeSegment(this.segments[0]);
    }
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

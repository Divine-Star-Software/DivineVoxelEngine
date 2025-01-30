import { Vector3Like } from "@amodx/math";

export class Mesh {
  indicieIndex = 0;
  minBounds = Vector3Like.Create(Infinity, Infinity, Infinity);
  maxBounds = Vector3Like.Create(-Infinity, -Infinity, -Infinity);

  readonly buffer: number[] = [];
  readonly indices: number[] = [];

  constructor(public buildBVH?: boolean) {}

  clear() {
    this.buffer.length = 0;
    this.indices.length = 0;
    this.indicieIndex = 0;

    this.minBounds.x = Infinity;
    this.minBounds.y = Infinity;
    this.minBounds.z = Infinity;
    this.maxBounds.x = -Infinity;
    this.maxBounds.y = -Infinity;
    this.maxBounds.z = -Infinity;
  }
}

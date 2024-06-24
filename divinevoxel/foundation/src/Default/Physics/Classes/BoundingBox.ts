import type { Vector3Like, Vec3Array } from "@amodx/math";
import { Vector3 } from "@divinevoxel/core/Math/Classes/Vector3.js";
export class BoundingBox {
  bounds = {
    minX: Infinity,
    maxX: -Infinity,
    minZ: Infinity,
    maxZ: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
  };
  _full = { w: 0.8, h: 1.8, d: 0.8 };
  _half = { w: 0.8 / 2, h: 1.8 / 2, d: 0.8 / 2 };
  position = new Vector3(0, 0, 0);
  constructor(
    width: number = 1,
    height: number = width,
    depth: number = width
  ) {
    this._full.w = width;
    this._full.h = height;
    this._full.d = depth;
    this._half.w = width / 2;
    this._half.h = height / 2;
    this._half.d = depth / 2;
  }
  update(width: number, height: number, depth: number) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }
  setPosition(position: Vector3) {
    this.position.updateFromVec3(position);
    const o = this.position;
    this.bounds.minX = o.x;
    this.bounds.maxX = o.x + this.width;
    this.bounds.minZ = o.z
    this.bounds.maxZ = o.z + this.depth;
    this.bounds.minY = o.y;
    this.bounds.maxY = o.y + this.height;
  }
  get width() {
    return this._full.w;
  }
  get height() {
    return this._full.h;
  }
  get depth() {
    return this._full.d;
  }
  set width(width: number) {
    this._full.w = width;
    this._half.w = width / 2;
  }
  set height(height: number) {
    this._full.h = height;
    this._half.h = height / 2;
  }
  set depth(depth: number) {
    this._full.d = depth;
    this._half.d = depth / 2;
  }
  get halfWidth() {
    return this._half.w;
  }
  get halfHeight() {
    return this._half.h;
  }
  get halfDepth() {
    return this._half.d;
  }

  pointIsInside(point: Vector3Like) {
    return (
      point.x >= this.bounds.minX &&
      point.x <= this.bounds.maxX &&
      point.y >= this.bounds.minY &&
      point.y <= this.bounds.maxY &&
      point.z >= this.bounds.minZ &&
      point.z <= this.bounds.maxZ
    );
  }

  doesIntersect(boundingBox: BoundingBox) {
    return (
      this.bounds.minX <= boundingBox.bounds.maxX &&
      this.bounds.maxX >= boundingBox.bounds.minX &&
      this.bounds.minY <= boundingBox.bounds.maxY &&
      this.bounds.maxY >= boundingBox.bounds.minY &&
      this.bounds.minZ <= boundingBox.bounds.maxZ &&
      this.bounds.maxZ >= boundingBox.bounds.minZ
    );
  }

  *query(): Generator<Vec3Array> {
    const sx = Math.floor(this.bounds.minX);
    const sy = Math.floor(this.bounds.minY);
    const sz = Math.floor(this.bounds.minZ);
    const mx = Math.ceil(this.bounds.maxX);
    const my = Math.ceil(this.bounds.maxY);
    const mz = Math.ceil(this.bounds.maxZ);

    for (let y = sy; y <= my; y++) {
      for (let x = sx; x <= mx; x++) {
        for (let z = sz; z <= mz; z++) {

          yield [x, y, z];
        }
      }
    }
  }
}

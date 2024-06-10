import { Vector3Like, Vec3Array } from "./Types/Math.types";

export class Flat3DIndex {
  private position: Vec3Array;
  private bounds: Vec3Array;

  constructor(
    private _getIndex: (position: Vec3Array, bounds: Vec3Array) => number,
    private _getXYZ: (
      index: number,
      bounds: Vec3Array,
      position: Vec3Array
    ) => void
  ) {
    this.position = [0, 0, 0];
    this.bounds = [1, 1, 1];
  }

  static GetXZYOrder(): Flat3DIndex {
    return new Flat3DIndex(
      (position, bounds) =>
        position[0] +
        position[2] * bounds[0] +
        position[1] * bounds[0] * bounds[2],
      (index, bounds, position) => {
        position[1] = Math.floor(index / (bounds[0] * bounds[2]));
        position[2] = Math.floor((index % (bounds[0] * bounds[2])) / bounds[0]);
        position[0] = Math.floor(index % bounds[0]);
      }
    );
  }

  static GetXYZOrder(): Flat3DIndex {
    return new Flat3DIndex(
      (position, bounds) =>
        position[0] +
        position[1] * bounds[0] +
        position[2] * bounds[0] * bounds[1],
      (index, bounds, position) => {
        position[2] = Math.floor(index / (bounds[0] * bounds[1]));
        position[1] = Math.floor((index % (bounds[0] * bounds[1])) / bounds[0]);
        position[0] = Math.floor(index % bounds[0]);
      }
    );
  }

  get size(): number {
    return this.bounds[0] * this.bounds[1] * this.bounds[2];
  }

  getIndex(position: Vec3Array): number {
    return this._getIndex(position, this.bounds);
  }

  getIndexVec3Array(position: Vec3Array): number {
    this.position[0] = position[0];
    this.position[1] = position[1];
    this.position[2] = position[2];
    return this._getIndex(this.position, this.bounds);
  }
  getIndexXYZ(x: number, y: number, z: number): number {
    this.position[0] = x;
    this.position[1] = y;
    this.position[2] = z;
    return this._getIndex(this.position, this.bounds);
  }

  getIndexVec3(position: Vector3Like): number {
    this.position[0] = position.x;
    this.position[1] = position.y;
    this.position[2] = position.z;
    return this._getIndex(this.position, this.bounds);
  }

  output: Vec3Array = [0, 0, 0];
  getXYZ(index: number) {
    this._getXYZ(index, this.bounds, this.output);
    return this.output;
  }

  setBounds(x: number, y: number, z: number): void {
    this.bounds[0] = x;
    this.bounds[1] = y;
    this.bounds[2] = z;
  }
}

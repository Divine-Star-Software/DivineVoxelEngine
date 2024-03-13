import { Position3Matrix, Vec3Array } from "./Types/Math.types";

export class Flat3DIndex {
  private position: Position3Matrix = { x: 0, y: 0, z: 0 };
  private bounds: Vec3Array = [0, 0, 0];

  constructor(
    private _getIndex: (position: Vec3Array, bounds: Vec3Array) => number,
    private _getXYZ: (index: number, bounds: Vec3Array) => Position3Matrix
  ) {}

  static GetXZYOrder(): Flat3DIndex {
    return new Flat3DIndex(
      ([x, y, z], bounds) => x + z * bounds[0] + y * bounds[0] * bounds[2],
      (index, bounds) => {
        const y = Math.floor(index / (bounds[0] * bounds[2]));
        const z = Math.floor((index % (bounds[0] * bounds[2])) / bounds[0]);
        const x = Math.floor(index % bounds[0]);
        return { x, y, z };
      }
    );
  }

  static GetXYZOrder(): Flat3DIndex {
    return new Flat3DIndex(
      ([x, y, z], bounds) => x + y * bounds[0] + z * bounds[0] * bounds[1],
      (index, bounds) => {
        const z = Math.floor(index / (bounds[0] * bounds[1]));
        const y = Math.floor((index % (bounds[0] * bounds[1])) / bounds[0]);
        const x = Math.floor(index % bounds[0]);
        return { x, y, z };
      }
    );
  }

  get size(): number {
    return this.bounds[0] * this.bounds[1] * this.bounds[2];
  }

  getIndex(position: Vec3Array): number {
    return this._getIndex(position, this.bounds);
  }

  getXYZ(index: number): Position3Matrix {
    return this._getXYZ(index, this.bounds);
  }

  setBounds(x: number, y: number, z: number): void {
    this.bounds = [x, y, z];
  }
}
import { Position3Matrix, Vec3Array } from "./Types/Math.types";

export class Flat3DIndex {
  static GetXZYOrder() {
    return new Flat3DIndex(
      ([x, y, z], { bounds }) => z + x * bounds.z + y * bounds.z * bounds.x,
      (index, { position, bounds }) => {
        position.y = index % bounds.y >> 0;
        position.x = (index / bounds.y) % bounds.x >> 0;
        position.z = (index / (bounds.x * bounds.z)) >> 0;
        return position;
      }
    );
  }
  static GetXYZOrder() {
    return new Flat3DIndex(
      ([x, y, z], { bounds }) => x + y * bounds.x + z * bounds.z * bounds.y,
      (index, { position, bounds }) => {
        position.x = index % bounds.x >> 0;
        position.y = (index / bounds.x) % bounds.y >> 0;
        position.z = (index / (bounds.x * bounds.y)) >> 0;
        return position;
      }
    );
  }

  position = {
    x: 0,
    y: 0,
    z: 0,
  };
  bounds = {
    x: 0,
    y: 0,
    z: 0,
  };

  get size() {
    return this.bounds.x * this.bounds.y * this.bounds.z;
  }
  constructor(
    private _getIndex: (poition: Vec3Array, flatIndex: Flat3DIndex) => number,
    private _getXYZ: (index: number, flatIndex: Flat3DIndex) => Position3Matrix
  ) {}

  getIndex(position: Vec3Array) {
    return this._getIndex(position, this);
  }

  getXYZ(index: number): Position3Matrix {
    return this._getXYZ(index, this);
  }

  setBounds(x: number, y: number, z: number) {
    this.bounds.x = x;
    this.bounds.y = y;
    this.bounds.z = z;
  }
}

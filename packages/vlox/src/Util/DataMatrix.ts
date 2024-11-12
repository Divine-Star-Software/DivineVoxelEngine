import type { Vec3Array } from "@amodx/math";

export class DataMatrix<T> {
  private _matrix: T[][][];

  constructor(public size: Vec3Array, public defaultValue: T) {
    this._matrix = [];
    this.setAll(defaultValue);
  }

  get sizeX(): number {
    return this.size[0];
  }

  get sizeY(): number {
    return this.size[1];
  }

  get sizeZ(): number {
    return this.size[2];
  }

  setMatrix(matrix: T[][][]) {
    this._matrix = matrix;
  }
  cloneMatrix(): T[][][] {
    return structuredClone(this._matrix);
  }
  
  setVec3([x, y, z]: Vec3Array, value: T): void {
    if (!this.isWithinBounds(x, y, z)) return;
    if (!this._matrix[x]) this._matrix[x] = [];
    if (!this._matrix[x][y]) this._matrix[x][y] = [];
    this._matrix[x][y][z] = value;
  }

  setXYZ(x: number, y: number, z: number, value: T): void {
    this.setVec3([x, y, z], value);
  }

  getVec3([x, y, z]: Vec3Array): T | undefined {
    return this.isWithinBounds(x, y, z) ? this._matrix[x]?.[y]?.[z] : undefined;
  }

  getXYZ(x: number, y: number, z: number): T | undefined {
    return this.getVec3([x, y, z]);
  }

  deleteVec3([x, y, z]: Vec3Array): void {
    if (this.isWithinBounds(x, y, z)) this._matrix[x][y][z] = this.defaultValue;
  }

  deleteXYZ(x: number, y: number, z: number): void {
    this.deleteVec3([x, y, z]);
  }

  setAll(value: T): void {
    for (let x = 0; x < this.size[0]; x++) {
      this._matrix[x] = [];
      for (let y = 0; y < this.size[1]; y++) {
        this._matrix[x][y] = [];
        for (let z = 0; z < this.size[2]; z++) {
          this._matrix[x][y][z] = value;
        }
      }
    }
  }

  *getAll(): Generator<[Vec3Array, T]> {
    for (let x = 0; x < this.size[0]; x++) {
      for (let y = 0; y < this.size[1]; y++) {
        for (let z = 0; z < this.size[2]; z++) {
          yield [[x, y, z], this._matrix[x][y][z]];
        }
      }
    }
  }

  swap(startPosition: Vec3Array, endPosition: Vec3Array): void {
    const startValue = this.getVec3(startPosition);
    const endValue = this.getVec3(endPosition);

    if (startValue !== undefined && endValue !== undefined) {
      this.setVec3(startPosition, endValue);
      this.setVec3(endPosition, startValue);
    }
  }

  isCube(): boolean {
    return this.sizeX === this.sizeY && this.sizeZ === this.sizeX;
  }

  private isWithinBounds(x: number, y: number, z: number): boolean {
    return (
      x >= 0 &&
      x < this.size[0] &&
      y >= 0 &&
      y < this.size[1] &&
      z >= 0 &&
      z < this.size[2]
    );
  }
}

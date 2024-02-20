import type { Vec3Array } from "../Math";

export class DataMatrix<T> {
  _matrix: T[][][] = [];
  private _interator: [Vec3Array, T];
  get sizeX() {
    return this.size[0];
  }
  get sizeY() {
    return this.size[1];
  }
  get sizeZ() {
    return this.size[2];
  }

  constructor(public size: Vec3Array, public defaultValue: T) {
    this.setAll(defaultValue);
    this._interator = [[0, 0, 0], defaultValue];
  }

  setVec3([x, y, z]: Vec3Array, value: T) {
    this._matrix[x] ??= [];
    this._matrix[x][y] ??= [];
    this._matrix[x][y][z] = value;
  }

  setXYZ(x: number, y: number, z: number, value: T) {
    this._matrix[x] ??= [];
    this._matrix[x][y] ??= [];
    this._matrix[x][y][z] = value;
  }

  getVec3([x, y, z]: Vec3Array) {
    if (!this._matrix[x]) return undefined;
    if (!this._matrix[x][y]) return undefined;
    return this._matrix[x][y][z];
  }

  getXYZ(x: number, y: number, z: number) {
    if (!this._matrix[x]) return undefined;
    if (!this._matrix[x][y]) return undefined;
    return this._matrix[x][y][z];
  }

  deleteVec3([x, y, z]: Vec3Array) {
    (this as any)._matrix[x][y][z] = this.defaultValue;
  }

  deleteXYZ(x: number, y: number, z: number) {
    (this as any)._matrix[x][y][z] = undefined;
  }

  setAll(value: T) {
    for (let x = 0; x < this.size[0]; x++) {
      for (let y = 0; y < this.size[1]; y++) {
        for (let z = 0; z < this.size[2]; z++) {
          this.setXYZ(x, y, z, value);
        }
      }
    }
  }

  *getAll(): Generator<[Vec3Array, T]> {
    for (let x = 0; x < this.size[0]; x++) {
      for (let y = 0; y < this.size[1]; y++) {
        for (let z = 0; z < this.size[2]; z++) {
          this._interator[0][0] = x;
          this._interator[0][1] = y;
          this._interator[0][2] = z;
          this._interator[1] = this._matrix[x][y][z];
          yield this._interator;
        }
      }
    }
  }

  swap(startPosition: Vec3Array, endPostiion: Vec3Array) {
    const start = this.getVec3(startPosition);
    const end = this.getVec3(endPostiion);

    if (!start || !end) return;
    this.setVec3(startPosition, end);
    this.setVec3(endPostiion, start);
  }

  isCube() {
    return this.sizeX == this.sizeY && this.sizeZ == this.sizeX;
  }

  sync(matrix: DataMatrix<T>) {
    this.size = [...matrix.size];
    this._matrix = matrix._copyMatrix();
  }

  _copyMatrix() {
    const newMatrix: T[][][] = [];
    for (const [[x, y, z], node] of this.getAll()) {
      newMatrix[x] ??= [];
      newMatrix[x][y] ??= [];
      newMatrix[x][y][z] = node;
    }
    return newMatrix;
  }

  _rotate = {
    $90: (plane: T[][]) => {
      const n = plane.length;
      for (var i = 0; i < n / 2; i++) {
        for (var j = i; j < n - i - 1; j++) {
          const tmp = plane[i][j];
          plane[i][j] = plane[n - j - 1][i];
          plane[n - j - 1][i] = plane[n - i - 1][n - j - 1];
          plane[n - i - 1][n - j - 1] = plane[j][n - i - 1];
          plane[j][n - i - 1] = tmp;
        }
      }
    },
  };
  rotate = {
    vertical: () => {
      if (this.sizeZ == this.sizeY) {
        const newMatrix = new DataMatrix<T>(this.size, this.defaultValue);
        newMatrix._matrix = this._copyMatrix();
        for (const plane of newMatrix._matrix) {
          this._rotate.$90(plane);
        }
        return newMatrix;
      }
      return false;
    },
    horizontal: () => {
      if (this.sizeX == this.sizeZ) {
        const newMatrix = new DataMatrix<T>(this.size, this.defaultValue);
        const tempMatrix: T[][][] = [];
        for (const [[x, y, z], node] of this.getAll()) {
          tempMatrix[y] ??= [];
          tempMatrix[y][x] ??= [];
          tempMatrix[y][x][z] = node;
        }

        for (const plane of tempMatrix) {
          this._rotate.$90(plane);
        }

        for (const [[x, y, z], node] of this.getAll()) {
          newMatrix._matrix[x][y][z] = tempMatrix[y][x][z];
        }
        return newMatrix;
      }

      const max = Math.max(this.sizeX, this.sizeZ);
      const newMatrix = new DataMatrix<T>(
        [max, this.sizeY, max],
        this.defaultValue
      );
      const tempMatrix = new DataMatrix<T>(
        [max, this.sizeY, max],
        this.defaultValue
      );
      for (const [[x, y, z], node] of this.getAll()) {
        tempMatrix._matrix[y] ??= [];
        tempMatrix._matrix[y][x] ??= [];
        tempMatrix._matrix[y][x][z] = node;
      }

      for (const plane of tempMatrix._matrix) {
        this._rotate.$90(plane);
      }

      for (let x = 0; x < max; x++) {
        for (let y = 0; y < this.sizeY; y++) {
          for (let z = 0; z < max; z++) {
            newMatrix._matrix[x][y][z] = tempMatrix._matrix[y][x][z];
          }
        }
      }

      return newMatrix;
    },
  };

  flip = {
    horizontalInPlace: () => {
      const newMatrix = new DataMatrix(this.size, this.defaultValue);
      for (const [[x, y, z], data] of this.getAll()) {
        newMatrix.setVec3([z, y, x], data);
      }
      this._matrix = newMatrix._matrix;
    },
    verticalInPlace: () => {
      const newMatrix = new DataMatrix(this.size, this.defaultValue);
      for (const [[x, y, z], data] of this.getAll()) {
        newMatrix.setVec3([x, Math.abs(y - (this.size[1] - 1)), z], data);
      }
      this._matrix = newMatrix._matrix;
    },
    horizontalCopy: () => {
      const newMatrix = new DataMatrix(this.size, this.defaultValue);
      for (const [[x, y, z], data] of this.getAll()) {
        newMatrix.setVec3([z, y, x], data);
      }
      return newMatrix;
    },
    verticalCopy: () => {
      const newMatrix = new DataMatrix(this.size, this.defaultValue);
      for (const [[x, y, z], data] of this.getAll()) {
        newMatrix.setVec3([x, Math.abs(y - (this.size[1] - 1)), z], data);
      }
      return newMatrix;
    },
  };
}

import { DirectionNames } from "@divinevoxel/core";
import { PixelEntityMath } from "../../Maths/PixelEntityMath.js";
import { FaceMap } from "@divinevoxel/core/Math/Constants/Faces.js";
import { Vec2Array } from "@divinevoxel/core/Math/index.js";
import { EntityShaderTool } from "../../Util/EntityShaderTool.js";

const MATRIX_INDEXES = {
  POSITION_X: 12,
  POSITION_Y: 13,
  POSITION_Z: 14,

  SCALE_X: 0,
  SCALE_Y: 5,
  SCALE_Z: 10,
  SCALE_W: 15,
};

export class MatrixArray<T extends number[] | Float32Array> {
  _index = 0;

  constructor(public matricies: T) {}

  setMatriciesIndex(index: number) {
    this._index = index * 16;
    return this;
  }

  setPosition(x: number, y: number, z: number) {
    this.matricies[MATRIX_INDEXES.POSITION_X + this._index] = x;
    this.matricies[MATRIX_INDEXES.POSITION_Y + this._index] = y;
    this.matricies[MATRIX_INDEXES.POSITION_Z + this._index] = z;
    return this;
  }

  setScale(x: number, y: number = x, z: number = x) {
    this.matricies[MATRIX_INDEXES.SCALE_X + this._index] = x;
    this.matricies[MATRIX_INDEXES.SCALE_Y + this._index] = y;
    this.matricies[MATRIX_INDEXES.SCALE_Z + this._index] = z;
    this.matricies[MATRIX_INDEXES.SCALE_W + this._index] = 1;
    return this;
  }

  addMatrix() {
    if (this.matricies instanceof Float32Array) return;
    for (const row of PixelEntityMath.IDENTIY_MATRIX) {
      for (const col of row) {
        this.matricies.push(col);
      }
    }
  }
}

export class FaceDataArray {
  _index = 0;

  _totalSize = 0;
  faces: Record<DirectionNames, number[]> = {
    top: [],
    bottom: [],
    north: [],
    south: [],
    east: [],
    west: [],
  };

  cached: Float32Array;

  constructor() {}

  addUV(
    face: DirectionNames,
    start: Vec2Array,
    end: Vec2Array,
    divider: Vec2Array,
    textureIndex  : number
  ) {
    this._totalSize += 4;
    this.faces[face].push(
      EntityShaderTool.setUV(start[0], start[1]),
      EntityShaderTool.setUV(end[0], end[1]),
      EntityShaderTool.setUV(divider[0], divider[1]),
      textureIndex
    );
  }

  create() {
    const target = new Float32Array(new SharedArrayBuffer(this._totalSize * 4));
    const segmentLength = this._totalSize / 6;
    let currentIndex = 0;
    for (let i = 0; i < 6; i++) {
      const data = this.faces[<DirectionNames>FaceMap[i]];
      target.set(data, i * segmentLength);
      for (let i = 0; i < data.length; i++) {
        target[currentIndex] = data[i];
        currentIndex++;
      }
    }
    this.cached = target;
    FaceMap.forEach((face) => (this.faces[<DirectionNames>face].length = 0));
  }
}

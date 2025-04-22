import { EntityTool } from "./EntityTool.js";
import { Matrix } from "@babylonjs/core/Maths/math.vector.js";
const identity = Matrix.Identity();
const tempMatrix = new Matrix();
export class EntityInstance {
  constructor(
    public readonly index: number,
    public readonly _tool: EntityTool
  ) {}

  updateMatrix(matrix: Matrix) {
    const trueIndex = this.index * 16;
    for (let i = 0; i < 16; i++) {
      this._tool._matrixArray[trueIndex + i] = matrix.m[i];
    }
  }

  setPosition(x: number, y: number, z: number) {
    const positionIndex = this.index * 3;
    this._tool._positionArray[positionIndex] = x;
    this._tool._positionArray[positionIndex + 1] = y;
    this._tool._positionArray[positionIndex + 2] = z;
    tempMatrix.copyFrom(identity);
    tempMatrix.setTranslationFromFloats(x, y, z);
    this.updateMatrix(tempMatrix);
  }

  destroy() {
    const trueIndex = this.index * 16;
    for (let i = trueIndex; i < trueIndex + 16; i++) {
      this._tool._matrixArray[i] = 0;
    }
    this._tool._instances.push(this);
    this._tool._usedInstances.delete(this);
  }
}

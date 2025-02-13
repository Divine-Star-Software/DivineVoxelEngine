import { EntityTool } from "./EntityTool.js";
import { Matrix, Vector3 } from "@babylonjs/core";

const temp = new Vector3();

export class EntityInstance {
  constructor(
    public readonly index: number,
    public readonly matrix: Matrix,
    public readonly _tool: EntityTool
  ) {}

  setPosition(x: number, y: number, z: number) {
    temp.set(x, y, z);
    this.matrix.setTranslation(temp);
    this._tool.mesh.thinInstanceSetMatrixAt(this.index, this.matrix);
  }

  destroy() {
    this.matrix.setAll(0);
    this._tool.mesh.thinInstanceSetMatrixAt(this.index, this.matrix);
    this._tool.returnInstance(this);
  }
}

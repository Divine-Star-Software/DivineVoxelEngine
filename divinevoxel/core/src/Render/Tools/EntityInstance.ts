import { MatrixArray, MatrixProperty } from "../../Math/Classes/MatrixArray.js";
import { EntityTool } from "./EntityTool.js";

const xRotationMatrix = new MatrixArray(1, 0);
const yRotationMatrix = new MatrixArray(1, 0);
const zRotationMatrix = new MatrixArray(1, 0);

export class EntityInstance {
  constructor(
    public index: number,
    public _matrix: MatrixArray,
    public _tool: EntityTool,
  ) {}

  piviotPoint = {
    x: 0.5,
    y: 0,
    z: 0.5,
  };
  _scale = {
    x: 1,
    y: 1,
    z: 1,
  };
  scale = new MatrixProperty({
    setX: (x) => {
      this._scale.z = x;
      this._updateMatrix();
    },
    getX: () => {
      return this._scale.z;
    },
    setY: (y) => {
      this._scale.y = y;
      this._updateMatrix();
    },
    getY: () => {
      return this._scale.y;
    },
    setZ: (z) => {
      this._scale.z = z;
      this._updateMatrix();
    },
    getZ: () => {
      return this._scale.z;
    },
    setW: (x) => {},
    getW: () => {
      return 0;
    },
  });
  _rotation = {
    x: 0,
    y: 0,
    z: 0,
  };
  rotation = new MatrixProperty({
    setX: (x) => {
      this._rotation.x = x;
      this._updateMatrix();
    },
    getX: () => {
      return this._rotation.x;
    },
    setY: (y) => {
      this._rotation.y = y;
      this._updateMatrix();
    },
    getY: () => {
      return this._rotation.y;
    },
    setZ: (z) => {
      this._rotation.z = z;
      this._updateMatrix();
    },
    getZ: () => {
      return this._rotation.z;
    },
    setW: () => {},
    getW: () => {
      return 0;
    },
  });

  _position = {
    x: 0,
    y: 0,
    z: 0,
  };
  position = new MatrixProperty({
    setX: (x) => {
      this._position.x = x;
      this._updateMatrix();
    },
    getX: () => {
      return this._position.x;
    },
    setY: (y) => {
      this._position.y = y;
      this._updateMatrix();
    },
    getY: () => {
      return this._position.y;
    },
    setZ: (z) => {
      this._position.z = z;
      this._updateMatrix();
    },
    getZ: () => {
      return this._position.z;
    },
    setW: () => {},
    getW: () => {
      return 0;
    },
  });

  _updateMatrix() {
    for (const row of this._matrix.rows) {
      row.setAll(0);
    }
    this._matrix.scale.x = this._scale.x;
    this._matrix.scale.y = this._scale.y;
    this._matrix.scale.z = this._scale.z;

    this._matrix.position.x = -this.piviotPoint.x;
    this._matrix.position.y = -this.piviotPoint.y;
    this._matrix.position.z = -this.piviotPoint.z;

    if (this.rotation.x) {
      xRotationMatrix.rows[1].y = Math.cos(this._rotation.x);
      xRotationMatrix.rows[1].z = -Math.sin(this._rotation.x);
      xRotationMatrix.rows[2].y = Math.sin(this._rotation.x);
      xRotationMatrix.rows[2].z = Math.cos(this._rotation.x);
      this._matrix.multiply(xRotationMatrix);
    }
    if (this.rotation.y) {
      yRotationMatrix.rows[0].x = Math.cos(this._rotation.y);
      yRotationMatrix.rows[0].z = Math.sin(this._rotation.y);
      yRotationMatrix.rows[2].x = -1 * Math.sin(this._rotation.y);
      yRotationMatrix.rows[2].z = Math.cos(this._rotation.y);
      this._matrix.multiply(yRotationMatrix);
    }
    if (this.rotation.z) {
      zRotationMatrix.rows[0].x = Math.cos(this._rotation.z);
      zRotationMatrix.rows[0].y = -Math.sin(this._rotation.z);

      zRotationMatrix.rows[1].x = Math.sin(this._rotation.z);
      zRotationMatrix.rows[1].y = Math.cos(this._rotation.z);
      this._matrix.multiply(zRotationMatrix);
    }

    this._matrix.position.x += this.position.x + this.piviotPoint.x;
    this._matrix.position.y += this.position.y + this.piviotPoint.y;
    this._matrix.position.z += this.position.z + this.piviotPoint.z;
  }

  destroy() {
    this._tool.returnInstance(this);
  }
}

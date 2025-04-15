export class Vector3 {
  _isDirty = false;
  _vector = new Float32Array<any>(3);

  get x() {
    return this._vector[0];
  }
  set x(value: number) {
    if (value != this._vector[0]) this._isDirty = true;
    this._vector[0] = value;
  }

  get y() {
    return this._vector[1];
  }
  set y(value: number) {
    if (value != this._vector[1]) this._isDirty = true;
    this._vector[1] = value;
  }

  get z() {
    return this._vector[2];
  }
  set z(value: number) {
    if (value != this._vector[2]) this._isDirty = true;
    this._vector[2] = value;
  }

  constructor(x = 0, y = 0, z = 0) {
    this._vector[0] = x;
    this._vector[1] = y;
    this._vector[2] = z;
  }
}

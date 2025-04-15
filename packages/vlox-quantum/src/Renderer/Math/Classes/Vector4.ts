export class Vector4 {
  _isDirty = false;
  _vector = new Float32Array<any>(4);

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

  get w() {
    return this._vector[3];
  }
  set w(value: number) {
    if (value != this._vector[3]) this._isDirty = true;
    this._vector[3] = value;
  }
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this._vector[0] = x;
    this._vector[1] = y;
    this._vector[2] = z;
    this._vector[3] = w;
  }
}

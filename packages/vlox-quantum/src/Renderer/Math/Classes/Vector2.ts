export class Vector2 {
  _isDirty = false;
  _vector = new Float32Array<any>(2);

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

  constructor(x = 0, y = 0) {
    this._vector[0] = x;
    this._vector[1] = y;
  }
}

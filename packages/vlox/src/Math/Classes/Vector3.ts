import { Vector3Like, Vec3Array } from "@amodx/math";

class V3 {
 _data: Vec3Array = [0, 0, 0];
 get x() {
  return this._data[0];
 }
 set x(x: number) {
  this._data[0] = x;
 }
 get y() {
  return this._data[1];
 }
 set y(y: number) {
  this._data[1] = y;
 }
 get z() {
  return this._data[2];
 }
 set z(z: number) {
  this._data[2] = z;
 }
}

export class Vector3 extends V3 {
 static Zero = new Vector3(0, 0, 0);
 static Up = new Vector3(0, 1, 0);
 static Down = new Vector3(0, -1, 0);
 static East = new Vector3(1, 0, 0);
 static West = new Vector3(-1, 0, 0);
 static North = new Vector3(0, 0, 1);
 static South = new Vector3(0, 0, -1);

 _tv3 = new V3();

 static NaNRestore(vec3: Vector3Like) {
  if (Number.isNaN(vec3.x)) vec3.x = 0;
  if (Number.isNaN(vec3.y)) vec3.y = 0;
  if (Number.isNaN(vec3.z)) vec3.z = 0;
 }
 constructor(x: number = 0, y: number = 0, z: number = 0) {
  super();
  this.x = x;
  this.y = y;
  this.z = z;
 }

 updateFromArray(
  array: number[] | Float32Array | Float64Array,
  startIndex = 0
 ) {
  this.x = array[startIndex];
  this.y = array[startIndex + 1];
  this.z = array[startIndex + 2];
  return this;
 }

 set(x: number, y: number, z: number) {
  this.x = x;
  this.y = y;
  this.z = z;
  return this;
 }

 setAll(value: number) {
  this.x = value;
  this.y = value;
  this.z = value;
  return this;
 }

 updateFromVec3(vector: Vector3) {
  this.x = vector.x;
  this.y = vector.y;
  this.z = vector.z;
  return this;
 }

 roundVector(deciamlPoints = 2) {
  this.x = Number(this.x.toFixed(deciamlPoints));
  this.y = Number(this.y.toFixed(deciamlPoints));
  this.z = Number(this.z.toFixed(deciamlPoints));
  return this;
 }

 translate(x: number, y: number, z: number) {
  this.x = this.x + x;
  this.y = this.y + y;
  this.z = this.z + z;
  return this;
 }

 getTranslated(x: number, y: number, z: number) {
  this._tv3.x = this.x + x;
  this._tv3.y = this.y + y;
  this._tv3.z = this.z + z;
  return this._tv3;
 }

 scaleXYZ(scaler: number) {
  this.x = this.x * scaler;
  this.y = this.y * scaler;
  this.z = this.z * scaler;
  return this;
 }

 scale(xScale: number, yScale: number, zScale: number) {
  this.x = this.x * xScale;
  this.y = this.y * yScale;
  this.z = this.z * zScale;
  return this;
 }

 getScaledXYZ(scaler: number) {
  this._tv3.x = this.x * scaler;
  this._tv3.y = this.y * scaler;
  this._tv3.z = this.z * scaler;
  return this._tv3;
 }

 getScaled(xScale: number, yScale: number, zScale: number) {
  this._tv3.x = this.x * xScale;
  this._tv3.y = this.y * yScale;
  this._tv3.z = this.z * zScale;
  return this._tv3;
 }

 add(x: number, y: number, z: number) {
  this.x += x;
  this.y += y;
  this.z += z;
  return this;
 }

 addXYZ(add: number) {
  this.x = this.x + add;
  this.y = this.y + add;
  this.z = this.z + add;
  return this;
 }

 addFromVec3(vector: Vector3) {
  this.x += vector.x;
  this.y += vector.y;
  this.z += vector.z;
  return this;
 }

 isZero() {
  return !this.x && !this.y && !this.z;
 }

 subtractXYZ(subtract: number) {
  this.x = this.x - subtract;
  this.y = this.y - subtract;
  this.z = this.z - subtract;
  return this;
 }

 subtractFromObj(vector: Vector3) {
  this.x = this.x - vector.x;
  this.y = this.y - vector.y;
  this.z = this.z - vector.z;
  return this;
 }

 getAddXYZ(add: number) {
  this._tv3.x = this.x + add;
  this._tv3.y = this.y + add;
  this._tv3.z = this.z + add;
  return this._tv3;
 }

 getSubtractXYZ(subtract: number) {
  this._tv3.x = this.x - subtract;
  this._tv3.y = this.y - subtract;
  this._tv3.z = this.z - subtract;
  return this._tv3;
 }

 addVector(vector3: Vector3) {
  this.x = vector3.x + this.x;
  this.y = vector3.y + this.y;
  this.z = vector3.z + this.z;
  return this;
 }

 getAddedVector(vector3: Vector3) {
  this._tv3.x = vector3.x + this.x;
  this._tv3.y = vector3.y + this.y;
  this._tv3.z = vector3.z + this.z;
  return this._tv3;
 }

 subtractVector(vector3: Vector3) {
  this.x = this.x - vector3.x;
  this.y = this.y - vector3.y;
  this.z = this.z - vector3.z;
  return this;
 }

 getSubtractedVector(vector3: Vector3) {
  this._tv3.x = this.x - vector3.x;
  this._tv3.y = this.y - vector3.y;
  this._tv3.z = this.z - vector3.z;
  return this._tv3;
 }

 scaleVector(vector3: Vector3) {
  this.x = this.x * vector3.x;
  this.y = this.y * vector3.y;
  this.z = this.z * vector3.z;
  return this;
 }

 getScaledVector(vector3: Vector3) {
  this._tv3.x = this.x * vector3.x;
  this._tv3.y = this.y * vector3.y;
  this._tv3.z = this.z * vector3.z;
  return this._tv3;
 }

 getLength() {
  return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
 }

 divide(scalar: number) {
  this.x = this.x / scalar;
  this.y = this.y / scalar;
  this.z = this.z / scalar;
  Vector3.NaNRestore(this);
  return this;
 }

 getDivided(scalar: number) {
  this._tv3.x = this.x / scalar;
  this._tv3.y = this.y / scalar;
  this._tv3.z = this.z / scalar;
  Vector3.NaNRestore(this._tv3);
  return this._tv3;
 }

 normalize() {
  return this.divide(this.getLength());
 }

 isEqual(vector3: Vector3) {
  if (this.x != vector3.x) {
   return false;
  }
  if (this.y != vector3.y) {
   return false;
  }
  if (this.z != vector3.z) {
   return false;
  }
  return true;
 }

 isNotEqual(vector3: Vector3) {
  if (this.x != vector3.x) {
   return true;
  }
  if (this.y != vector3.y) {
   return true;
  }
  if (this.z != vector3.z) {
   return true;
  }
  return false;
 }
}

import type { Position3Matrix, Vec3Array } from "Math";
import { TypedArrays } from "divine-binary-object/Types/DBO.types";

export class Flat3DIndex {
 _position = {
  x: 0,
  y: 0,
  z: 0,
 };
 bounds = {
  x: 0,
  y: 0,
  z: 0,
 };

 getIndex(x: number, y: number, z: number) {
  return x + y * this.bounds.x + z * this.bounds.z * this.bounds.y;
 }

 getXYZ(index: number): Position3Matrix {
  this._position.x = index % this.bounds.x >> 0;
  this._position.y = (index / this.bounds.x) % this.bounds.y >> 0;
  this._position.z = (index / (this.bounds.x * this.bounds.y)) >> 0;
  return this._position;
 }
}

/**# Flat 3D Array
 * ---
 * Used to treat a number or typed array 1d array as a 3d array.
 */
export class Flat3DArray extends Flat3DIndex {
 array: number[] | Uint8Array = [];
 volumne = 0;

 constructor(public bounds: Position3Matrix) {
  super();
  this.volumne = bounds.x * bounds.y * bounds.z;
  this.fillArray();
 }

 updateBounds(bounds: Position3Matrix) {
  this.bounds.x = bounds.x;
  this.bounds.y = bounds.y;
  this.bounds.z = bounds.z;
  this.array = [];
  this.fillArray();
 }

 setArray(array: number[] | Uint8Array) {
  this.array = array;
 }

 fillArray(value = 0) {
  for (let i = 0; i < this.volumne; i++) {
   this.array[i] = value;
  }
 }

 getValue(x: number, y: number, z: number) {
  return this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
 }
 getValueUseObj(position: Position3Matrix) {
  return this.array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ];
 }

 setValue(x: number, y: number, z: number, value: number) {
  this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
 }
 setValueUseObj(position: Position3Matrix, value: number) {
  this.array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ] = value;
 }

 deleteValue(x: number, y: number, z: number) {
  //@ts-ignore
  this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] =
   undefined;
 }
 deleteUseObj(position: Position3Matrix) {
  //@ts-ignore
  this.array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ] = undefined;
 }
}

/**# Flat 3D Any Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export class Flat3DAnyArray<T> extends Flat3DIndex {
 _position = {
  x: 0,
  y: 0,
  z: 0,
 };

 volumne = 0;
 constructor(bounds: Vec3Array, public array: T[]) {
  super();
  this.bounds.x = bounds[0];
  this.bounds.y = bounds[1];
  this.bounds.z = bounds[2];

  this.volumne = this.bounds.x * this.bounds.y * this.bounds.z;
 }

 updateBounds(bounds: Position3Matrix) {
  this.bounds.x = bounds.x;
  this.bounds.y = bounds.y;
  this.bounds.z = bounds.z;
 }

 setArray(array: T[]) {
  this.array = array;
 }

 getValue(x: number, y: number, z: number) {
  return this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
 }

 setValue(x: number, y: number, z: number, value: T) {
  this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
 }

 deleteValue(x: number, y: number, z: number) {
  //@ts-ignore
  this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] =
   undefined;
 }
}

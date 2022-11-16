
import { Vector3 } from "Meta/Util.types";

/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export const Flat3DArray = {
 bounds: {
  x: 16,
  y: 128,
  z: 16,
 },

 _position: {
  x: 0,
  y: 0,
  z: 0,
 },

 setBounds(x: number, y: number, z: number) {
  this.bounds = {
   x: x,
   y: y,
   z: z,
  };
 },

 getValue(x: number, y: number, z: number, array: Uint32Array | number[]) {
  return array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
 },
 getValueUseObj(position: Vector3, array: Uint32Array | number[]) {
  return array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ];
 },
 getValueUseObjSafe(position: Vector3, array: Uint32Array | number[]) {
  if(array instanceof Uint32Array) {
  return Atomics.load(
   array,
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  );
  }
  return 0;
 },
 setValue(x: number, y: number, z: number, array: Uint32Array | number[], value: number) {
  array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
 },
 setValueUseObj(position: Vector3, array: Uint32Array | number[], value: number) {
  array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ] = value;
 },
 setValueUseObjSafe(
  position: Vector3,
  array: Uint32Array | number[],
  value: number
 ) {
 if(array instanceof Uint32Array) {
  Atomics.store(
   array,
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y,
   value
  );
 }
 },

 deleteValue(x: number, y: number, z: number, array: Uint32Array | number[]) {
  //@ts-ignore
  array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = undefined;
 },
 deleteUseObj(position: Vector3, array: Uint32Array | number[]) {
  //@ts-ignore
  array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ] = undefined;
 },
 getIndex(x: number, y: number, z: number) {
  return x + y * this.bounds.x + z * this.bounds.z * this.bounds.y;
 },
 getXYZ(index: number): Vector3 {
  this._position.x = index % this.bounds.x >> 0;
  this._position.y = (index / this.bounds.x) % this.bounds.y >> 0;
  this._position.z = (index / (this.bounds.x * this.bounds.y)) >> 0;
  return this._position;
 },
};

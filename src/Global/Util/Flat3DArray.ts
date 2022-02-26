import { PositionMatrix } from "Meta/Util.types";

/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export class Flat3DArray {


 bounds = {
  x: 16,
  y: 256,
  z: 16,
 };


 _position: PositionMatrix = {
  x: 0,
  y: 0,
  z: 0
 };


 setBounds(x: number, y: number, z: number) {
  this.bounds = {
   x: x,
   y: y,
   z: z
  };
 }


 getValue(x: number, y: number, z: number, array: number[]) {
  const i = this.getIndex(x, y, z);
  return array[i];
 }
 

 setValue(x: number, y: number, z: number, array: number[], value: number) {
  const i = this.getIndex(x, y, z);
  array[i] = value;
 }


 getIndex(x: number, y: number, z: number) {
  return x + y * this.bounds.x + z * this.bounds.z * this.bounds.y;
 }

 
 getXYZ(index: number): PositionMatrix {
  this._position.x = index % this.bounds.x >> 0;
  this._position.y = (index / this.bounds.x) % this.bounds.y >> 0;
  this._position.z = (index / (this.bounds.x * this.bounds.y)) >> 0;
  return this._position;
 }


}

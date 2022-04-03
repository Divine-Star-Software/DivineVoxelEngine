import { ChunkVoxels } from "Meta/Chunks/Chunk.types";
import { PositionMatrix } from "Meta/Util.types";

/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export class Flat3DArray {
 bounds = {
  x: 16,
  y: 128,
  z: 16,
 };

 _position: PositionMatrix = {
  x: 0,
  y: 0,
  z: 0,
 };

 setBounds(x: number, y: number, z: number) {
     console.log(x,y,z);
/*   this.bounds = {
   x: x,
   y: y,
   z: z,
  }; */
 }

 getValue(x: number, y: number, z: number, array: ChunkVoxels) {
  return array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
 }

 setValue(x: number, y: number, z: number, array: ChunkVoxels, value: number) {
  array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
 }

 delete(x: number, y: number, z: number, array: ChunkVoxels) {
  delete array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
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

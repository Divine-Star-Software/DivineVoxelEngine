import { ChunkVoxels } from "Meta/World/WorldData/Chunk.types";
import { Position3Matrix } from "Meta/Util.types";

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

 getValue(x: number, y: number, z: number, array: ChunkVoxels) {
  return array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
 },
 getValueUseObj(position: Position3Matrix, array: ChunkVoxels) {
  return array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ];
 },
 getValueUseObjSafe(position: Position3Matrix, array: ChunkVoxels) {
  return Atomics.load(
   array,
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  );
 },
 setValue(x: number, y: number, z: number, array: ChunkVoxels, value: number) {
  array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
 },
 setValueUseObj(position: Position3Matrix, array: ChunkVoxels, value: number) {
  array[
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y
  ] = value;
 },
 setValueUseObjSafe(
  position: Position3Matrix,
  array: ChunkVoxels,
  value: number
 ) {
  Atomics.store(
   array,
   position.x +
    position.y * this.bounds.x +
    position.z * this.bounds.z * this.bounds.y,
   value
  );
 },

 deleteValue(x: number, y: number, z: number, array: ChunkVoxels) {
  //@ts-ignore
  array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = undefined;
 },
 deleteUseObj(position: Position3Matrix, array: ChunkVoxels) {
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
 getXYZ(index: number): Position3Matrix {
  this._position.x = index % this.bounds.x >> 0;
  this._position.y = (index / this.bounds.x) % this.bounds.y >> 0;
  this._position.z = (index / (this.bounds.x * this.bounds.y)) >> 0;
  return this._position;
 },
};

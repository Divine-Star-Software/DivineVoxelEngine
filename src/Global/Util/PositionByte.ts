import { Position3Matrix } from "Meta/Util.types";

/**# PositionByte
 * ---
 * Handles encoding a 32 bit float with a voxel space posiiton.
 */
export const PositionByte = {
 _poisiton: {
  x: 0,
  y: 0,
  z: 0,
 },
 _positionMasks: {
  x: 0xff,
  z: 0xff00,
  y: 0xff0000,
 },

 getY(byteData: number) {
  return (byteData & this._positionMasks.y) >>> 16;
 },

 getPosition(byteData: number) {
  this._poisiton.x = byteData & this._positionMasks.x;
  this._poisiton.z = (byteData & this._positionMasks.z) >>> 8;
  this._poisiton.y = (byteData &this._positionMasks.y) >>> 16;
  return this._poisiton;
 },

 setPosition(x: number, y: number, z: number) {
  let ez = x | (z << 8);
  return ez | (y << 16);
 },

 setPositionUseObj(positionObj: Position3Matrix) {
  let ez =
   (positionObj.x & this._positionMasks.x) |
   ((positionObj.z << 8) & this._positionMasks.z);
  return ez | ((positionObj.y << 16) & this._positionMasks.y);
 },
};

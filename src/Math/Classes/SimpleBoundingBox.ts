import { BoundsObject, DimensionsVector3 } from "Math/Types/Math.types";
import { Position3Matrix } from "Math/Types/Math.types";
import { Vector3 } from "./Vector3.js";

export class SimpleBoundingBox {
 bounds = {
  minX: Infinity,
  maxX: -Infinity,
  minZ: Infinity,
  maxZ: -Infinity,
  minY: Infinity,
  maxY: -Infinity,
 };
 checkBounds = {
  minX: Infinity,
  maxX: -Infinity,
  minZ: Infinity,
  maxZ: -Infinity,
  minY: Infinity,
  maxY: -Infinity,
 };

 checkOrigion = new Vector3(0, 0, 0);

 _voxelCheckMap: Record<string, boolean> = {};
 _voxelCheckPoints: number[][] = [];
 _voxelBottomCheckPoints: number[][] = [];
 _voxelOrigionPoints: number[][] = [];

 constructor(public origion: Vector3, public dimensions: DimensionsVector3) {
  const ov = origion;
  this.checkOrigion.updateVector(ov.x, ov.y, ov.z);
  this._updateBounds();
  this._updateCheckBounds();
 }

 _updateBounds() {
  const ov = this.origion;
  this.bounds.minX = ov.x - this.dimensions.w / 2;
  this.bounds.maxX = ov.x + this.dimensions.w / 2;
  this.bounds.minZ = ov.z - this.dimensions.d / 2;
  this.bounds.maxZ = ov.z + this.dimensions.d / 2;
  this.bounds.minY = ov.y - this.dimensions.h / 2;
  this.bounds.maxY = ov.y + this.dimensions.h / 2;
 }

 _updateCheckBounds() {
  const cv = this.checkOrigion;
  this.checkBounds.minX = cv.x - this.dimensions.w / 2;
  this.checkBounds.maxX = cv.x + this.dimensions.w / 2;
  this.checkBounds.minZ = cv.z - this.dimensions.d / 2;
  this.checkBounds.maxZ = cv.z + this.dimensions.d / 2;
  this.checkBounds.minY = cv.y - this.dimensions.h / 2;
  this.checkBounds.maxY = cv.y + this.dimensions.h / 2;
 }

 updateOrigion(x: number, y: number, z: number) {
  this.origion.updateVector(x, y, z);
  this.origion.roundVector(2);
  this._updateBounds();
 }

 setOrigionToCheckOrigion() {
  const cv = this.checkOrigion;
  this.origion.updateVector(cv.x, cv.y, cv.z);

  this.bounds.minX = this.checkBounds.minX;
  this.bounds.maxX = this.checkBounds.maxX;
  this.bounds.minZ = this.checkBounds.minZ;
  this.bounds.maxZ = this.checkBounds.maxZ;
  this.bounds.minY = this.checkBounds.minY;
  this.bounds.maxY = this.checkBounds.maxY;
 }

 setCheckOrigion(x: number, y: number, z: number) {
  this.checkOrigion.updateVector(x, y, z);
  this._updateCheckBounds();
 }

 getCurrentOrigionPoints() {
  this._voxelOrigionPoints = [];
  const mx = this.bounds.minX;
  const my = this.bounds.minY;
  const mz = this.bounds.minZ;
  for (let y = my; y <= this.bounds.maxY; y++) {
   for (let x = mx - 1; x <= this.bounds.maxX + 1; x++) {
    for (let z = mz - 1; z <= this.bounds.maxZ + 1; z++) {
     const key = this._getPositionKey(x, y, z);
     if (!this._voxelCheckMap[key]) {
      this._voxelOrigionPoints.push([x, y, z]);
      this._voxelCheckMap[key] = true;
     }
    }
   }
  }
  this._voxelCheckMap = {};
  return this._voxelOrigionPoints;
 }

 getVoxelCheckPoints() {
  this._voxelCheckPoints = [];
  const mx = this.checkBounds.minX;
  const my = this.checkBounds.minY;
  const mz = this.checkBounds.minZ;
  for (let y = my; y <= this.checkBounds.maxY; y++) {
   for (let x = mx; x <= this.checkBounds.maxX + 1; x++) {
    for (let z = mz; z <= this.checkBounds.maxZ + 1; z++) {
     const key = this._getPositionKey(x, y, z);
     if (!this._voxelCheckMap[key]) {
      this._voxelCheckPoints.push([
       Math.floor(x),
       Math.floor(y),
       Math.floor(z),
      ]);
      this._voxelCheckMap[key] = true;
     }
    }
   }
  }
  this._voxelCheckMap = {};
  return this._voxelCheckPoints;
 }

 getVoxelBottomCheckPoints() {
  this._voxelBottomCheckPoints = [];
  const mx = this.checkBounds.minX;
  const my = this.checkBounds.minY;
  const mz = this.checkBounds.minZ;
  for (let y = my - 1; y <= my; y++) {
   for (let x = mx; x <= this.checkBounds.maxX + 1; x++) {
    for (let z = mz; z <= this.checkBounds.maxZ + 1; z++) {
     const key = this._getPositionKey(x, y, z);
     if (!this._voxelCheckMap[key]) {
      this._voxelBottomCheckPoints.push([
       Math.floor(x),
       Math.floor(y),
       Math.floor(z),
      ]);
      this._voxelCheckMap[key] = true;
     }
    }
   }
  }
  this._voxelCheckMap = {};
  return this._voxelBottomCheckPoints;
 }

 _getPositionKey(x: number, y: number, z: number) {
  return `${x}-${y}-${z}`;
 }

 isPointInsideBox(point: Position3Matrix) {
  const box = this.bounds;
  return (
   point.x >= box.minX &&
   point.x <= box.maxX &&
   point.y >= box.minY &&
   point.y <= box.maxY &&
   point.z >= box.minZ &&
   point.z <= box.maxZ
  );
 }

 doesBoxIntersect(testBox: BoundsObject) {
  const box = this.bounds;
  return (
   box.minX <= testBox.maxX &&
   box.maxX >= testBox.minX &&
   box.minY <= testBox.maxY &&
   box.maxY >= testBox.minY &&
   box.minZ <= testBox.maxZ &&
   box.maxZ >= testBox.minZ
  );
 }
}

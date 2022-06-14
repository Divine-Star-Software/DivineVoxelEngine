import { Plane } from "./Plane";

export type BoundingBoxData = {
 topPlane: Plane;
 bottomPlane: Plane;
 northPlane: Plane;
 southPlane: Plane;
 eastPlane: Plane;
 westPlane: Plane;
};
export class BoundingBox {
 topPlane: Plane;
 bottomPlane: Plane;
 northPlane: Plane;
 southPlane: Plane;
 eastPlane: Plane;
 westPlane: Plane;
 bounds = {
  minX : Infinity,
  maxX : -Infinity,
  minZ : Infinity,
  maxZ : -Infinity,
  minY : Infinity,
  maxY : -Infinity,
 };
 constructor(data: BoundingBoxData) {
  this.topPlane = data.topPlane;
  this._doMinMaxCheck(this.topPlane);
  this.bottomPlane = data.bottomPlane;
  this._doMinMaxCheck(this.bottomPlane);
  this.northPlane = data.northPlane;
  this._doMinMaxCheck(this.northPlane);
  this.southPlane = data.southPlane;
  this._doMinMaxCheck(this.southPlane);
  this.eastPlane = data.eastPlane;
  this._doMinMaxCheck(this.eastPlane);
  this.westPlane = data.westPlane;
  this._doMinMaxCheck(this.westPlane);
 }

 _doMinMaxCheck(plane: Plane) {
  if (plane.minX <= this.bounds.minX) this.bounds.minX = plane.minX;
  if (plane.maxX >= this.bounds.maxX) this.bounds.maxX = plane.maxX;
  if (plane.minY <= this.bounds.minY) this.bounds.minY = plane.minY;
  if (plane.maxY >= this.bounds.maxY) this.bounds.maxY = plane.maxY;
  if (plane.minZ <= this.bounds.minZ) this.bounds.minZ = plane.minZ;
  if (plane.maxZ >= this.bounds.maxZ) this.bounds.maxZ = plane.maxZ;
 }
}

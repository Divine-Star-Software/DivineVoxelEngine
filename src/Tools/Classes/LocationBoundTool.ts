import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";

export class LocationBoundTool {
 location: LocationData = ["main", 0, 0, 0];

 get dimension() {
  return this.location[0];
 }
 set dimension(dimension: string) {
  this.location[0] = dimension;
 }
 get x() {
  return this.location[1];
 }
 set x(value: number) {
  this.location[1] = value;
 }
 get y() {
  return this.location[2];
 }
 set y(value: number) {
  this.location[2] = value;
 }

 get z() {
  return this.location[3];
 }
 set z(value: number) {
  this.location[3] = value;
 }

 setDimension(dimensionId: string) {
  this.location[0] = dimensionId;
  return this;
 }

 getLocation(): LocationData {
  return this.location;
 }

 setXYZ(x: number, y: number, z: number) {
  this.location[1] = x;
  this.location[2] = y;
  this.location[3] = z;
  return this;
 }

 setXZ(x: number, z: number) {
  this.setXYZ(x, this.location[2], z);
  return this;
 }

 setLocation(location: LocationData) {
  this.location[0] = location[0];
  this.location[1] = location[1];
  this.location[2] = location[2];
  this.location[3] = location[3];
  return this;
 }
}

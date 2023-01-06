import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";

export class LocationBoundTool {
 location: LocationData = ["main", 0, 0, 0];

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

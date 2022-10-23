import type { AddVoxelData } from "Meta/Data/WorldData.types";
import { DimensionsData } from "../../Data/Dimensions/DimensionsData.js";
import { WorldData } from "../../Data/World/WorldData.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
export class VoxelBrush {
 data: AddVoxelData = {
  id: "",
  position: [0, 0, 0],
  state: 0,
  shapeState: 0,
  dimension: 0,
  secondaryState: 0,
  secondaryVoxelId: "",
 };
 setId(id: string, state = 0, shapeState = 0) {
  this.data.id = id;
  this.data.state = state;
  this.data.shapeState = shapeState;
  return this;
 }
 setDimension(dimensionId: string | number) {
  this.data.dimension = DimensionsData.getDimensionNumericId(dimensionId);
  return this;
 }
 setSecondaryId(id: string, state = 0) {
  this.data.secondaryVoxelId = id;
  this.data.secondaryState = state;
  return this;
 }
 setState(state: number) {
  this.data.state = state;
  return this;
 }
 setShapeState(state: number) {
  this.data.shapeState = state;
  return this;
 }
 setXYZ(x: number, y: number, z: number) {
  this.data.position[0] = x;
  this.data.position[1] = y;
  this.data.position[2] = z;
  return this;
 }
 getData() {
  return this.data;
 }
 paint() {
  WorldData.paint.voxel(this.data);
  return this;
 }
 
 start() {
  WorldRegister.cache.enable();
  return this;
 }
 stop() {
  WorldRegister.cache.disable();
  return this;
 }
}

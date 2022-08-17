import {
 VoxelDataByteLengths,
 VoxelDataIndexes,
} from "../Constants/Voxels/VoxelData.js";
import { MatrixMap } from "./MatrixMap.js";

export const VoxelMatrix = {
 byteLength: VoxelDataByteLengths,
 indexes: VoxelDataIndexes,

 matrixMap: MatrixMap,

 voxelData: {
  substance: 0,
  shapeId: 0,
  hardness: 0,
  material: 0,
  checkCollision: 0,
  colliderId: 0,
  lightSource: 0,
  lightValue: 0,
 },

 voxelDataView: new DataView(new ArrayBuffer(0)),
 voxelMap: new Uint16Array(0),

 syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer) {
  this.voxelDataView = new DataView(voxelBuffer);
  this.voxelMap = new Uint16Array(voxelMapBuffer);
 },

 getVoxelData(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  this.voxelData.substance = this.voxelDataView.getUint8(
   this.indexes.substance + index
  );
  this.voxelData.shapeId = this.voxelDataView.getUint16(
   this.indexes.shapeId + index
  );
  this.voxelData.hardness = this.voxelDataView.getUint16(
   this.indexes.hardness + index
  );
  this.voxelData.material = this.voxelDataView.getUint16(
   this.indexes.material + index
  );
  this.voxelData.checkCollision = this.voxelDataView.getUint8(
   this.indexes.checkCollision + index
  );
  this.voxelData.colliderId = this.voxelDataView.getUint16(
   this.indexes.colliderId + index
  );
  this.voxelData.lightSource = this.voxelDataView.getUint8(
   this.indexes.lightSource + index
  );
  this.voxelData.lightValue = this.voxelDataView.getUint16(
   this.indexes.lightValue + index
  );
  return this.voxelData;
 },

 getSubstance(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.substance + index);
 },

 getTrueSubstance(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  const substnaceId = this.voxelDataView.getUint8(
   this.indexes.substance + index
  );
  return this.matrixMap.substanceRecord[substnaceId];
 },
 getShapeId(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint16(this.indexes.shapeId + index);
 },
 getHardness(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint16(this.indexes.hardness + index);
 },
 getCheckCollisions(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.checkCollision + index);
 },
 getColliderId(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint16(this.indexes.colliderId + index);
 },
 isLightSource(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.lightSource + index) == 1;
 },
 getLightValue(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint16(this.indexes.lightValue + index);
},
};

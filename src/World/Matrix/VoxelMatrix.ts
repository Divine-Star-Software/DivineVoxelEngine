import { DVEW } from "../DivineVoxelEngineWorld.js";
import {
 VoxelDataByteLengths,
 VoxelDataIndexes,
} from "../../Constants/Voxels/VoxelData.js";
import { VoxelSubstanceType } from "Meta/index.js";

export const VoxelMatrix = {
 byteLength: VoxelDataByteLengths,
 indexes: VoxelDataIndexes,

 substanceMap: <Record<VoxelSubstanceType, number>>{
  solid: 0,
  transparent: 1,
  flora: 2,
  fluid: 3,
  magma: 4,
 },

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

 voxelBuffer: new ArrayBuffer(0),
 voxelDataView: new DataView(new ArrayBuffer(0)),
 voxelMap: new Uint16Array(0),

 $INIT() {
  const totalVoxels = Object.keys(DVEW.voxelManager.voxelData).length;
  const buffer = new ArrayBuffer(totalVoxels * this.byteLength.totalLength);
  const dv = new DataView(buffer);

  const totalRegisteredVoxels =
   DVEW.worldGeneration.voxelPalette.voxelPaletteCount;
  const voxelMap = new Uint16Array(totalRegisteredVoxels);

  const vp = DVEW.worldGeneration.voxelPalette;
  let currentCount = 0;
  let currentParent = 2;

  for (let i = 2; i < voxelMap.length; i++) {
   let newParent = vp.getVoxelPartentId(i);
   if (newParent != currentParent) {
    currentCount++;
    currentParent = newParent;
   }
   voxelMap[i] = currentCount;
  }

  const done: Record<number, boolean> = {};
  for (let paletteId = 2; paletteId < voxelMap.length; paletteId++) {
   const indexId = voxelMap[paletteId];
   if (done[indexId]) continue;
   done[indexId] = true;
   const tvid = vp.getVoxelData(paletteId);
   const vdata = DVEW.voxelManager.getVoxelData(tvid[0]);
   let index = indexId * this.byteLength.totalLength;
   //substance
   dv.setUint8(
    index + this.indexes.substance,
    this.substanceMap[vdata.substance]
   );
   //shapeId
   dv.setUint16(index + this.indexes.shapeId, 0);
   //hardness
   dv.setUint16(index + this.indexes.hardness, vdata.hardnress);
   //material
   dv.setUint16(index + this.indexes.material, 0);
   //check collisions
   dv.setUint8(
    index + this.indexes.checkCollision,
    vdata.physics?.checkCollisions ? 1 : 0
   );
   //collider id
   dv.setUint16(
    index + this.indexes.colliderId,
    vdata.physics?.collider ? 1 : 0
   );
   //light source
   dv.setUint8(index + this.indexes.lightSource, vdata.lightSource ? 1 : 0);
   //light value
   dv.setUint8(
    index + this.indexes.lightValue,
    vdata.lightValue ? vdata.lightValue : 0
   );
  }

  this.voxelMap = voxelMap;
  this.voxelBuffer = buffer;
  this.voxelDataView = dv;
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
 getShapeId(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.shapeId + index);
 },
 getHardness(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.hardness + index);
 },
 getCheckCollisions(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.checkCollision + index);
 },
 getColliderId(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.colliderId + index);
 },
 isLightSource(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.lightSource + index);
 },
 getLightValue(id: number) {
  const index = this.voxelMap[id] * this.byteLength.totalLength;
  return this.voxelDataView.getUint8(this.indexes.lightValue + index);
 },
};

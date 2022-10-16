import { DVEW } from "../DivineVoxelEngineWorld.js";
import {
 VoxelDataByteLengths,
 VoxelDataIndexes,
 VoxelSubstanceMap,
} from "../../Constants/Voxels/VoxelData.js";

export const VoxelDataCreator = {
 voxelBuffer: new SharedArrayBuffer(0),
 voxelMapBuffer: new SharedArrayBuffer(0),

 shapeMap: <Record<string, number>>{},

 __shapeMapSet: false,

 isReady() {
  return this.__shapeMapSet;
 },

 $INIT() {
  const byteLength = DVEW.data.maps.voxels.byteLengths;
  const indexes = DVEW.data.maps.voxels.dataIndexes;
  const substanceMap = DVEW.data.maps.voxels.substanceMap;
  const shapeMap = this.shapeMap;
  const totalVoxels = Object.keys(DVEW.voxelManager.voxelData).length;
  const buffer = new SharedArrayBuffer(totalVoxels * byteLength.totalLength);
  const dv = new DataView(buffer);

  const totalRegisteredVoxels =
   DVEW.worldGeneration.voxelPalette.voxelPaletteCount;
  const voxelMapBuffer = new SharedArrayBuffer(totalRegisteredVoxels * 2);
  const voxelMap = new Uint16Array(voxelMapBuffer);

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
   const tvid = vp.getVoxelTrueId(paletteId);
   const vdata = DVEW.voxelManager.getVoxelData(tvid);
   let index = indexId * byteLength.totalLength;
   //substance
   dv.setUint8(index + indexes.substance, substanceMap[vdata.substance]);
   //shapeId
   dv.setUint16(index + indexes.shapeId, shapeMap[vdata.shapeId]);
   //hardness
   dv.setUint16(index + indexes.hardness, vdata.hardnress);
   //material
   dv.setUint16(index + indexes.material, 0);
   //check collisions
   dv.setUint8(
    index + indexes.checkCollision,
    vdata.physics?.checkCollisions ? 1 : 0
   );
   //collider id
   dv.setUint16(index + indexes.colliderId, vdata.physics?.collider ? 1 : 0);
   //light source
   dv.setUint8(index + indexes.lightSource, vdata.lightSource ? 1 : 0);
   //light value
   dv.setUint16(
    index + indexes.lightValue,
    vdata.lightValue ? vdata.lightValue : 0
   );
  }
  this.voxelMapBuffer = voxelMapBuffer;
  this.voxelBuffer = buffer;
  DVEW.data.voxel.syncData(this.voxelBuffer, this.voxelMapBuffer);
 },

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  this.__shapeMapSet = true;
 },

 flush() {
  (this as any).shapeMap = null;
 },
};

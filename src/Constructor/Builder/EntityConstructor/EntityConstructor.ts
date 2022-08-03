import { Util } from "../../../Global/Util.helper.js";
import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
export const EntityConstructor = {
 voxelData: <Uint32Array[]>[],
 _3dArray: Util.getEntityFlat3dArray(),
 voxelByte: Util.getVoxelByte(),
 lightByte: Util.getLightByte(),
 pos: { x: 0, y: 0, z: 0 },

 totalComposed: 1,
 width: 0,
 depth: 0,
 height: 0,

 setEntityData(
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  depth: number,
  composed: number,
  voxelData: Uint32Array[]
 ) {
  this.pos.x = x;
  this.pos.y = y;
  this.pos.z = z;
  this.width = width;
  this.height = height;
  this.depth = depth;
  this.totalComposed = composed;
  this.voxelData = voxelData;

  this._3dArray.setBounds(width, height, depth);
 },
 getVoxel(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed - 1];
  const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
  const numericVoxelId = this.voxelByte.getId(voxelData);
  if (numericVoxelId == 0) return ["dve:air"];
  if (numericVoxelId == 1) return ["dve:barrier"];
  const voxelPaletteId = WorldMatrix.globalVoxelPalette[numericVoxelId];
  const trueVoxelId = WorldMatrix.globalVoxelPaletteRecord[voxelPaletteId];
  return trueVoxelId;
 },
 getLevel(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed];
  const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelByte.decodeLevelFromVoxelData(stateData);
 },
 getLevelState(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed];
  const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelByte.decodeLevelStateFromVoxelData(stateData);
 },
 getShapeState(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed];
  const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelByte.getShapeState(stateData);
 },
 getLight(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed - 1];
  const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelByte.decodeLightFromVoxelData(voxelData);
 },
 clearEntityData() {
  this.pos.x = 0;
  this.pos.y = 0;
  this.pos.z = 0;
  this.width = 0;
  this.height = 0;
  this.depth = 0;
  this.totalComposed = 0;
  this.voxelData = [];
 },
};

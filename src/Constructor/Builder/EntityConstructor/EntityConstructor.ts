import { VoxelReader } from "../../../Data/Voxel/VoxelByte.js";
import { EntityFlat3dArray } from "../../../Data/Entity/EntityFlat3dArray.js";
import { WorldData } from "../../../Data/World/WorldData.js";
import { LightData } from "../../../Data/Light/LightByte.js";

export const EntityConstructor = {
 voxelData: <Uint32Array[]>[],
 _3dArray: EntityFlat3dArray,
 voxelReader: VoxelReader,
 lightByte: LightData,
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
 getVoxel(x: number, y: number, z: number, composed: number = 1) : [string,number] | false{
  const rawVoxelData = this.voxelData[composed - 1];
  const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
  const numericVoxelId = this.voxelReader.getId(voxelData);
  if (numericVoxelId == 0) return WorldData.voxel._air;
  if (numericVoxelId == 1) return WorldData.voxel._barrier;
  const paletteId =  WorldData.voxelPalette[numericVoxelId];
  const mapId = WorldData.voxelPaletteMap[paletteId];
  return [paletteId, numericVoxelId - mapId];
 },
 getLevel(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed];
  const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelReader.getLevel(stateData);
 },
 getLevelState(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed];
  const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelReader.getLevelState(stateData);
 },
 getShapeState(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed];
  const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelReader.getShapeState(stateData);
 },
 getLight(x: number, y: number, z: number, composed: number = 1) {
  const rawVoxelData = this.voxelData[composed - 1];
  const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
  return this.voxelReader.getLight(voxelData);
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

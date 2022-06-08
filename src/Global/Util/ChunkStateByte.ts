import { VoxelSubstanceType } from "Meta/index.js";
import { Position3Matrix } from "Meta/Util.types.js";
import { PositionByte } from "./PositionByte.js";

export const ChunkStateByte = {
 positionByte: PositionByte,
 indexes: {
  states: 0,
  minHeight: 1,
  maxHeight: 2,
  voxelCount1: 3,
  voxelCount2: 4,
  voxelCount3: 5,
 },
 _chunkStates: {
  empty: false,
  worldGenDone: false,
  sunLightDone: false,
  RGBLightDone: false,
  fluidDone: false,
  magmaDone: false,
 },
 _chunkStateMask: {
  empty: 0b1,
  emptyIndex: 0,
  worldGenDone: 0b10,
  worldGenIndex: 1,
  sunLightDone: 0b100,
  sunLightIndex: 2,
  RGBLightDone: 0b1000,
  RGBLightIndex: 3,
  fluidDone: 0b1000,
  fluidIndex: 4,
  magmaDone: 0b10000,
  magmaIndex: 5,
 },

 updateChunkMinMax(voxelPOS: Position3Matrix, chunkStatesData: Uint32Array) {
  const currentMin = this.positionByte.getY(
   chunkStatesData[this.indexes.minHeight]
  );
  const currentMax = this.positionByte.getY(
   chunkStatesData[this.indexes.maxHeight]
  );
  if (voxelPOS.y < currentMin) {
   chunkStatesData[this.indexes.minHeight] =
    this.positionByte.setPositionUseObj(voxelPOS);
  }
  if (voxelPOS.y > currentMax) {
   chunkStatesData[this.indexes.maxHeight] =
    this.positionByte.setPositionUseObj(voxelPOS);
  }
 },
 getChunkMin(chunkStatesData: Uint32Array) {
  return this.positionByte.getY(chunkStatesData[this.indexes.minHeight]);
 },
 getChunkMax(chunkStatesData: Uint32Array) {
  return this.positionByte.getY(chunkStatesData[this.indexes.maxHeight]);
 },
 isEmpty(chunkStatesData: Uint32Array) {
  const bv = chunkStatesData[this.indexes.states];
  return (
   (bv & this._chunkStateMask.empty) >> this._chunkStateMask.emptyIndex == 1
  );
 },
 isWorldGenDone(chunkStatesData: Uint32Array) {
  const bv = chunkStatesData[this.indexes.states];
  return (
   (bv & this._chunkStateMask.worldGenDone) >>
    this._chunkStateMask.worldGenIndex ==
   1
  );
 },
 isSunLightUpdatesDone(chunkStatesData: Uint32Array) {
  const bv = chunkStatesData[this.indexes.states];
  return (
   (bv & this._chunkStateMask.sunLightDone) >>
    this._chunkStateMask.sunLightIndex ==
   1
  );
 },
 isRGBLightUpdatesDone(chunkStatesData: Uint32Array) {
  const bv = chunkStatesData[this.indexes.states];
  return (
   (bv & this._chunkStateMask.RGBLightDone) >>
    this._chunkStateMask.RGBLightIndex ==
   1
  );
 },
 isFluidFlowDone(chunkStatesData: Uint32Array) {
  const bv = chunkStatesData[this.indexes.states];
  return (
   (bv & this._chunkStateMask.fluidDone) >> this._chunkStateMask.fluidIndex == 1
  );
 },
 isMagmaFlowDone(chunkStatesData: Uint32Array) {
  const bv = chunkStatesData[this.indexes.states];
  return (
   (bv & this._chunkStateMask.magmaDone) >> this._chunkStateMask.magmaIndex == 1
  );
 },
 getFullChunkStates(chunkStatesData: Uint32Array) {
  this._chunkStates.empty = this.isEmpty(chunkStatesData);
  this._chunkStates.worldGenDone = this.isWorldGenDone(chunkStatesData);
  this._chunkStates.sunLightDone = this.isSunLightUpdatesDone(chunkStatesData);
  this._chunkStates.RGBLightDone = this.isRGBLightUpdatesDone(chunkStatesData);
  this._chunkStates.fluidDone = this.isFluidFlowDone(chunkStatesData);
  this._chunkStates.magmaDone = this.isMagmaFlowDone(chunkStatesData);
  return this._chunkStates;
 },
 addToVoxelCount(
  voxelSubstance: VoxelSubstanceType,
  chunkStatesData: Uint32Array
 ) {},
 subtractFromVoxelCount(
  voxelSubstance: VoxelSubstanceType,
  chunkStatesData: Uint32Array
 ) {},
 getTotalVoxels(chunkStatesData: Uint32Array) {},
 getTotalVoxelsOfASubstance(
  voxelSubstance: VoxelSubstanceType,
  chunkStatesData: Uint32Array
 ) {},
};

//types
import type { WorldGenInterface } from "Meta/WorldGen/WorldGen.types";
import type { VoxelData } from "Meta/index.js";
import type { MatrixLoadedChunk } from "Meta/Matrix/Matrix.types.js";
import type { Position3Matrix } from "Meta/Util.types.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { Util } from "../../Global/Util.helper.js";
import { ConstructorToWorldMessages } from "../../Constants/InterComms/ConstructorToWorld.js";
//matrix
import { WorldMatrix } from "../../Matrix/WorldMatrix.js";
import { MatrixHub } from "../../Matrix/MatrixHub.js";
export const DVEWG = {
 worldGen: <WorldGenInterface | null>null,

 heightByte: Util.getHeightByte(),
 voxelByte: Util.getVoxelByte(),
 _3dArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),

 setWorldGen(worldGen: WorldGenInterface) {
  this.worldGen = worldGen;
 },

 async generate(x: number, z: number, data: any) {
  if (!this.worldGen) {
   throw new Error(`A World Generator must be set.`);
  }

 
  await this.worldGen.generate(this, x, z, data);

  DVEC.queues.finishGenerating();
 },

 __handleHeightMapUpdateForVoxelAdd(
  voxelPOS: Position3Matrix,
  voxelData: VoxelData,
  chunk: MatrixLoadedChunk
 ) {
  let substance = voxelData.substance;
  if (substance == "transparent") {
   substance = "solid";
  }
  this.heightByte.calculateHeightAddDataForSubstance(
   voxelPOS.y,
   substance,
   voxelPOS.x,
   voxelPOS.z,
   chunk.heightMap
  );
  this.heightByte.updateChunkMinMax(voxelPOS, chunk.minMaxMap);
 },

 getVoxelPaletteId(voxelId: string, voxelStateId: string) {
  const paletteId = WorldMatrix.getVoxelPalette(voxelId, voxelStateId);
  if (paletteId) {
   return this.voxelByte.setId(paletteId, 0);
  }
  return -1;
 },

 _paintVoxel(
  voxelId: string,
  voxelStateId: string,
  shapeState: number,
  x: number,
  y: number,
  z: number
 ) {
  const chunk = WorldMatrix.getChunk(x, y, z);
  if (!chunk) {
   throw new Error("Chunk could not be loaded");
  }
  const voxelCheck = DVEC.voxelManager.getVoxel(voxelId);

  const voxelData = voxelCheck.data;
  if (!voxelData) {
   throw Error(`Voxel data with ID ${voxelId} does not exists`);
  }
  const data = this.getVoxelPaletteId(voxelId, voxelStateId);
  if (data < 0) return;
  const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
  this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelData, chunk);
  let stateData = this.voxelByte.setShapeState(0, shapeState);
  this._3dArray.setValueUseObj(voxelPOS, chunk.voxelStates, stateData);
  this._3dArray.setValueUseObj(voxelPOS, chunk.voxels, data);
  if (DVEC.settings.doRGBPropagation()) {
   this._addToRGBLightUpdateQue(voxelData, x, y, z);
  }
 },

 _addToRGBLightUpdateQue(
  voxelData: VoxelData,
  x: number,
  y: number,
  z: number
 ) {
  if (voxelData.lightSource && voxelData.lightValue) {
   DVEC.worldComm.sendMessage(
    ConstructorToWorldMessages.addToRGBLightUpdateQue,
    [x, y, z]
   );
  }
 },

 async paintVoxel(
  voxelId: string,
  voxelState: string,
  shapeState: number,
  x: number,
  y: number,
  z: number
 ) {
  if (!WorldMatrix.getChunk(x, y, z)) {
   await MatrixHub.requestChunkLoad(x, y, z);
   DVEWG._paintVoxel(voxelId, voxelState, shapeState, x, y, z);
  } else {
   DVEWG._paintVoxel(voxelId, voxelState, shapeState, x, y, z);
  }
 },
};

export type DivineVoxelEngineWorldGeneration = typeof DVEWG;

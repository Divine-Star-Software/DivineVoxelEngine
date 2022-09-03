//types
import type { MatrixLoadedChunk } from "Meta/Matrix/Matrix.types.js";
import type {
 DirectionNames,
 EngineSettingsData,
 VoxelConstructorObject,
 VoxelData,
 VoxelSubstanceType,
} from "Meta/index.js";
//objects
import { Util } from "../../../Global/Util.helper.js";
import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
//functions
import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";
import { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
import { VoxelProcessData } from "Meta/Constructor/Voxel.types.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";
import { CalculateFlow } from "./Functions/CalculateFlow.js";
import { CullFaceOverride } from "Meta/Constructor/OverRide.types";

/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const Processor = {
 LOD: 1,
 heightByte: Util.getHeightByte(),
 voxelByte: Util.getVoxelByte(),
 faceByte: Util.getFaceByte(),
 _3dArray: Util.getFlat3DArray(),
 lightByte: Util.getLightByte(),
 worldMatrix: WorldMatrix,
 calculatFlow: CalculateFlow,
 voxellightMixCalc: VoxelLightMixCalc,
 doVoxelLight: CalculateVoxelLight,
 chunkTemplates: <Record<number, Record<number, number[][]>>>{},
 exposedFaces: <number[]>[],
 faceStates: <number[]>[],
 textureRotation: <Rotations[]>[],
 settings: {
  doAO: true,
  doSun: true,
  doRGB: true,
  ignoreSun: false,
  entity: false,
  composedEntity: 1,
 },
 voxelProcesseData: <VoxelProcessData>{
  voxelState: 0,
  voxelShapeState: 0,
  level: 0,
  levelState: 0,
  exposedFaces: [],
  faceStates: [],
  textureRotations: [],
  overlayUVTemplate: [],
  uvTemplate: [],
  colorTemplate: [],
  aoTemplate: [],
  lightTemplate: [],
  x: 0,
  y: 0,
  z: 0,
 },
 cullFaceOverrideData: <any>{
  face: "south",
  substanceResult: true,
  shapeState: 0,
  voxel: {},
  neighborVoxel: 0,
  neighborVoxelShape: {},
  neighborVoxelShapeState: 0,
  x: 0,
  y: 0,
  z: 0,
 },
 aoOverRideData: <any>{
  face: "",
  substanceResult: true,
  shapeState: 0,
  voxel: {},
  neighborVoxel: {},
  neighborVoxelShape: {},
  neighborVoxelShapeState: 0,
  x: 0,
  y: 0,
  z: 0,
  nx: 0,
  ny: 0,
  nz: 0,
 },
 template: <FullChunkTemplate>{
  solid: {
   positionTemplate: [],
   faceTemplate: [],
   uvTemplate: [],
   overlayUVTemplate: [],
   shapeTemplate: [],
   shapeStateTemplate: [],
   colorTemplate: [],
   lightTemplate: [],
   aoTemplate: [],
  },
  transparent: {
   positionTemplate: [],
   faceTemplate: [],
   uvTemplate: [],
   overlayUVTemplate: [],
   shapeTemplate: [],
   shapeStateTemplate: [],
   colorTemplate: [],
   lightTemplate: [],
   aoTemplate: [],
  },
  flora: {
   positionTemplate: [],
   faceTemplate: [],
   uvTemplate: [],
   overlayUVTemplate: [],
   shapeTemplate: [],
   shapeStateTemplate: [],
   colorTemplate: [],
   lightTemplate: [],
   aoTemplate: [],
  },
  fluid: {
   positionTemplate: [],
   faceTemplate: [],
   uvTemplate: [],
   overlayUVTemplate: [],
   shapeTemplate: [],
   shapeStateTemplate: [],
   colorTemplate: [],
   lightTemplate: [],
   aoTemplate: [],
   flowTemplate: [],
  },
  magma: {
   positionTemplate: [],
   faceTemplate: [],
   uvTemplate: [],
   overlayUVTemplate: [],
   shapeTemplate: [],
   shapeStateTemplate: [],
   colorTemplate: [],
   lightTemplate: [],
   aoTemplate: [],
   flowTemplate: [],
  },
 },

 faceIndexMap: <Record<DirectionNames, number>>{
  top: 0,
  bottom: 1,
  east: 2,
  west: 3,
  south: 4,
  north: 5,
 },

 $INIT() {
  this.voxelProcesseData.faceStates = this.faceStates;
  this.voxelProcesseData.exposedFaces = this.exposedFaces;
  this.voxelProcesseData.textureRotations = this.textureRotation;
 },

 getVoxelSubstance(x: number, y: number, z: number, getSecond = false) {
  return this.worldMatrix.getVoxelSubstance(x, y, z, getSecond);
 },

 getVoxelShapeId(x: number, y: number, z: number, getSecond = false) {
  return this.worldMatrix.getVoxelShapeId(x, y, z, getSecond);
 },

 getVoxel(x: number, y: number, z: number, getSecond = false) {
  if (!this.settings.entity) {
   const voxel = this.worldMatrix.getVoxel(x, y, z, getSecond);
   if (!voxel) return false;
   if (voxel[0] == "dve:air") return false;
   return voxel;
  } else {
   if (getSecond) return false;
   return DVEB.entityConstructor.getVoxel(x, y, z);
  }
 },

 getVoxelShapeState(x: number, y: number, z: number, getSecond = false) {
  if (!this.settings.entity) {
   return this.worldMatrix.getVoxelShapeState(x, y, z);
  } else {
   return DVEB.entityConstructor.getShapeState(x, y, z);
  }
 },

 getVoxelLevel(x: number, y: number, z: number, getSecond = false) {
  if (!this.settings.entity) {
   return this.worldMatrix.getLevel(x, y, z);
  } else {
   return DVEB.entityConstructor.getLevel(x, y, z);
  }
 },

 getVoxelLevelState(x: number, y: number, z: number, getSecond = false) {
  if (!this.settings.entity) {
   return this.worldMatrix.getLevelState(x, y, z);
  } else {
   return DVEB.entityConstructor.getLevelState(x, y, z);
  }
 },

 getLight(x: number, y: number, z: number) {
  if (!this.settings.entity) {
   return this.worldMatrix.getLight(x, y, z);
  } else {
   return DVEB.entityConstructor.getLight(x, y, z);
  }
 },

 cullCheck(
  face: DirectionNames,
  voxelId: string,
  voxelShapeId: number,
  voxelSubstance: VoxelSubstanceType,
  shapeState: number,
  x: number,
  y: number,
  z: number,
  faceBit: number
 ) {
  const neighorVoxel = this.getVoxel(x, y, z);

  let finalResult = false;
  if (neighorVoxel) {
   const nvShapeId = this.getVoxelShapeId(x, y, z);
   const neighorSustance = this.getVoxelSubstance(x, y, z);
   let substanceRuleResult = DVEB.voxelHelper.substanceRuleCheck(
    voxelSubstance,
    neighorSustance
   );

   const voxelShape = DVEC.DVEB.shapeManager.getShape(voxelShapeId);
   const neighborVoxelShape = DVEC.DVEB.shapeManager.getShape(nvShapeId);
   const neighborVoxelShapeState = this.getVoxelShapeState(x, y, z);

   const cullFaceOverride: CullFaceOverride = this.cullFaceOverrideData;
   cullFaceOverride.face = face;
   cullFaceOverride.substanceResult = substanceRuleResult;
   cullFaceOverride.shapeState = shapeState;
   cullFaceOverride.voxelId = voxelId;
   cullFaceOverride.voxelSubstance = voxelSubstance;
   cullFaceOverride.neighborVoxelId = neighorVoxel[0];
   cullFaceOverride.neighborVoxelSubstance = neighorSustance;
   cullFaceOverride.neighborVoxelShape = neighborVoxelShape;
   cullFaceOverride.neighborVoxelShapeState = neighborVoxelShapeState;
   cullFaceOverride.x = x;
   cullFaceOverride.y = y;
   cullFaceOverride.z = z;

   let shapeResult = voxelShape.cullFaceOverride(this.cullFaceOverrideData);
   if (!voxelShape.cullFaceOverride) {
    finalResult = shapeResult;
   } else {
    finalResult = voxelShape.cullFaceOverride(this.cullFaceOverrideData);
   }
  } else {
   finalResult = true;
  }

  const faceIndex = this.faceIndexMap[face];
  if (finalResult) {
   this.exposedFaces[faceIndex] = 1;
   this.faceStates[faceIndex] = 0;
   this.textureRotation[faceIndex] = 0;
   faceBit = this.faceByte.markFaceAsExposed(face, faceBit);
  } else {
   this.exposedFaces[faceIndex] = 0;
   this.faceStates[faceIndex] = -1;
   this.textureRotation[faceIndex] = 0;
  }
  return faceBit;
 },

 faceStateCheck(face: DirectionNames, faceBit: number) {
  const faceIndex = this.faceIndexMap[face];
  if (this.exposedFaces[faceIndex]) {
   faceBit = this.faceByte.setFaceRotateState(
    face,
    this.faceStates[faceIndex],
    faceBit
   );
   faceBit = this.faceByte.setFaceTextureState(
    face,
    this.textureRotation[faceIndex],
    faceBit
   );
  }
  return faceBit;
 },

 _process(
  template: FullChunkTemplate,
  x: number,
  y: number,
  z: number,
  doSecondCheck = true
 ) {
  const LOD = this.LOD;
  const voxelCheck = this.getVoxel(x, y, z, !doSecondCheck);
  if (doSecondCheck) {
   const secondVoxel = this.getVoxel(x, y, z, true);
   if (secondVoxel) {
    this._process(template, x, y, z, false);
   }
  }

  if (
   !voxelCheck ||
   voxelCheck[0] == "dve:air" ||
   voxelCheck[0] == "dve:barrier"
  )
   return;

  const voxelObject = DVEC.voxelManager.getVoxel(voxelCheck[0]);
  if (!voxelObject) return;
  const voxelState = voxelCheck[1];

  const voxelId = voxelCheck[0];
  const voxelTrueId = this.worldMatrix.getVoxelPaletteNumericId(voxelId, 0);
  const voxelShapeId = this.worldMatrix.voxelMatrix.getShapeId(voxelTrueId);
  const voxelShapeState = this.getVoxelShapeState(x, y, z);
  const voxelSubstance =
   this.worldMatrix.voxelMatrix.getTrueSubstance(voxelTrueId);

  let faceBit = 0;

  faceBit = this.cullCheck(
   "top",
   voxelId,
   voxelShapeId,
   voxelSubstance,
   voxelShapeState,
   x,
   y + LOD,
   z,
   faceBit
  );
  faceBit = this.cullCheck(
   "bottom",
   voxelId,
   voxelShapeId,
   voxelSubstance,
   voxelShapeState,
   x,
   y - LOD,
   z,
   faceBit
  );
  faceBit = this.cullCheck(
   "east",
   voxelId,
   voxelShapeId,
   voxelSubstance,
   voxelShapeState,
   x + LOD,
   y,
   z,
   faceBit
  );
  faceBit = this.cullCheck(
   "west",
   voxelId,
   voxelShapeId,
   voxelSubstance,
   voxelShapeState,
   x - LOD,
   y,
   z,
   faceBit
  );
  faceBit = this.cullCheck(
   "south",
   voxelId,
   voxelShapeId,
   voxelSubstance,
   voxelShapeState,
   x,
   y,
   z - LOD,
   faceBit
  );
  faceBit = this.cullCheck(
   "north",
   voxelId,
   voxelShapeId,
   voxelSubstance,
   voxelShapeState,
   x,
   y,
   z + LOD,
   faceBit
  );

  if (faceBit == 0) return;

  let baseTemplate;
  if (voxelSubstance == "transparent") {
   baseTemplate = template["solid"];
  } else {
   baseTemplate = template[voxelSubstance];
  }

  baseTemplate.shapeStateTemplate.push(voxelShapeState);

  let level = 0;
  let levelState = 0;
  level = this.getVoxelLevel(x, y, z);
  levelState = this.getVoxelLevelState(x, y, z);

  this.voxelProcesseData.voxelState = voxelState;
  this.voxelProcesseData.voxelShapeState = voxelShapeState;
  this.voxelProcesseData.level = level;
  this.voxelProcesseData.levelState = levelState;
  this.voxelProcesseData.x = x;
  this.voxelProcesseData.y = y;
  this.voxelProcesseData.z = z;
  this.voxelProcesseData.overlayUVTemplate = baseTemplate.overlayUVTemplate;
  this.voxelProcesseData.uvTemplate = baseTemplate.uvTemplate;
  this.voxelProcesseData.colorTemplate = baseTemplate.colorTemplate;
  this.voxelProcesseData.aoTemplate = baseTemplate.aoTemplate;
  this.voxelProcesseData.lightTemplate = baseTemplate.lightTemplate;

  voxelObject.process(this.voxelProcesseData, DVEB);

  baseTemplate.shapeTemplate.push(voxelShapeId);
  baseTemplate.positionTemplate.push(x, y, z);

  faceBit = this.faceStateCheck("top", faceBit);
  faceBit = this.faceStateCheck("bottom", faceBit);
  faceBit = this.faceStateCheck("east", faceBit);
  faceBit = this.faceStateCheck("west", faceBit);
  faceBit = this.faceStateCheck("south", faceBit);
  faceBit = this.faceStateCheck("north", faceBit);

  baseTemplate.faceTemplate.push(faceBit);

  if (
   this.exposedFaces[0] &&
   (voxelSubstance == "fluid" || voxelSubstance == "magma")
  ) {
   this.calculatFlow(
    voxelId,
    this.faceStates[0] == 1,
    x,
    y,
    z,
    (baseTemplate as any).flowTemplate
   );
  }
 },

 constructEntity(composed = 1) {
  this.settings.entity = true;
  this.settings.composedEntity = composed;

  const maxX = DVEB.entityConstructor.width;
  const maxY = DVEB.entityConstructor.height;
  const maxZ = DVEB.entityConstructor.depth;
  for (let x = 0; x < maxX; x++) {
   for (let z = 0; z < maxZ; z++) {
    for (let y = 0; y < maxY; y++) {
     this._process(this.template, x, y, z);
    }
   }
  }
  return this.template;
 },

 makeAllChunkTemplates(
  chunk: MatrixLoadedChunk,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  LOD = 1
 ): FullChunkTemplate {
  this.settings.entity = false;
  this.LOD = LOD;
  const template: FullChunkTemplate = this.template;
  let maxX = DVEC.worldBounds.chunkXSize;
  let maxZ = DVEC.worldBounds.chunkZSize;

  for (let x = 0; x < maxX; x += LOD) {
   for (let z = 0; z < maxZ; z += LOD) {
    let minY = this.heightByte.getLowestExposedVoxel(x, z, chunk.data);
    let maxY = this.heightByte.getHighestExposedVoxel(x, z, chunk.data) + 1;
    for (let y = minY; y < maxY; y += LOD) {
     this._process(template, x + chunkX, y + chunkY, z + chunkZ);
    }
   }
  }

  return this.template;
 },

 processVoxelLight(data: VoxelProcessData, ignoreAO = false): void {
  this.doVoxelLight(data, data.x, data.y, data.z, ignoreAO, this.LOD);
 },

 syncSettings(settings: EngineSettingsData) {
  const materials = settings.materials;
  if (materials?.doAO) {
   this.settings.doAO = true;
  }
  if (materials?.doRGBLight) {
   this.settings.doRGB = true;
  }
  if (materials?.doSunLight) {
   this.settings.doSun = true;
  }
 },

 flush() {
  this.voxelProcesseData.voxelState = 0;
  this.voxelProcesseData.voxelShapeState = 0;
  this.voxelProcesseData.level = 0;
  this.voxelProcesseData.levelState = 0;
  this.voxelProcesseData.x = 0;
  this.voxelProcesseData.y = 0;
  this.voxelProcesseData.z = 0;
  this.voxelProcesseData.overlayUVTemplate = [];
  this.voxelProcesseData.uvTemplate = [];
  this.voxelProcesseData.colorTemplate = [];
  this.voxelProcesseData.aoTemplate = [];
  this.voxelProcesseData.lightTemplate = [];

  for (const substance of Object.keys(this.template)) {
   //@ts-ignore
   for (const templateKey of Object.keys(this.template[substance])) {
    (this as any).template[substance][templateKey] = [];
   }
  }
 },
};

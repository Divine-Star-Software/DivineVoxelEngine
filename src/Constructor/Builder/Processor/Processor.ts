//types
import type {
 DirectionNames,
 EngineSettingsData,
 VoxelConstructorObject,
 VoxelShape,
 VoxelSubstanceType,
} from "Meta/index.js";
import type { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
import type { VoxelProcessData } from "Meta/Constructor/Voxel.types.js";
import type { FaceDataOverride } from "Meta/Constructor/OverRide.types";
import type { TextureRotations } from "Meta/Constructor/Geometry/Geometry.types.js";

//functions
import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";
import { CalculateFlow } from "./Functions/CalculateFlow.js";
//objects
import { Builder } from "../Builder.js";
//data
import { FaceByte } from "../../../Data/Meshing/FaceByte.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
//maps
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";

import { FaceMap } from "../../../Data/Constants/Util/Faces.js";
//tools
import { GetConstructorDataTool } from "../../../Constructor/Tools/Data/ConstructorDataTool.js";
import { HeightMapTool } from "../../../Tools/Data/HeightMapTool.js";
import { OverrideManager } from "../Overrides/OverridesManager.js";

const mDT = GetConstructorDataTool();
const nDT = GetConstructorDataTool();
const heightMapTool = new HeightMapTool();

/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const Processor = {
 LOD: 1,
 mDataTool: mDT,
 nDataTool: nDT,
 faceByte: FaceByte,
 lightData: LightData,
 calculatFlow: CalculateFlow,
 voxellightMixCalc: VoxelLightMixCalc,
 doVoxelLight: CalculateVoxelLight,

 exposedFaces: <number[]>[],
 faceStates: <number[]>[],
 textureRotation: <TextureRotations[]>[],
 settings: {
  doAO: true,
  doSun: true,
  doRGB: true,
  ignoreSun: false,
  entity: false,
  composedEntity: 1,
 },
 voxelProcesseData: <VoxelProcessData>{
  dimension: 0,
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
 faceDataOverride: <FaceDataOverride>{
  face: "south",
  default: false,
  currentVoxel: mDT,
  neighborVoxel: nDT,
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
  liquid: {
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

 dimension: 0,

 $INIT() {
  this.voxelProcesseData.faceStates = this.faceStates;
  this.voxelProcesseData.exposedFaces = this.exposedFaces;
  this.voxelProcesseData.textureRotations = this.textureRotation;
 },

 cullCheck(
  face: DirectionNames,
  voxelObject: VoxelConstructorObject,
  voxelShape: VoxelShape,
  voxelSubstance: VoxelSubstanceType,
  x: number,
  y: number,
  z: number,
  faceBit: number
 ) {
  const voxelExists = this.nDataTool.loadIn(x, y, z);
  let finalResult = false;
  if (voxelExists && this.nDataTool.isRenderable()) {
   let substanceRuleResult = Builder.voxelHelper.substanceRuleCheck(
    voxelSubstance,
    this.nDataTool.getSubstance()
   );
   this.faceDataOverride.face = face;
   this.faceDataOverride.default = substanceRuleResult;
   finalResult = substanceRuleResult;
   this.faceDataOverride.default = finalResult;
   finalResult = OverrideManager.runOverride(
    "CullFace",
    voxelShape.id,
    "Any",
    this.faceDataOverride
   );
   this.faceDataOverride.default = finalResult;
   finalResult = OverrideManager.runOverride(
    "CullFace",
    voxelShape.id,
    this.nDataTool.getVoxelShapeObj().id,
    this.faceDataOverride
   );
   this.faceDataOverride.default = finalResult;
   finalResult = OverrideManager.runOverride(
    "CullFace",
    voxelObject.id,
    this.nDataTool.getVoxelShapeObj().id,
    this.faceDataOverride
   );
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
  doSecondCheck = false
 ) {
  const LOD = this.LOD;
  if (!this.mDataTool.loadIn(x, y, z)) return;
  if (!this.mDataTool.isRenderable()) return;

  if (!doSecondCheck) {
   if (this.mDataTool.hasSecondaryVoxel()) {
    this._process(template, x, y, z, true);
   }
  }

  this.mDataTool.setSecondary(doSecondCheck);

  const voxelObject = this.mDataTool.getVoxelObj();
  if (!voxelObject) return;

  const voxelState = this.mDataTool.getState();
  const voxelShape = this.mDataTool.getVoxelShapeObj();
  const voxelShapeState = this.mDataTool.getShapeState();
  const voxelSubstance = this.mDataTool.getSubstance();

  let faceBit = 0;

  let faceIndex = 0;
  for (const point of $3dCardinalNeighbors) {
   faceBit = this.cullCheck(
    FaceMap[faceIndex],
    voxelObject,
    voxelShape,
    voxelSubstance,
    x + point[0] * LOD,
    y + point[1] * LOD,
    z + point[2] * LOD,
    faceBit
   );

   faceIndex++;
  }

  if (faceBit == 0) return;

  let baseTemplate;
  if (voxelSubstance == "transparent") {
   baseTemplate = template["solid"];
  } else {
   baseTemplate = template[voxelSubstance];
  }

  baseTemplate.shapeStateTemplate.push(voxelShapeState);

  this.voxelProcesseData.voxelState = voxelState;
  this.voxelProcesseData.voxelShapeState = voxelShapeState;
  this.voxelProcesseData.level = this.mDataTool.getLevel();
  this.voxelProcesseData.levelState = this.mDataTool.getLevelState();
  this.voxelProcesseData.x = x;
  this.voxelProcesseData.y = y;
  this.voxelProcesseData.z = z;
  this.voxelProcesseData.overlayUVTemplate = baseTemplate.overlayUVTemplate;
  this.voxelProcesseData.uvTemplate = baseTemplate.uvTemplate;
  this.voxelProcesseData.colorTemplate = baseTemplate.colorTemplate;
  this.voxelProcesseData.aoTemplate = baseTemplate.aoTemplate;
  this.voxelProcesseData.lightTemplate = baseTemplate.lightTemplate;

  voxelObject.process(this.voxelProcesseData, Builder);

  baseTemplate.shapeTemplate.push(this.mDataTool.getShapeId());
  baseTemplate.positionTemplate.push(x, y, z);

  for (const face of FaceMap) {
   faceBit = this.faceStateCheck(face, faceBit);
  }

  baseTemplate.faceTemplate.push(faceBit);

  if (
   this.exposedFaces[0] &&
   (voxelSubstance == "liquid" || voxelSubstance == "magma")
  ) {
   this.calculatFlow(
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

  const maxX = Builder.entityConstructor.width;
  const maxY = Builder.entityConstructor.height;
  const maxZ = Builder.entityConstructor.depth;
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
  dimension: string,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  LOD = 1
 ): FullChunkTemplate {
  heightMapTool.setDimension(dimension);
  heightMapTool.chunk.loadIn(chunkX, chunkY, chunkZ);

  this.nDataTool.setDimension(dimension);
  this.mDataTool.setDimension(dimension);
  this.voxelProcesseData.dimension = this.dimension;
  this.settings.entity = false;
  this.LOD = LOD;
  const template: FullChunkTemplate = this.template;
  let maxX = WorldBounds.chunkXSize;
  let maxZ = WorldBounds.chunkZSize;
  for (let x = 0; x < maxX; x += LOD) {
   for (let z = 0; z < maxZ; z += LOD) {
    let minY = heightMapTool.chunk.setXZ(x, z).getMin();
    let maxY = heightMapTool.chunk.setXZ(x, z).getMax() + 1;

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
  (this as any).voxelProcesseData.overlayUVTemplate = null;
  (this as any).voxelProcesseData.uvTemplate = null;
  (this as any).voxelProcesseData.colorTemplate = null;
  (this as any).voxelProcesseData.aoTemplate = null;
  (this as any).voxelProcesseData.lightTemplate = null;
  for (const substance of Object.keys(this.template)) {
   //@ts-ignore
   for (const templateKey of Object.keys(this.template[substance])) {
    (this as any).template[substance][templateKey] = [];
   }
  }
 },
};

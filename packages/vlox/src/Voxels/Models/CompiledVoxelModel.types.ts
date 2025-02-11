import { VoxelTagStates, VoxelTagStatesData } from "Voxels/Data/VoxelTagStates";
import { Vec3Array } from "@amodx/math";
import {
  AOOcclusionFaceIndex,
  AOOcclusionFaceIndexData,
} from "../Models/Indexing/AOOcclusionFaceIndex";
import {
  CulledOcclusionFaceIndex,
  CulledOcclusionFaceIndexData,
} from "../Models/Indexing/CulledOcclusionFaceIndex";
import { VoxelFaceTransparentResultsIndexData } from "../Models/Indexing/VoxelFaceTransparentResultsIndex";
import {
  VoxelModelStateSchemaData,
  StateLogicStatement,
} from "../State/State.types";
import {
  VoxelGeometryData,
  VoxelGeometryNodes,
} from "../Models/VoxelModel.types";
import { VoxelEffectSyncData } from "../Effects/VoxelEffects.types";

export interface CompiledVoxelGeometryNodes {
  node: VoxelGeometryNodes;
  faceIndexes?: number[];
  tranform: VoxelGeometryTransform;
}

export interface VoxelGeometryTransform {
  position?: Vec3Array;
  scale?: Vec3Array;
  rotation?: Vec3Array;
  rotationPivot?: Vec3Array;
  lockUVs?: true;
  flip?: [flipX: 0 | 1, flipY: 0 | 1, flipZ: 0 | 1];
}

export interface CompiledVoxelGeometryData {
  id: string;
  ogData: VoxelGeometryData;
  nodes: CompiledVoxelGeometryNodes[];
}

export type CompiledVoxelGeometrySyncData = {
  id: string;
  nodes: CompiledVoxelGeometryNodes[];
  faceIndexes?: number[];
  ruleless?: true;
};

export interface CompiledVoxelModelData {
  id: string;
  schema: VoxelModelStateSchemaData[];
  effects: VoxelEffectSyncData[];
  geoLinkMap: number[];
  stateTree: any[];
  stateMap: number[][];
  stateGeometryMap: number[][];
  //maps each shape state geometry nodes to their relative index
  stateRelativeGeometryMap: number[][];
  //maps each shape state & condtional geometry relative ids to their starting byte index for the transparent index
  relativeGeometryByteIndexMap: number[];

  condiotnalStatements: StateLogicStatement[];
  condiotnalStateMap: number[][];
  //maps condiotnal states to their local geometry links
  condiotnalShapeStateMap: number[][][];
  //maps condiotnal states to their actual geometry ids
  condiotanlGeometryStatePalette: number[][][];
  //maps each condiotnal shape state geometry nodes to their relative index
  condiotnalShapeStateRelativeGeometryMap: number[][];
  condiotnalStateTree: any[];
}

export interface CompiledVoxelModelInputData {
  id: string;
  materialId: string;
  modelId: string;

  transparentFaceIndex: VoxelFaceTransparentResultsIndexData;
  modSchema: VoxelModelStateSchemaData[];
  modStateTree: any[];
  baseGeometryInputMap: any[][];
  condiotnalGeometryInputMap: any[][];
}

export interface FinalCompiledVoxelModelData {
  geometryPalette: string[];
  geometry: CompiledVoxelGeometrySyncData[];

  aoIndex: AOOcclusionFaceIndexData;
  faceCullIndex: CulledOcclusionFaceIndexData;
  vertexHitMap: number[][][];
  faceCullMap: number[][];

  models: CompiledVoxelModelData[];
  voxels: CompiledVoxelModelInputData[];
  tagState: VoxelTagStatesData;
}

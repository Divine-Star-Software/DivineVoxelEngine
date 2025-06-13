import { AOOcclusionFaceIndexData } from "../Models/Indexing/AOOcclusionFaceIndex";
import { CulledOcclusionFaceIndexData } from "../Models/Indexing/CulledOcclusionFaceIndex";
import {
  VoxelStateSchemaData,
  StateLogicStatement,
} from "../State/State.types";
import { CullingProcedureData } from "../Models/VoxelModel.types";
import { VoxelEffectSyncData } from "../Effects/VoxelEffects.types";
import { CompiledGeomtryNodes } from "../../Mesher/Models/Nodes/Types/GeomtryNode.types";

export type CompiledVoxelGeometrySyncData = {
  id: string;
  cullingProcedure: CullingProcedureData;
  nodes: CompiledGeomtryNodes[];
};

export interface CompiledVoxelModelData {
  id: string;
  schema: VoxelStateSchemaData;
  effects: VoxelEffectSyncData[];
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

  modSchema: VoxelStateSchemaData;
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
}

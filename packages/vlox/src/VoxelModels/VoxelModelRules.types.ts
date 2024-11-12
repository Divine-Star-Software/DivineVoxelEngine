import { Vec3Array } from "@amodx/math";
import { VoxelAOResultsIndexData } from "./Indexing/VoxelAOResultsIndex";
import { VoxelFaceCullResultsIndexData } from "./Indexing/VoxelFaceCullResultsIndex";
import { VoxelFaceTransparentResultsIndexData } from "./Indexing/VoxelFaceTransparentResultsIndex";
import {
  VoxelModelStateSchemaData,
  StateLogicStatement,
} from "./State/State.types";
import { VoxelGeometryData, VoxelGeometryNodes } from "./VoxelModel.types";

export interface PrcoessedVoxelGeometryNodes {
  node: VoxelGeometryNodes;
  tranform: VoxelGeometryTransform;
}

export interface VoxelGeometryTransform {
  position?: Vec3Array;
  scale?: Vec3Array;
  rotation?: Vec3Array;
  rotationPivot?: Vec3Array;
  lockUVs?:true;
  flip?: [flipX: 0 | 1, flipY: 0 | 1, flipZ: 0 | 1];
}

export interface PrcoessedVoxelGeometryData {
  id: string;
  ogData: VoxelGeometryData;
  nodes: PrcoessedVoxelGeometryNodes[];
}

export interface VoxelGeometrySyncData {
  id: string;
  nodes: PrcoessedVoxelGeometryNodes[];
  faceCullMap: number[][];
  vertexHitMap: number[][];
  aoIndex: VoxelAOResultsIndexData;
  cullIndex: VoxelFaceCullResultsIndexData;
}

export interface VoxelGeometryRulelessSyncData {
  id: string;
  nodes: PrcoessedVoxelGeometryNodes[];
  ruleless: true;
}

export interface VoxelModelSyncData {
  id: string;
  schema: VoxelModelStateSchemaData[];
  geoLinkMap: number[];
  shapeStateTree: any[];
  shapeStateMap: number[][];
  shapeStateGeometryMap: number[][];
  //maps each shape state geometry nodes to their relative index
  shapeStateRelativeGeometryMap: number[][];
  //maps each shape state & condtional geometry relative ids to their starting byte index for the transparent index
  relativeGeometryByteIndexMap: number[];

  condiotnalStatements: StateLogicStatement[];
  condiotnalStateMap: number[][];
  //maps condiotnal states to their local geometry links
  condiotnalShapeStateMap: number[][][];
  //maps condiotnal states to their actual geometry ids
  condiotnalShapeStateGeometryMap: number[][][];
  //maps each condiotnal shape state geometry nodes to their relative index
  condiotnalShapeStateRelativeGeometryMap: number[][];
  condiotnalStateTree: any[];
}

export interface VoxelInputsSyncData {
  id: string;
  modelId: string;

  transparentFaceIndex: VoxelFaceTransparentResultsIndexData;
  modSchema: VoxelModelStateSchemaData[];
  modStateTree: any[];
  baseGeometryInputMap: any[][];
  condiotnalGeometryInputMap: any[][];
}

export interface ConstructorVoxelModelSyncData {
  geometryPalette: string[];
  geometry: (VoxelGeometrySyncData | VoxelGeometryRulelessSyncData)[];
  models: VoxelModelSyncData[];
  voxels: VoxelInputsSyncData[];
}

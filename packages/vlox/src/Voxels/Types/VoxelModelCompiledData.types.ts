import { Vec3Array } from "@amodx/math";
import { VoxelAOResultsIndexData } from "../../Models/Indexing/VoxelAOResultsIndex";
import { VoxelFaceCullResultsIndexData } from "../../Models/Indexing/VoxelFaceCullResultsIndex";
import { VoxelFaceTransparentResultsIndexData } from "../../Models/Indexing/VoxelFaceTransparentResultsIndex";
import {
  VoxelModelStateSchemaData,
  StateLogicStatement,
} from "../State/State.types";
import {
  VoxelGeometryData,
  VoxelGeometryNodes,
} from "../../Models/VoxelModel.types";
import { VoxelEffectSyncData } from "../Effects/VoxelEffects.types";
import { VoxelTagStatesData } from "../Data/VoxelTagStates";
import { VoxelSubstanceTags, VoxelTags } from "../Data/VoxelTag.types";
import { VoxelLogicData } from "../../Voxels/Logic/VoxelLogic.types";
import { VoxelPalettesRegister } from "Voxels/Data/VoxelPalettesRegister";

export type CompiledVoxelTagAndPaletteData = {
  data: {
    logic: Record<string, VoxelLogicData[]>;
    tags: VoxelTags[];
    idPalette: string[];
    palette: typeof VoxelPalettesRegister.voxels;
    record: typeof VoxelPalettesRegister.voxelRecord;
    nameToIdMap: [string, string][];
    idToNameMap: [string, string][];
  };
  substances: {
    tags: VoxelSubstanceTags[];
    palette: string[];
  };
  materials: {
    palette: string[];
  };
};

export type CompiledVoxelData = {
  models: FinalCompiledVoxelModelData;
} & CompiledVoxelTagAndPaletteData;

export interface CompiledVoxelGeometryNodes {
  node: VoxelGeometryNodes;
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
  faceCullMap?: number[][];
  vertexHitMap?: number[][];
  aoIndex?: VoxelAOResultsIndexData;
  cullIndex?: VoxelFaceCullResultsIndexData;
};

export interface CompiledVoxelGeometryRulessData {
  id: string;
  nodes: CompiledVoxelGeometryNodes[];
  ruleless: true;
}

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
  condiotnalShapeStateGeometryMap: number[][][];
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
  geometry: (CompiledVoxelGeometrySyncData | CompiledVoxelGeometryRulessData)[];
  models: CompiledVoxelModelData[];
  voxels: CompiledVoxelModelInputData[];
  tagState: VoxelTagStatesData;
}

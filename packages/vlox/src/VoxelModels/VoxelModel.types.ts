import { Vec2Array, Vec3Array } from "@amodx/math";
import { QuadUVData } from "@amodx/meshing/Geometry.types";
import { VoxelFaceNames } from "../Math";
import { ConstructorTextureData } from "../Textures/Constructor.types";
import {
  VoxelStateStringSchemaData,
  VoxelModelRelationsSchemaData,
  VoxelStateNumberSchemaData,
} from "VoxelState/State.types";
import { VoxelEffectData } from "../VoxelEffects/VoxelEffects.types";

export interface VoxelModelConstructorData {
  id: string;
  modRelationSchema?: VoxelModelRelationsSchemaData[];
  modSchema?: VoxelStateStringSchemaData[];
  inputs: Record<string, Record<string, any>>;
  tagOverrides?: {
    isLightSource?: Record<string, boolean>;
    lightValue?: Record<string, Vec3Array>;
  };
}

interface VoxelOutlinedTextureProtocalData {
  type: "outlined";
  textures: {
    top: ConstructorTextureData;
    "corner-top-right": ConstructorTextureData;
    "corner-top-left": ConstructorTextureData;
    "corner-top-left-top-right": ConstructorTextureData;
    bottom: ConstructorTextureData;
    "corner-bottom-right": ConstructorTextureData;
    "corner-bottom-left": ConstructorTextureData;
    "corner-bottom-left-bottom-right": ConstructorTextureData;
    right: ConstructorTextureData;
    left: ConstructorTextureData;
  };
}


//box
export interface VoxelBoxGeometryNode {
  type: "box";
  noShade?: boolean;
  points: [start: Vec3Array, end: Vec3Array];
  rotation?: Vec3Array;
  faces: Record<VoxelFaceNames, VoxelBoxFaceData>;
}

export interface VoxelBoxFaceData {
  enabled?: boolean;
  flip?: boolean;
  texture: string;
  transparent?: boolean | string;
  uv: [x1: number, y1: number, x2: number, y2: number] | string;
  rotation?: number | string;
}

//quad
export interface VoxelQuadGeometryNode {
  type: "quad";
  doubleSided?: boolean | string;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array, p4: Vec3Array];
  transparent?: boolean | string;
  texture: string;
  uv: [x1: number, y1: number, x2: number, y2: number] | QuadUVData | string;
  textureRotation?: number | string;
}

//triangle
export interface VoxelTriangleGeometryNode {
  type: "triangle";
  orientation?: 0 | 1;
  doubleSided?: boolean;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array];
  transparent?: boolean | string;
  texture: string;
  uv: [v1: Vec2Array, v2: Vec2Array, v3: Vec2Array] | string;
  textureRotation?: number | string;
}

//geometry
export interface VoxelRawGeometryGeometryNode {
  type: "raw-geometry";
  positions: number[];
  normals: number[];
  indices: number[];
  uvs: number[];
  texture: string;
}

//arguments
export interface VoxelGeometryTextureArgument {
  type: "texture";
}
export interface VoxelGeometryBooleanArgument {
  type: "boolean";
  default: boolean;
}
export interface VoxelGeometryIntArgument {
  type: "int";
  default: number;
}
export interface VoxelGeometryFloatArgument {
  type: "float";
  default: number;
}
export interface VoxelGeometryBoxUVArgument {
  type: "box-uv";
  default: [x1: number, y1: number, x2: number, y2: number];
}

export interface VoxelGeometryVector3Argument {
  type: "vector3";
  default?: Vec3Array;
  min?: Vec3Array;
  max?: Vec3Array;
}

export type VoxelGeometryNodes =
  | VoxelBoxGeometryNode
  | VoxelTriangleGeometryNode
  | VoxelQuadGeometryNode
  | VoxelRawGeometryGeometryNode;

export interface VoxelGeometryData {
  id: string;
  nodes: VoxelGeometryNodes[];
  /**
   * If this is set the voxel geometry will not be included in the
   * geometry rules and will be fall back to custom inputs.
   * Ideal for advanced or non cubic models.
   * */
  doNotBuildRules?: true;
  arguments: Record<
    string,
    | VoxelGeometryTextureArgument
    | VoxelGeometryBoxUVArgument
    | VoxelGeometryVector3Argument
    | VoxelGeometryIntArgument
    | VoxelGeometryBooleanArgument
    | VoxelGeometryFloatArgument
  >;
}

export interface VoxelGeometryBaseLinkData {
  inputs: Record<string, any>;
  scale?: Vec3Array;
  position?: Vec3Array;
  rotation?: Vec3Array;
  rotationPivot?: Vec3Array;
  flip?: [flipX: 0 | 1, flipY: 0 | 1, flipZ: 0 | 1];
}

export interface VoxelGeometryLinkData extends VoxelGeometryBaseLinkData {
  id: string;
  geometryId: string;
}

export interface VoxelModelData {
  id: string;
  arguments: Record<
    string,
    | VoxelGeometryTextureArgument
    | VoxelGeometryBoxUVArgument
    | VoxelGeometryVector3Argument
    | VoxelGeometryIntArgument
    | VoxelGeometryBooleanArgument
    | VoxelGeometryFloatArgument
  >;
  shapeStateSchema: (VoxelStateStringSchemaData | VoxelStateNumberSchemaData)[];
  effects?: VoxelEffectData[];
  relationsSchema: VoxelModelRelationsSchemaData[];
  shapeStatesNodes: Record<string, VoxelGeometryLinkData[]>;
  shapeStatesConditonalNodes: Record<string, VoxelGeometryLinkData[]>;
}

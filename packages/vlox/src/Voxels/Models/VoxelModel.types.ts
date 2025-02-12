import { Vec2Array, Vec3Array } from "@amodx/math";
import { QuadUVData } from "../../Mesher/Geomtry/Geometry.types";
import { VoxelFaceNames } from "../../Math";
import { TextureId } from "../../Textures/Texture.types";
import {
  VoxelStateStringSchemaData,
  VoxelModelRelationsSchemaData,
  VoxelStateNumberSchemaData,
} from "../../Voxels/State/State.types";
import { VoxelEffectData } from "../../Voxels/Effects/VoxelEffects.types";
import { VoxelTags } from "../Data/VoxelTag.types";

/**The model data assoicated with the actual voxel. */
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
export interface BaseVoxelGeomtryTextureProcedureData {
  type: string;
  texture?: TextureId | number;
  textureRecrod?: Record<string, TextureId | number>;
  [key:string]: any
}

interface VoxelGeomtryOutlinedTextureProcedureData
  extends BaseVoxelGeomtryTextureProcedureData {
  type: "outlined";
  texture: TextureId | number;
  textureRecrod: {
    top: TextureId | number;
    "corner-top-right": TextureId | number;
    "corner-top-left": TextureId | number;
    "corner-top-left-top-right": TextureId | number;
    bottom: TextureId | number;
    "corner-bottom-right": TextureId | number;
    "corner-bottom-left": TextureId | number;
    "corner-bottom-left-bottom-right": TextureId | number;
    right: TextureId | number;
    left: TextureId | number;
  };
}





/**Define a custom geomtry node */
export interface VoxelCustomGeomtryNode {
  type: "custom";
  id: string;
  inputs: Record<string, any>;
}

//box
export interface VoxelBoxGeometryNode {
  type: "box";
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  noShade?: boolean;
  points: [start: Vec3Array, end: Vec3Array];
  rotation?: Vec3Array;
  faces: Record<VoxelFaceNames, VoxelBoxFaceData>;
}

export interface VoxelBoxFaceData {
  enabled?: boolean;
  flip?: boolean;
  texture: TextureId | BaseVoxelGeomtryTextureProcedureData;
  uv: [x1: number, y1: number, x2: number, y2: number] | string;
  rotation?: number | string;
}

//quad
export interface VoxelQuadGeometryNode {
  type: "quad";
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  doubleSided?: boolean | string;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array, p4: Vec3Array];
  texture: TextureId | BaseVoxelGeomtryTextureProcedureData;
  uv: [x1: number, y1: number, x2: number, y2: number] | QuadUVData | string;
  textureRotation?: number | string;
}

//triangle
export interface VoxelTriangleGeometryNode {
  type: "triangle";
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  orientation?: 0 | 1;
  doubleSided?: boolean;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array];
  texture: TextureId | BaseVoxelGeomtryTextureProcedureData;
  uv: [v1: Vec2Array, v2: Vec2Array, v3: Vec2Array] | string;
  textureRotation?: number | string;
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
  | VoxelCustomGeomtryNode
  | VoxelBoxGeometryNode
  | VoxelTriangleGeometryNode
  | VoxelQuadGeometryNode;

export type CullingProcedureData =
  | {
      type: "default";
    }
  | {
      type: "none";
    }
  | {
      type: "transparent";
    }
  | {
      type: "custom";
      id: string;
      data: any;
    };

export interface VoxelGeometryData {
  id: string;
  nodes: VoxelGeometryNodes[];
  /* The divisor used for all the geomtry node values like positions and uvs.  */
  divisor?: Vec3Array;
  /**
   * If this is set the voxel geometry will not be included in the
   * geometry rules and will be fall back to custom inputs.
   * Ideal for advanced or non cubic models.
   * */
  doNotBuildRules?: true;
  /**
   * Define the culling procedure for faces
   */
  cullingProcedure?: CullingProcedureData;
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

export interface VoxelGeometryLinkData {
  //  id: string;
  geometryId: string;
  /**
   * Overrride the culling procedure for faces
   */
  cullingProcedure?: CullingProcedureData;
  /**Divisor used for transform of this specific node.*/
  divisor?: Vec3Array;
  inputs: Record<string, any>;
  scale?: Vec3Array;
  position?: Vec3Array;
  rotation?: Vec3Array;
  rotationPivot?: Vec3Array;
  flip?: [flipX: 0 | 1, flipY: 0 | 1, flipZ: 0 | 1];
}

export interface VoxelModelData {
  id: string;
  /**Divisor used all transforms of geometry nodes. */
  divisor?: Vec3Array;
  arguments: Record<
    string,
    | VoxelGeometryTextureArgument
    | VoxelGeometryBoxUVArgument
    | VoxelGeometryVector3Argument
    | VoxelGeometryIntArgument
    | VoxelGeometryBooleanArgument
    | VoxelGeometryFloatArgument
  >;
  stateSchema: (VoxelStateStringSchemaData | VoxelStateNumberSchemaData)[];
  /**Define default tags for the voxel. */
  tags?: Partial<VoxelTags>;
  effects?: VoxelEffectData[];
  relationsSchema: VoxelModelRelationsSchemaData[];
  stateNodes: Record<string, VoxelGeometryLinkData[]>;
  conditonalNodes: Record<string, VoxelGeometryLinkData[]>;
}

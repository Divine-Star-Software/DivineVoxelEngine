import type { Vec3Array } from "@amodx/math";
import type { TypedArrays } from "@amodx/binary/";

export type DVESectionMeshesAttributes = [
  id: string,
  data: TypedArrays,
  stride: number,
  componentTypes?: number,
  noramlizer?: number
][];

export type NodeMaterialData = {
  id: string;
  textureTypeId?: string;
  shaderId: string;
} & NodeMaterialOptions;

export type NodeMaterialOptions = {
  alphaTesting: boolean;
  alphaBlending: boolean;
  mipMapBias?: number;
  hasEffects?: boolean;
  backFaceCulling?: boolean;
};

export type NodeMeshData = {
  id: string;
  materialId: string;
  boundingBoxMaxSize: Vec3Array;
  type?: string;
  worldMesh?:boolean;
} & NodeMeshOptions;

export type NodeMeshOptions = {
  materialId: string;
  boundingBoxMaxSize: Vec3Array;
  type?: string;
};

export type NodeSubstanceData = {
  id: string;
  shader: string;
  // texture: TextureType;
  material: NodeMaterialOptions;
  mesh: NodeMeshOptions;
};

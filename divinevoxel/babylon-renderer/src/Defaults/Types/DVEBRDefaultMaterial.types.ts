import { Scene } from "@babylonjs/core/scene";
import { Vec3Array } from "@divinevoxel/core/Math";
import { TextureData } from "@divinevoxel/default/Textures/Texture.types";

export type DVEBRDefaultMaterialBaseData = {
  textureData: TextureData[];
  textureTypes: string[];
  substances: NodeSubstanceData[];
  scene: Scene;
};

export type NodeMaterialOptions = {
  alphaTesting: boolean;
  alphaBlending: boolean;
  mipMapBias?: number;
  hasEffects?: boolean;
  backFaceCulling?: boolean;
};

export type NodeMeshData = {
  id: string;
  type?: string;
} & NodeMeshOptions;

export type NodeMeshOptions = {
  boundingBoxMaxSize: Vec3Array;
  type?: string;
};

export type NodeSubstanceData = {
  id: string;
  shaderId: string;
  textureType: string;
  material: NodeMaterialOptions;
  mesh: NodeMeshOptions;
};

import type { Vec3Array } from "Math";
import type { DivineShader } from "divine-shaders";
import { TextureType } from "../Textures/TextureType";
export type NodeMaterialData = {
    id: string;
    textureTypeId?: string;
    shaderId: string;
} & NodeMaterialOptions;
export type NodeMaterialOptions = {
    alphaTesting: boolean;
    alphaBlending: boolean;
    hasEffects?: boolean;
    backFaceCulling?: boolean;
};
export type NodeMeshData = {
    id: string;
    materialId: string;
    boundingBoxMaxSize: Vec3Array;
    type?: string;
} & NodeMeshOptions;
export type NodeMeshOptions = {
    materialId: string;
    boundingBoxMaxSize: Vec3Array;
    type?: string;
};
export type NodeSubstanceData = {
    id: string;
    shader: DivineShader;
    texture: TextureType;
    material: NodeMaterialOptions;
    mesh: NodeMeshOptions;
};

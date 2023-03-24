import type { Vec3Array } from "Math";
export declare type NodeMaterialData = {
    id: string;
    alphaTesting: boolean;
    alphaBlending: boolean;
    hasEffects?: boolean;
    textureTypeId?: string;
    shaderId: string;
};
export declare type NodeMeshData = {
    id: string;
    materialId: string;
    boundingBoxMaxSize: Vec3Array;
};

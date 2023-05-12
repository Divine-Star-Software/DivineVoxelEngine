import type { Vec3Array } from "Math";

export type NodeMaterialData = {
 id: string;
 alphaTesting: boolean;
 alphaBlending: boolean;
 hasEffects?: boolean;
 backFaceCulling ?:boolean;
 textureTypeId?: string;
 shaderId: string;
};

export type NodeMeshData = {
 id: string;
 materialId: string;
 boundingBoxMaxSize: Vec3Array;
};

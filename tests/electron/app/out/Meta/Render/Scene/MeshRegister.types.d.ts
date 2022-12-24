/// <reference types="babylonjs" />
import { VoxelTemplateSubstanceType } from "Meta/index";
export declare type MeshRegisterChunk = {
    mesh: BABYLON.Mesh;
};
export declare type MeshRegisterColumn = {
    position: [x: number, y: number, z: number];
    chunks: Map<number, Map<VoxelTemplateSubstanceType, MeshRegisterChunk>>;
};
export declare type MushRegisterRegion = {
    columns: Map<number, MeshRegisterColumn>;
};
export declare type MeshRegisterDimensions = Map<string, Map<string, MushRegisterRegion>>;

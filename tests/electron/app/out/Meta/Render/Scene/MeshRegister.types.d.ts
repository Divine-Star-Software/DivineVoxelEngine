/// <reference types="babylonjs" />
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import { VoxelTemplateSubstanceType } from "Meta/index";
export declare type MeshRegisterChunk = {
    mesh: BABYLON.Mesh;
};
export declare type MeshRegisterColumn = {
    location: LocationData;
    chunks: Map<number, Map<VoxelTemplateSubstanceType, MeshRegisterChunk>>;
};
export declare type MushRegisterRegion = {
    columns: Map<number, MeshRegisterColumn>;
};
export declare type MeshRegisterDimensions = Map<string, Map<string, MushRegisterRegion>>;

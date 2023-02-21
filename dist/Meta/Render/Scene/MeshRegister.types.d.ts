import type { Mesh } from "@babylonjs/core";
import type { LocationData } from "voxelspaces";
export declare type MeshRegisterChunk = {
    mesh: Mesh;
};
export declare type MeshRegisterColumn = {
    location: LocationData;
    chunks: Map<number, Map<string, MeshRegisterChunk>>;
};
export declare type MushRegisterRegion = {
    columns: Map<number, MeshRegisterColumn>;
};
export declare type MeshRegisterDimensions = Map<string, Map<string, MushRegisterRegion>>;

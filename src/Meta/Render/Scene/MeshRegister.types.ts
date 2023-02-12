import type { Mesh } from "babylonjs";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";

export type MeshRegisterChunk = {
 mesh: Mesh;
};

export type MeshRegisterColumn = {
 location: LocationData;
 chunks: Map<number, Map<string, MeshRegisterChunk>>;
};

export type MushRegisterRegion = {
 columns: Map<number, MeshRegisterColumn>;
};
export type MeshRegisterDimensions = Map<
 string,
 Map<string, MushRegisterRegion>
>;

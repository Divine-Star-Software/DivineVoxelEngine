import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types";
import { VoxelTemplateSubstanceType } from "Meta/index";

export type MeshRegisterChunk = {
 mesh: BABYLON.Mesh;
};

export type MeshRegisterColumn = {
location: LocationData,
 chunks: Map<number, Map<VoxelTemplateSubstanceType, MeshRegisterChunk>>;
};

export type MushRegisterRegion = {
 columns: Map<number, MeshRegisterColumn>;
};
export type MeshRegisterDimensions = Map<
 string,
 Map<string, MushRegisterRegion>
>;

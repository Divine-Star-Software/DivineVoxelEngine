import { VoxelTemplateSubstanceType } from "Meta/index";

export type MeshRegisterChunk = {
 mesh: BABYLON.Mesh;
};

export type MeshRegisterColumn = {
    position: [x: number, y: number, z: number];
 chunks: Map<number, Map<VoxelTemplateSubstanceType, MeshRegisterChunk>>;
};

export type MushRegisterRegion = {
 columns: Map<number, MeshRegisterColumn>;
};
export type MeshRegisterDimensions = Map<
 string,
 Map<string, MushRegisterRegion>
>;

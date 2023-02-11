import type { VoxelTemplate } from "Meta/Constructor/VoxelTemplate.types.js";
import { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
export declare const ChunkMesher: {
    voxelBuildOrder: string[];
    buildChunkMesh(location: LocationData, template: Record<string, VoxelTemplate>, LOD?: number): void;
};

import type { VoxelTemplate } from "Meta/Constructor/VoxelTemplate.types.js";
import { LocationData } from "voxelspaces";
export declare const ChunkMesher: {
    voxelBuildOrder: string[];
    buildChunkMesh(location: LocationData, template: Record<string, VoxelTemplate>, LOD?: number): void;
};

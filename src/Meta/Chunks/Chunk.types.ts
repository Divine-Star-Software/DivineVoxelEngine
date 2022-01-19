import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    lightTemplate: number[];
    aoTemplate: number[];
   };
   

export type FullChunkTemplate = Record<VoxelSubstanceType,ChunkTemplate>;
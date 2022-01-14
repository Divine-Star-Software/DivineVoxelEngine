import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export type ChunkTemplate = {
    positionTemplate: number[];
    faceTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    ligtTemplate: number[];
    aoTemplate: number[];
   };
   

export type FullChunkTemplate = Record<VoxelSubstanceType,ChunkTemplate>;
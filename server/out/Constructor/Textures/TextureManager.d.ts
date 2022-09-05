import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare const TextureManager: {
    textureDataHasBeenSet: boolean;
    uvTextureMap: Record<VoxelSubstanceType, Record<string, number>>;
    getTextureUV(voxelSubstanceType: VoxelSubstanceType, textureId: string, varation?: string | undefined): number;
    isReady(): boolean;
    setUVTextureMap(data: Record<VoxelSubstanceType, Record<string, number>>): void;
};

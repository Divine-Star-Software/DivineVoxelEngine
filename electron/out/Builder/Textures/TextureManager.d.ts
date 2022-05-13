import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare class TextureManager {
    textureDataHasBeenSet: boolean;
    uvTextureMap: Record<VoxelSubstanceType, Record<string, number>>;
    getTextureUV(voxelSubstanceType: VoxelSubstanceType, textureId: string, varation?: string): number;
    isReady(): boolean;
    setUVTextureMap(data: Record<VoxelSubstanceType, Record<string, number>>): void;
}

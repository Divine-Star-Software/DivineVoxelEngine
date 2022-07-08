import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare const TextureManager: {
    textureDataHasBeenSet: boolean;
    uvTextureMap: Record<VoxelSubstanceType, Record<string, number>>;
    overlayUVTextureMap: Record<VoxelSubstanceType, Record<string, number>>;
    getTextureUV(voxelSubstanceType: VoxelSubstanceType, textureId: string, varation?: string | false | null | undefined, overlay?: boolean): number;
    setUVTextureMap(data: Record<VoxelSubstanceType, Record<string, number>>): void;
    setOverlayUVTextureMap(data: Record<VoxelSubstanceType, Record<string, number>>): void;
    isReady(): boolean;
};

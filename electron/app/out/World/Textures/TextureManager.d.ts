import type { TextureData } from "Meta/World/Textures/Texture.types";
import type { TextureManagerInterface } from "Meta/World/Textures/TextureManager.interface";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare class TextureManager implements TextureManagerInterface {
    defaultTexturePath: string;
    textureExtension: Record<VoxelSubstanceType, string>;
    textures: Record<VoxelSubstanceType, TextureData[]>;
    uvTextureMap: Record<VoxelSubstanceType, Record<string, number>>;
    _processVariations(texture: TextureData, texturePaths: string[], animations: Record<VoxelSubstanceType, number[][]>, textureAnimatioTimes: Record<VoxelSubstanceType, number[][]>, extension: string, count: number, path: string, substance: VoxelSubstanceType): number;
    generateTexturesData(): {
        textureAnimationTimes: Record<VoxelSubstanceType, number[][]>;
        textureAnimations: Record<VoxelSubstanceType, number[][]>;
        texturePaths: Record<VoxelSubstanceType, string[]>;
    };
    defineDefaultTexturePath(path: string): void;
    defineDefaultTextureExtension(voxelSubstanceType: VoxelSubstanceType, ext: string): void;
    getTextureUV(voxelSubstanceType: VoxelSubstanceType, textureId: string, varation?: string): number;
    registerTexture(voxelSubstanceType: VoxelSubstanceType, textureData: TextureData): void;
}

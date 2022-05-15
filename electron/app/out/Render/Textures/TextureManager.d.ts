import type { TextureData } from "Meta/Render/Textures/Texture.types";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
import { TextureProccesedData } from "Meta/Render/Textures/Texture.types";
export declare class TextureManager {
    defaultTexturePath: string;
    processedTextureData: TextureProccesedData;
    textureData: TextureData;
    textureExtension: Record<VoxelSubstanceType, string>;
    textures: Record<VoxelSubstanceType, TextureData[]>;
    uvTextureMap: Record<VoxelSubstanceType, Record<string, number>>;
    _processVariations(texture: TextureData, texturePaths: string[], animations: Record<VoxelSubstanceType, number[][]>, textureAnimatioTimes: Record<VoxelSubstanceType, number[][]>, extension: string, count: number, path: string, substance: VoxelSubstanceType): number;
    generateTexturesData(): TextureProccesedData;
    defineDefaultTexturePath(path: string): void;
    defineDefaultTextureExtension(voxelSubstanceType: VoxelSubstanceType, ext: string): void;
    getTextureUV(voxelSubstanceType: VoxelSubstanceType, textureId: string, varation?: string): number;
    registerTexture(voxelSubstanceType: VoxelSubstanceType, textureData: TextureData): void;
}

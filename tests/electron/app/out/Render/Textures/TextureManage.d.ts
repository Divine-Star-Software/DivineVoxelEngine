import type { TextureData } from "Meta/Render/Textures/Texture.types";
import { TextureType } from "./TextureType.js";
export declare const TextureManager: {
    defaultTexturePath: string;
    textureTypes: Map<string, TextureType>;
    _processVariations(texture: TextureData, texturePaths: string[], map: Record<string, number>, animations: number[][], textureAnimatioTimes: number[][], extension: string, count: number, path: string): number;
    generateTexturesData(id: string): false | undefined;
    $INIT(): Promise<void>;
    $START_ANIMATIONS(): void;
    defineDefaultTexturePath(path: string): void;
    getTextureType(id: string): false | TextureType;
    addTextureType(id: string): void;
    registerTexture(textureData: TextureData | TextureData[]): void;
};

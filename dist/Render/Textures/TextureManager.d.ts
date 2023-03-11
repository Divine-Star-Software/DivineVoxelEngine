import type { TextureData, TextureTypeUVMap } from "Meta/Render/Textures/Texture.types";
import { TextureType } from "./TextureType.js";
export declare const TextureManager: {
    defaultTexturePath: string;
    textureTypes: Map<string, TextureType>;
    _processVariations(textureData: TextureData, paths: Map<string, Uint8ClampedArray | false>, map: Record<string, number>, animations: number[][], textureAnimatioTimes: number[][], extension: string, count: number): number;
    _getPath(textureData: TextureData, varation: string | undefined, extension: string): string;
    generateTexturesData(id: string): false | undefined;
    _ready: boolean;
    isReady(): boolean;
    $INIT(): Promise<void>;
    $START_ANIMATIONS(): void;
    getTextureUVMap(): TextureTypeUVMap;
    defineDefaultTexturePath(path: string): void;
    getTextureType(id: string): false | TextureType;
    addTextureType(id: string): void;
    registerTexture(textureData: TextureData | TextureData[]): void;
    createRawDataMap(): Promise<Map<string, Uint8ClampedArray>>;
};

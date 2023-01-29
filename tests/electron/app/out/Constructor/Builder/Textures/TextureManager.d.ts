import { ConstructorTextureData } from "Meta/Constructor/Constructor.types";
import type { TextureTypes } from "Meta/Render/Textures/Texture.types";
export declare const TextureManager: {
    textureDataHasBeenSet: boolean;
    uvTextureMap: Record<string, Record<string, number>>;
    overlayUVTextureMap: Record<string, Record<string, number>>;
    getTextureUV(data: ConstructorTextureData, overlay?: boolean): number;
    setUVTextureMap(data: Record<TextureTypes, Record<string, number>>): void;
    setOverlayUVTextureMap(data: Record<TextureTypes, Record<string, number>>): void;
    releaseTextureData(): void;
    isReady(): boolean;
};

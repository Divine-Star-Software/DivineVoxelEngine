import { TextureTypes } from "Meta/index";
export declare const TextureManager: {
    textureDataHasBeenSet: boolean;
    uvTextureMap: Record<TextureTypes, Record<string, number>>;
    overlayUVTextureMap: Record<TextureTypes, Record<string, number>>;
    getTextureUV(textureType: TextureTypes, textureId: string, varation?: string | false | null, overlay?: boolean): number;
    setUVTextureMap(data: Record<TextureTypes, Record<string, number>>): void;
    setOverlayUVTextureMap(data: Record<TextureTypes, Record<string, number>>): void;
    isReady(): boolean;
};

import type { RawTexture2DArray } from "@babylonjs/core";
export declare const TextureCreator: {
    context: CanvasRenderingContext2D | null;
    _textureSize: number;
    imgWidth: number;
    imgHeight: number;
    _canvas: HTMLCanvasElement;
    _mipMapSizes: number[];
    defineTextureDimensions(textureSize: number, mipMapSizes: number[]): void;
    setUpImageCreation(): void;
    createMaterialTexture(name: string, images: Map<string, Uint8ClampedArray | false>, width?: number, height?: number): Promise<RawTexture2DArray[]>;
    _createTextures(name: string, images: Map<string, Uint8ClampedArray | false>, width: number, height: number): Promise<RawTexture2DArray>;
    loadImage(imgSrcData: string | Uint8ClampedArray, width?: number, height?: number): Promise<Uint8ClampedArray>;
    _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
};

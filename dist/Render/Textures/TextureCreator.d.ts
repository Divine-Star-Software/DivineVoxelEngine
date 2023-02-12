import type { RawTexture2DArray } from "babylonjs";
export declare const TextureCreator: {
    context: CanvasRenderingContext2D | null;
    imgWidth: number;
    imgHeight: number;
    _canvas: HTMLCanvasElement;
    _mipMapSizes: number[];
    defineTextureDimensions(textureSize: number, mipMapSizes: number[]): void;
    setUpImageCreation(): void;
    createMaterialTexture(name: string, images: string[], width?: number, height?: number): Promise<RawTexture2DArray[]>;
    _createTextures(name: string, images: string[], width: number, height: number): Promise<RawTexture2DArray>;
    _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
    _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
};

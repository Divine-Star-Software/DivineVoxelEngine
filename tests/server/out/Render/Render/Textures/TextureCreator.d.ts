/// <reference types="babylonjs" />
export declare const TextureCreator: {
    context: CanvasRenderingContext2D | null;
    imgWidth: number;
    imgHeight: number;
    _mipMapSizes: number[];
    defineTextureDimensions(textureSize: number, mipMapSizes: number[]): void;
    setUpImageCreation(): void;
    createMaterialTexture(name: string, scene: BABYLON.Scene, images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray[]>;
    _createTextures(name: string, scene: BABYLON.Scene, images: string[], width: number, height: number): Promise<BABYLON.RawTexture2DArray>;
    _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
    _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
};

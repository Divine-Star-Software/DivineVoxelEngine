/// <reference types="babylonjs" />
export declare class TextureCreator {
    context: CanvasRenderingContext2D;
    setUpImageCreation(): void;
    createMaterialTexture(scene: BABYLON.Scene, images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray>;
    _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
    _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
}

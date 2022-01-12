/// <reference types="babylonjs" />
export declare class ChunkMaterial {
    material: BABYLON.ShaderMaterial;
    context: CanvasRenderingContext2D;
    scene: BABYLON.Scene;
    constructor();
    setScene(scene: BABYLON.Scene): void;
    setUpImageCreation(): void;
    createMaterialTexture(images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray>;
    _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
    _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
    getMaterial(texture: BABYLON.RawTexture2DArray): BABYLON.ShaderMaterial;
    runAnimations(num: number): void;
}

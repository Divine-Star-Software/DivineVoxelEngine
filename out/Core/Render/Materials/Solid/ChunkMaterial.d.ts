/// <reference types="babylonjs" />
import type { RenderManager } from "Core/Render/RenderManager";
export declare class ChunkMaterial {
    private renderManager;
    material: BABYLON.ShaderMaterial;
    context: CanvasRenderingContext2D;
    constructor(renderManager: RenderManager);
    getMaterial(): BABYLON.ShaderMaterial;
    createMaterial(scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray): BABYLON.ShaderMaterial;
    runAnimations(num: number): void;
}

/// <reference types="babylonjs" />
import type { RenderManager } from "Core/Render/RenderManager";
export declare class FluidMaterial {
    private renderManager;
    material: BABYLON.ShaderMaterial;
    context: CanvasRenderingContext2D;
    constructor(renderManager: RenderManager);
    getMaterial(): BABYLON.ShaderMaterial;
    createMaterial(scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
    runAnimations(num: number): void;
}

/// <reference types="babylonjs" />
import type { RenderManager } from "Core/Render/RenderManager";
import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare class SolidMaterial {
    private renderManager;
    material: BABYLON.ShaderMaterial;
    context: CanvasRenderingContext2D;
    constructor(renderManager: RenderManager);
    getMaterial(): BABYLON.ShaderMaterial;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(settings: EngineSettingsData, scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
    overrideMaterial(material: any): void;
}

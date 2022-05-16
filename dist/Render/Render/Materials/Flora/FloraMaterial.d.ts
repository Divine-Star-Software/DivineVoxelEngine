/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare const FloraMaterial: {
    material: BABYLON.ShaderMaterial | null;
    context: CanvasRenderingContext2D | null;
    getMaterial(): BABYLON.ShaderMaterial | null;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
};

/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare const SkyBoxMaterial: {
    material: BABYLON.ShaderMaterial | null;
    context: CanvasRenderingContext2D | null;
    getMaterial(): BABYLON.ShaderMaterial | null;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial;
    overrideMaterial(material: any): void;
};

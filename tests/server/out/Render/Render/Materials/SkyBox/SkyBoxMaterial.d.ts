/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
export declare const SkyBoxMaterial: {
    material: BABYLON.ShaderMaterial | null;
    time: number;
    getMaterial(): BABYLON.ShaderMaterial | null;
    updateFogOptions(data: BABYLON.Vector4): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial;
    overrideMaterial(material: any): void;
    runEffects(): void;
};

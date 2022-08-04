/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import type { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
export declare const FloraMaterial: {
    material: BABYLON.ShaderMaterial | null;
    getMaterial(): BABYLON.ShaderMaterial | null;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial;
};

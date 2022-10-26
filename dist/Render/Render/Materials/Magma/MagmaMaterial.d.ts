/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
export declare const MagmaMaterial: {
    material: BABYLON.ShaderMaterial | null;
    getMaterial(): BABYLON.ShaderMaterial | null;
    time: number;
    updateFogOptions(data: BABYLON.Vector4): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial;
    runEffects(): void;
};

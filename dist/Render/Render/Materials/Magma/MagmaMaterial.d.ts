/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
export declare const MagmaMaterial: {
    material: BABYLON.ShaderMaterial | null;
    getMaterial(): BABYLON.ShaderMaterial | null;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial;
};

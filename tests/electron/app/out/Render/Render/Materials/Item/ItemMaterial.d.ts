/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
export declare const ItemMaterial: {
    material: BABYLON.ShaderMaterial | null;
    context: CanvasRenderingContext2D | null;
    time: number;
    updateFogOptions(data: BABYLON.Vector4): void;
    getMaterial(): BABYLON.ShaderMaterial | null;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial;
    overrideMaterial(material: any): void;
    runEffects(): void;
};

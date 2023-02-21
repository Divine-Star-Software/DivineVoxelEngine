import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import type { Scene, ShaderMaterial, Vector4 } from "@babylonjs/core";
export declare const SkyBoxMaterial: {
    material: ShaderMaterial | null;
    time: number;
    getMaterial(): ShaderMaterial | null;
    updateFogOptions(data: Vector4): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(scene: Scene): ShaderMaterial;
    overrideMaterial(material: any): void;
    updateUniforms(): void;
    runEffects(): void;
};

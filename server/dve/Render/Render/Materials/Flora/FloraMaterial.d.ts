import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare const FloraMaterial: {
    material: BABYLON.ShaderMaterial | null;
    context: CanvasRenderingContext2D | null;
    getMaterial(): BABYLON.ShaderMaterial | null;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(settings: EngineSettingsData, scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
};

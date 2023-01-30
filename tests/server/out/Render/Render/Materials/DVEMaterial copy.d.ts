/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { VoxelTemplateSubstanceType } from "Meta/index.js";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
declare type DVEMaterialOptions = {
    alphaTesting: boolean;
    alphaBlending: boolean;
    doEffects?: boolean;
};
export declare class DVEMaterial {
    type: VoxelTemplateSubstanceType | "Item";
    options: DVEMaterialOptions;
    material: BABYLON.ShaderMaterial | null;
    time: number;
    constructor(type: VoxelTemplateSubstanceType | "Item", options: DVEMaterialOptions);
    getMaterial(): BABYLON.ShaderMaterial | null;
    updateFogOptions(data: BABYLON.Vector4): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial;
    overrideMaterial(material: any): void;
    runEffects(): void;
}
export {};

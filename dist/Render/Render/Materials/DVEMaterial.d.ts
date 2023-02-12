import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import type { ShaderMaterial, Vector4 } from "babylonjs";
declare type DVEMaterialOptions = {
    alphaTesting: boolean;
    alphaBlending: boolean;
    doEffects?: boolean;
};
export declare class DVEMaterial {
    id: string;
    options: DVEMaterialOptions;
    material: ShaderMaterial | null;
    time: number;
    constructor(id: string, options: DVEMaterialOptions);
    getMaterial(): ShaderMaterial | null;
    updateFogOptions(data: Vector4): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(): ShaderMaterial;
    overrideMaterial(material: any): void;
    runEffects(): void;
}
export {};

import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import type { Engine, Scene, ShaderMaterial, Vector4 } from "babylonjs";
declare type DVEMaterialOptions = {
    alphaTesting: boolean;
    alphaBlending: boolean;
    doEffects?: boolean;
};
export declare class DVEMaterial {
    id: string;
    options: DVEMaterialOptions;
    material: ShaderMaterial;
    scene: Scene;
    engine: Engine;
    time: number;
    constructor(id: string, options: DVEMaterialOptions);
    getMaterial(): ShaderMaterial;
    updateFogOptions(data: Vector4): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(): ShaderMaterial;
    overrideMaterial(material: any): void;
    updateUniforms(): void;
    runEffects(): void;
}
export {};

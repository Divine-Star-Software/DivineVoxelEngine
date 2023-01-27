/// <reference types="babylonjs" />
export declare type DVEFogTypes = "exponential" | "volumetric" | "animated-volumetric";
export declare type RenderFogOptions = {
    mode: DVEFogTypes;
    color: BABYLON.Color3;
    density: number;
    volumetricOptions: {
        heightFactor: number;
    };
};
export declare type DVERenderEffectsOptions = {
    floraEffects: boolean;
    liquidEffects: boolean;
};

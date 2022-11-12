/// <reference types="babylonjs" />
export declare type RenderFogOptions = {
    mode: "exponential" | "volumetric" | "animated-volumetric";
    color: BABYLON.Color3;
    density: number;
    volumetricOptions: {
        heightFactor: number;
    };
};
export declare type RenderEffectsOptions = {
    floraEffects: boolean;
    liquidEffects: boolean;
};

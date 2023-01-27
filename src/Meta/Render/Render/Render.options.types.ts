export type DVEFogTypes =  "exponential" | "volumetric" | "animated-volumetric";
export type RenderFogOptions = {
 mode: DVEFogTypes;
 color: BABYLON.Color3;
 density: number;
 volumetricOptions: {
  heightFactor: number;
 };
};

export type DVERenderEffectsOptions = {
 floraEffects: boolean;
 liquidEffects: boolean;
};

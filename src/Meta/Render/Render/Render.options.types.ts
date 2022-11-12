export type RenderFogOptions = {
 mode: "exponential" | "volumetric" | "animated-volumetric";
 color: BABYLON.Color3;
 density: number;
 volumetricOptions: {
  heightFactor: number;
 };
};

export type RenderEffectsOptions = {
 floraEffects: boolean;
 liquidEffects: boolean;
};

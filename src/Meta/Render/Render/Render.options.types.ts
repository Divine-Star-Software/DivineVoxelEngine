import type { Color3 } from "babylonjs";

export type DVEFogTypes =  "exponential" | "volumetric" | "animated-volumetric";
export type RenderFogOptions = {
 mode: DVEFogTypes;
 color: Color3;
 density: number;
 volumetricOptions: {
  heightFactor: number;
 };
};

export type DVERenderEffectsOptions = {
 floraEffects: boolean;
 liquidEffects: boolean;
};

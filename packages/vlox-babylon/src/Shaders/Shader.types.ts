import { Vec3Array } from "@amodx/math";

export type DVEFogTypes = "exponential" | "volumetric" | "animated-volumetric";
export type RenderFogOptions = {
  mode: DVEFogTypes;
  color: Vec3Array;
  density: number;
  volumetricOptions: {
    heightFactor: number;
  };
};
export type RenderSkyOptions = {
  color: Vec3Array;
};
export type DVERenderEffectsOptions = {
  floraEffects: boolean;
  liquidEffects: boolean;
};

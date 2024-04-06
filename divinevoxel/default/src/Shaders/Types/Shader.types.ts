import { Vec3Array } from "@divinevoxel/core/Math";

export type DVEFogTypes = "exponential" | "volumetric" | "animated-volumetric";
export type RenderFogOptions = {
  mode: DVEFogTypes;
  color: Vec3Array;
  density: number;
  volumetricOptions: {
    heightFactor: number;
  };
};

export type DVERenderEffectsOptions = {
  floraEffects: boolean;
  liquidEffects: boolean;
};

import { Vec3Array } from "@amodx/math";

export type VoxelEffectData =
  | {
      type: "fx-points";
      effectId: string;
      values: Record<string, Vec3Array[]>;
    }
  | {
      type: "tag";
      values: Record<string, any>;
      tagId: string;
    };

export type VoxelEffectSyncData =
  | {
      type: "fx-points";
      effectId: string;
      tree: any[];
      treePalette: Vec3Array[][];
    }
  | {
      type: "tag";
      tagId: string;
      tree: any[];
      treePalette: any[];
    };

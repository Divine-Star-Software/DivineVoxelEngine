export type VoxelLogicEffects =
  | {
      type: "tag";
      tagId: string;
      value: any;
    }
  | {
      type: "state";
      key: string;
      value: string | number;
    }
  | {
      type: "mod";
      key: string;
      value: string | number;
    };

export type VoxelLogicData =
  | {
      type: "powered";
      on: VoxelLogicEffects[];
      off: VoxelLogicEffects[];
    }
  | {
      type: "state";
      value: string;
      true: VoxelLogicEffects[];
      false: VoxelLogicEffects[];
    };
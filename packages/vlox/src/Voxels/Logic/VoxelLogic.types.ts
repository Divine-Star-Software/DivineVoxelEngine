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

export type VoxelLogicPoweredData = {
  type: "powered";
  on: VoxelLogicEffects[];
  off: VoxelLogicEffects[];
};
export type VoxelLogicStateData = {
  type: "state";
  value: Record<string,number|string>;
  true: VoxelLogicEffects[];
  false: VoxelLogicEffects[];
};

export type VoxelLogicData = VoxelLogicPoweredData | VoxelLogicStateData;

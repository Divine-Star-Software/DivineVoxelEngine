import { VoxelShapeManager } from "../VoxelShapeManager";

import { LiquidVoxelShape } from "./Liquid/Liquid.voxel.shape";

export default function () {
  VoxelShapeManager.registerShape(

    LiquidVoxelShape,

  );
}

import { VoxelShapeManager } from "../VoxelShapeManager";
import { CubeVoxelShape } from "./Cube/Cube.voxel.shape";
import { HalfCubeVoxelShape } from "./Cube/HalfCube.voxel.shape";
import { LiquidVoxelShape } from "./Liquid/Liquid.voxel.shape";
import { CrossedPanelsVoxelShape } from "./Panel/CrossedPanels.voxel.shape";
import { PanelVoxelShape } from "./Panel/FlatPanel.voxel.shape";
import { StairVoxelShape } from "./Stairs/Stair.voxel.shape";

export default function () {
  VoxelShapeManager.registerShape(
    CubeVoxelShape,
    HalfCubeVoxelShape,
    PanelVoxelShape,
    CrossedPanelsVoxelShape,
    LiquidVoxelShape,
    StairVoxelShape
  );
}

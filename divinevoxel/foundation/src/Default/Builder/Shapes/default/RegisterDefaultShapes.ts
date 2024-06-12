import { VoxelShapeManager } from "../VoxelShapeManager";
import { BoxVoxelShape } from "./Box/Box.voxel.shape";
import { HalfBoxVoxelShape } from "./Box/HalfBox.voxel.shape";
import { LiquidVoxelShape } from "./Liquid/Liquid.voxel.shape";
import { CrossedPanelsVoxelShape } from "./Panel/CrossedPanels.voxel.shape";
import { PanelVoxelShape } from "./Panel/Panel.voxel.shape";
import { StairVoxelShape } from "./Stairs/Stair.voxel.shape";

export default function () {
  VoxelShapeManager.registerShape(
    BoxVoxelShape,
    HalfBoxVoxelShape,
    PanelVoxelShape,
    CrossedPanelsVoxelShape,
    LiquidVoxelShape,
    StairVoxelShape
  );
}

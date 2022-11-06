//shapes
import { FullBoxDiagonalIntersection } from "../default/DiagonalIntersection/FullBoxDiagonalIntersection.voxe.shape.js";
import { BoxVoxelShape } from "../default/Box/Box.voxel.shape.js";
import { FluidSourceBlockVoxelShape } from "../default/Fluid/SourceBlock.voxel.shape.js";
import { HalfBoxVoxelShape } from "../default/Box/HalfBox.voxel.shape.js";
import { PanelVoxelShape } from "../default/Panel/Panel.voxel.shape.js";
import { StairVoxelShape } from "../default/Stair/Stair.voxel.shape.js";
export function RegisterDefaultShapes(builder) {
    builder.shapeManager.registerShape(BoxVoxelShape);
    builder.shapeManager.registerShape(HalfBoxVoxelShape);
    builder.shapeManager.registerShape(StairVoxelShape);
    builder.shapeManager.registerShape(PanelVoxelShape);
    builder.shapeManager.registerShape(FluidSourceBlockVoxelShape);
    builder.shapeManager.registerShape(FullBoxDiagonalIntersection);
}

//shapes
import { FullBoxDiagonalIntersection } from "../default/DiagonalIntersection/FullBoxDiagonalIntersection.voxe.shape.js";
import { BoxVoxelShape } from "../default/Box/Box.voxel.shape.js";
import { FluidSourceBlockVoxelShape } from "../default/Fluid/SourceBlock.voxel.shape.js";
import { HalfBoxVoxelShape } from "../default/Box/HalfBox.voxel.shape.js";
import { PanelVoxelShape } from "../default/Panel/Panel.voxel.shape.js";
import { StairVoxelShape } from "../default/Stair/Stair.voxel.shape.js";
export function RegisterDefaultShapes(DVEB) {
    DVEB.shapeManager.registerShape(BoxVoxelShape);
    DVEB.shapeManager.registerShape(HalfBoxVoxelShape);
    DVEB.shapeManager.registerShape(StairVoxelShape);
    DVEB.shapeManager.registerShape(PanelVoxelShape);
    DVEB.shapeManager.registerShape(FluidSourceBlockVoxelShape);
    DVEB.shapeManager.registerShape(FullBoxDiagonalIntersection);
}
